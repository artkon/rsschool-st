const config = {
    url: "ws://st-chat.shas.tel",
    view : {
        messageSound: './sound/sound.mp3',
        messageLength: 300,
        classNames: {
            chat: 'chat',
            chatConnection: 'chat-connection',
            chatMessages: 'chat-messages',
            chatUserName: 'chat-username',
            chatInput: 'chat-input',
            chatSend: 'chat-send',
            chatSendActive: 'chat-button-active',
            messageTime: 'message-time',
            messageName: 'message-name',
            messageText: 'message-text',
            soundNotification: 'notificationmp3'
        },
        texts : {
            disconnected: "DISCONNECTED",
            connected: "CONNECTED",
            userName: 'Enter user name',
            input: 'Enter your message',
            send: 'Send'
        }
    }
}

export default config;
