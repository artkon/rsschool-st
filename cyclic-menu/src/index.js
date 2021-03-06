import CyclicMenu from './CyclicMenu.js';
import config from "./config.js";
import links from "./menuLinks.js";

const ready = (e) => {
    const cyclMenu = new CyclicMenu(links,config, document.body);

    document.removeEventListener("DOMContentLoaded", ready);    
}

document.addEventListener("DOMContentLoaded", ready);
