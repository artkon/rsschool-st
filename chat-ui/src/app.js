import Chat from './Chat/Chat.js';
import config from './Chat/config/config.js';

const ready = () => {
    
    const chat = new Chat(document.body, config);
    chat.init();

    document.removeEventListener('DOMContentLoaded', ready);
}

document.addEventListener('DOMContentLoaded', ready);
