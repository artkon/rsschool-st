import EventEmmiter from '../helpers/EventEmmiter.js';

class ChatModel extends EventEmmiter {
    constructor() {
        super();

        this.ws = null;
        this.newMessages = [];
    }

    onConnect() {
        this.emit('connect');
    }

    onMessage(event) {
        this.newMessages = JSON.parse(event.data);
        if (this.newMessages.length > 1) {
            this.newMessages.map(message => Object.assign(message, { history : true }));
        }

        while(this.newMessages.length !== 0){
            this.emit('newMessage');
        }
    }

    onClose(event) {
        if (event.wasClean) {
            this.emit('disconected');
            console.error('Connection closed clean');
        } else {
            this.emit('disconected');
            console.error('Break connection');
            console.error('Code: ' + event.code + ' reason: ' + event.reason);
            this.emit('break');
        }
    }

    onError(error) {
        this.emit('disconected');
        console.error("Ошибка " + error.message);
        this.emit('break');
    }

    connectChat(url) {
        this.ws = new WebSocket(url);
        this.ws.onopen = this.onConnect.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = this.onError.bind(this);
    }

    getMessage() {
        return this.newMessages.pop();
    }

    sendMessage(obj) {
        const str = JSON.stringify(obj);
        this.ws.send(str);
    }

    setUserName(name) {
        localStorage.setItem('userName', name);
    }

    getUserName(field) {
        return (localStorage.getItem(field)) ? localStorage.getItem(field) : '';
    }
}

export default ChatModel;
