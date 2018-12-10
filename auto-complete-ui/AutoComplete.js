import { createAutoComplete } from '../auto-complete/index';

class AutoComplete {
    constructor(config, container) {
        this.config = config;
        this.dictPath = this.config.dictPath;
        this.container = container;

        this.create();
        this.setDictionary(this.dictPath);
    }

    create() {
        this.inputField = document.createElement('input');
        this.outputField = document.createElement('div');

        this.inputField.id = this.config.ids.input;
        this.outputField.id = this.config.ids.output;

        this.inputEvent = this.onInputEvent.bind(this);
        this.inputField.addEventListener('input', this.inputEvent);

        if (!this.autoComplete) {
            this.setDisableInput(true);
        }

        this.container.appendChild(this.inputField);
        this.container.appendChild(this.outputField);
    }

    onInputEvent() {
        const citiesArr = this.autoComplete(this.inputField.value);
        const citiesStr = citiesArr.toString();
        this.outputField.textContent = citiesStr;
    }

    setDictionary(dictPath) {
        fetch(dictPath)
            .then((response) => {
                return response.json();
            })
            .then((cities) => {
                this.autoComplete = createAutoComplete(cities);
                this.setDisableInput(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setDisableInput(disabled) {
        if (disabled) {
            this.inputField.disabled = true;
            this.inputField.style.backgroundColor = '#F6F6F6';
            this.inputField.placeholder = this.config.loadingPlaceholder;
        } else {
            this.inputField.disabled = false;
            this.inputField.style.backgroundColor = 'white';
            this.inputField.placeholder = '';
        }
    }

    destroy() {
        this.inputField.removeEventListener('input', this.inputEvent);
        const parent = this.inputField.parentElement;
        parent.removeChild(this.inputField);
        parent.removeChild(this.outputField);
    }
}

export default AutoComplete;
