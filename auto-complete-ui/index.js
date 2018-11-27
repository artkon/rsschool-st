const createAutocomplete = require('../auto-complete/index.js').createAutoComplete;

let autoComplete;

const inputField = document.createElement('input');
inputField.id = "input-city";

const noDictEvent = () => {
    let text = document.createTextNode('Please wait ... and continue to type (or retype) in a few seconds');
    outputField.innerHTML = text.data;
}

inputField.oninput = noDictEvent;

const outputField = document.createElement('div');
outputField.id = 'cities';


const onInputEvent = () => {    
    const citiesArr = autoComplete(inputField.value);
    const citiesStr = citiesArr.toString();
    const text = document.createTextNode(citiesStr);
    outputField.innerHTML = text.data;
};


fetch('./cities.json')
    .then (response => {
        return response.json();
    })
    .then (cities => {
        autoComplete = createAutocomplete(cities);
        inputField.oninput = onInputEvent;
    })
    .catch (function genericError(error) {
        console.error(error);
    });



const ready = (e) => {
    document.body.appendChild(inputField);
    document.body.appendChild(outputField);
}

document.addEventListener("DOMContentLoaded", ready);
