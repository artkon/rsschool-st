import CyclicMenu from './CyclicMenu.js';

const ready = (e) => {
    const cyclMenu = new CyclicMenu(['MAIN', 'SEARCH', 'LIBRARY', 'SETTINGS'], 'nav');
    document.body.appendChild(cyclMenu.getMenu);
}

document.addEventListener("DOMContentLoaded", ready);
