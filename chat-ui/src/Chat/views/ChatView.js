import EventEmmiter from '../helpers/EventEmmiter.js';
import { createElement } from "../helpers/utils.js";

class ChatView extends EventEmmiter {
    constructor(container, config) {
        super();

        this.config = config;
        this.container = container;
        this.classNames = config.classNames;
        this.texts = config.texts;
        this.maxLength = config.messageLength;
        this.isTabActive = false;
    }

    render() {
        this.p = createElement('p', { className: this.classNames.chatConnection }, this.texts.disconnected);
        this.input = createElement('input', { className: this.classNames.chatUserName, placeholder: this.texts.userName });
        this.ul = createElement('ul', { className: this.classNames.chatMessages });
        this.textArea = createElement('textarea', { 
            className: this.classNames.chatInput, placeholder: this.texts.input, disabled: true });
        this.button = createElement('button', { className: this.classNames.chatSend}, this.texts.send);
        this.sound = createElement('div', { className: this.classNames.notificationmp3 });

        this.bindListeners();

        this.div = createElement('div', { className: 'chat' }, this.p, this.input, this.ul, this.textArea, this.button, this.sound); 
        this.container.appendChild(this.div);
    }

    bindListeners() {
        this.button.addEventListener('click', this.sendMessageEvent.bind(this));
        this.input.addEventListener('input', this.editUserName.bind(this));
        this.textArea.addEventListener('keydown', this.sendMessageEvent.bind(this));
        window.onfocus = this.activeTab.bind(this);
        window.onblur = this.inactiveTab.bind(this);
    }

    showMessage(formattedTime, from, message) {
        const time = createElement('span', { className : this.classNames.messageTime }, formattedTime);
        const name = createElement('span', { className: this.classNames.messageName }, from);
        const text = createElement ('span', { className: this.classNames.messageText }, message);
        const li = createElement('li', {}, time, ' ', name, ': ',text);
        this.ul.appendChild(li);
        this.scrollChat();
    }

    soundNotification() {
        var soundSource = '<source src="' + this.config.messageSound + '" type="audio/mpeg">';
        this.sound.innerHTML = '<audio autoplay="autoplay">' + soundSource + '</audio>';
    }

    activeTab() {
        this.isTabActive = true; 
    }

    inactiveTab() {
        this.isTabActive = false; 
    }

    sendMessageEvent(event) {
        if (event.type === 'keydown' && event.keyCode !== 13) {
            return;
        }
        if (!this.checkUserName()) {
            return;
        }

        event.preventDefault();
        const inputValue = this.textArea.value.trim();

        if (!inputValue || inputValue.length > this.maxLength) {
            return;
        }
        this.textArea.value = '';
        this.emit('send', inputValue);
    }

    editUserName(event) {
        const name = event.target.value;
        this.emit('changeUserName', name);
    }

    putUserName(name = '') {
        this.input.value = name;
    }

    scrollChat() {
        this.ul.scrollTop = this.ul.scrollHeight;
    }

    checkUserName() {
        return this.input.value.length > 0;
    }

    setConnectState(boolState) {
        this.p.textContent = (boolState == false) 
            ? this.texts.disconnected 
            : this.texts.connected;
    }

    toggleSendArea() {
        this.button.classList.toggle(this.classNames.chatSendActive);
        this.textArea.disabled = !(this.textArea.disabled);
    }
}

export default ChatView;
