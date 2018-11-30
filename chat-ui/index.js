const displayNotification = (text) => {
    Notification.requestPermission().then(function(result) {
      });
    const notification = new Notification('Chat UI', { body: text });
}

let isTabActive = true;

window.onfocus = function () { 
  isTabActive = true; 
}; 

window.onblur = function () { 
  isTabActive = false; 
}; 

function playSound(){
    var mp3Source = '<source src="./sound.mp3" type="audio/mpeg">';
    document.querySelector('.sound').innerHTML = '<audio autoplay="autoplay">' + mp3Source + '</audio>';
}

let ws;

const sendMessage = (message) => {
    const name = (localStorage.getItem('userName'))
        ? localStorage.getItem('userName')
        : 'enter user name';
    const obj = {
        "from": name,
        "message": message
    }
    const json = JSON.stringify(obj);
    ws.send(json);
}

const displayMessage = (direction = 'down', date, from, message) => {
    const li = document.createElement('li');  
    const textMessage = document.createTextNode(date + ' ' + from + ': ' + message);
    li.textContent =  textMessage.data;
    const messagesUl = document.querySelector('.chat-messages');

    if (direction === 'up') {
        const firstMessage = messagesUl.children[0];
        messagesUl.insertBefore(li, firstMessage);
    } else {
        messagesUl.appendChild(li);
    }

    const ul = document.querySelector('.chat-messages');
    ul.scrollTop = ul.scrollHeight
}

const getFormatedTime = (ms) => {
    const date = new Date(ms);

    let hours = (date.getHours() < 10) 
        ? '0' + date.getHours() 
        : date.getHours();
    let minutes = (date.getMinutes() < 10)
        ? '0' + date.getMinutes()
        : date.getMinutes();
    // const seconds = date.getSeconds();

    return "" + hours + ":" + minutes;
}

const div = document.createElement('div');
div.classList.add('chat');

const connection = document.createElement('span');
connection.classList.add('connection');
connection.textContent = 'DISCONNECTED';
div.appendChild(connection);

const ul = document.createElement('ul');
ul.classList.add('chat-messages');
div.appendChild(ul);


// INPUT
const input = document.createElement('input');
input.classList.add('chat-username');
input.setAttribute('placeholder', 'Enter user name');
input.value = (localStorage.getItem('userName'))
    ? localStorage.getItem('userName')
    : '';

const onInputNameEvent = (e) => {
    localStorage.setItem('userName', e.target.value);
}
input.oninput = onInputNameEvent;

div.appendChild(input);

// BUTTON
const button = document.createElement('button');
button.classList.add('chat-send');
button.textContent = "Send";

const buttonSendEvent = (e) => {
    const input = document.querySelector('.chat-input');
    const inputValue = input.value.trim();
    if (!inputValue || inputValue.length > 300) {
        return;
    }
    sendMessage(inputValue);
    input.value = '';
}
button.onclick = buttonSendEvent;


const textArea = document.createElement('textarea');
textArea.classList.add('chat-input');
textArea.placeholder = "Enter your message";

const pressEnterSend = (e) => {
    if (e.keyCode === 13) {
        buttonSendEvent();
    }
}

textArea.addEventListener('keydown', pressEnterSend);
div.appendChild(textArea);

div.appendChild(button);



const sound = document.createElement('div');
sound.classList.add('sound');
div.appendChild(sound);

const ready = () => {
    document.body.appendChild(div);
    ws = new WebSocket("ws://st-chat.shas.tel");

    ws.onopen = () => {
        console.log('OPEN');
        const connection = document.querySelector('.connection');
        connection.textContent = 'CONNECTED';
    }

    ws.onmessage = (event) => {
        const arrMessage = JSON.parse(event.data);

        for (let i = 0; i < arrMessage.length; i++) {
            const messageObj = arrMessage[i];
            const formatedTime = getFormatedTime(messageObj.time);
            if (arrMessage.length > 1) {
                displayMessage('up', formatedTime, messageObj.from, messageObj.message);
            } else {
                displayMessage('down', formatedTime, messageObj.from, messageObj.message);
                if (messageObj.from !== localStorage.getItem('userName')){
                    playSound();
                }
            }
            if (!isTabActive) {
                displayNotification("" + messageObj.from + ': ' + messageObj.message);
            }
        }
    }

    ws.onclose = (event) => {
        if (event.wasClean) {
            const connection = document.querySelector('.connection');
            connection.textContent = 'DISCONNECTED';
            console.error('Соединение закрыто чисто');
        } else {
            const connection = document.querySelector('.connection');
            connection.textContent = 'DISCONNECTED';
            console.error('Обрыв соединения');
            ready();
        }
        console.error('Код: ' + event.code + ' причина: ' + event.reason);
    };

    ws.onerror = function(error) {
        console.error("Ошибка " + error.message);
        const connection = document.querySelector('.connection');
        connection.textContent = 'DISCONNECTED';
        ready();
    };

}

document.addEventListener("DOMContentLoaded", ready);
