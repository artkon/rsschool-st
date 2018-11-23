import CyclicMenu from './CyclicMenu.js';

const ready = (e) => {
    const cyclMenu = new CyclicMenu([['MAIN', 'google.com'], ['SEARCH', 'google.com'], ['LIBRARY',  'google.com'], ['SETTINGS', 'google.com']], 'nav');
    document.body.appendChild(cyclMenu.getMenu);
}

document.addEventListener("DOMContentLoaded", ready);
