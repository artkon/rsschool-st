import AutoComplete from './AutoComplete';
import config from './config';

const ready = () => {
    const inputAutoComplete = new AutoComplete(config, document.body);

    document.removeEventListener('DOMContentLoaded', ready);
};

document.addEventListener('DOMContentLoaded', ready);
