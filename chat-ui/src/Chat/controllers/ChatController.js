import { getFormatedTime } from '../helpers/utils.js';

class ChatController {
    constructor(model, view, config) {
        this.model = model;
        this.view = view;
        this.config = config;

        model.on('newMessage', this.handleMessage.bind(this));
        model.on('connect', this.viewHelper.bind(this));
        model.on('disconected', this.view.setConnectState.bind(this.view, 0));
        model.on('break', this.connect.bind(this, this.config.url));
        view.on('send', this.sendMessage.bind(this));
        view.on('changeUserName', this.model.setUserName.bind(this));
    }

    init() {
        this.view.render();
        this.connect(this.config.url);
    }

    connect(url) {
        this.model.connectChat(url);
    }

    handleMessage() {
        const messageObj = this.model.getMessage();
        const formatedTime = getFormatedTime(messageObj.time);
        this.view.showMessage(formatedTime, messageObj.from, messageObj.message);
        this.handleSoundNotification(messageObj);
        this.handleDisplayNotification(messageObj);
    }

    handleSoundNotification(messageObj) {
        const condNotInHistory = !("history" in messageObj);
        const condNotFromMe = messageObj.from !== this.model.getUserName(this.config.userNameFieldLS);
        if (condNotInHistory && condNotFromMe) {
            this.view.soundNotification();
        }
    }

    handleDisplayNotification(messageObj) {
        const getNotificationPermission = () => {
            if (Notification.permission === "granted") {
                return true;
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission()
                    .then((permission) => {
                        if (permission === "granted") {
                            return true;
                        }
                        return false;
                    })
                    .catch(() => {
                        return false;
                    });
            } 

            return false;
        }
        
        const showNotification = (messageObject) => {
            const condNotInHistory = !("history" in messageObject);
            const condTabNotActive = !this.view.isTabActive;

            if (condNotInHistory && condTabNotActive) {
                const notification = new Notification(
                    'Chat', { body: messageObject.from + ': ' + messageObject.message }
                    );
            }
        }

        if ( getNotificationPermission() ) {
            showNotification(messageObj);
        }
        
    }

    sendMessage(message) {
        const from = this.model.getUserName(this.config.userNameFieldLS);

        const messageObj = {
            from,
            message
        }
        this.model.sendMessage(messageObj);
    }

    viewHelper() {
        this.view.putUserName(this.model.getUserName(this.config.userNameFieldLS));
        this.view.setConnectState(1);
        this.view.toggleSendArea();
    }
}

export default ChatController;
