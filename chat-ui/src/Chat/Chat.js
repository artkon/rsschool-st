import ChatModel from './models/ChatModel.js';
import ChatController from './controllers/ChatController.js';
import ChatView from './views/ChatView.js';

class Chat {
    constructor(container, config) {
        this.config = config;
        this.model = new ChatModel();
        this.view = new ChatView(container, this.config.view);
        this.controller = new ChatController(this.model, this.view, this.config);
    }

    init() {
        this.controller.init();
    }
}

export default Chat;