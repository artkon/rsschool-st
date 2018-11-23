import { leftArrowPress, rightArrowPress, enterPress } from './cyclicMenuEvents.js';

export default class CyclicMenu {
    constructor(menuItems, container) {

        this.wrapper = document.createElement(container);

        this.ul = document.createElement('ul');
        this.ul.classList.add('menu-list');

        for (let i = 0; i < menuItems.length; i += 1) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = menuItems[i][1];
            a.append(menuItems[i][0]);
            li.appendChild(a);
            this.ul.appendChild(li);
        }
        
        const firstItem = this.ul.firstElementChild;
        firstItem.classList.toggle('active');


        this.addEventListener(document, 'keydown', leftArrowPress);
        this.addEventListener(document, 'keydown', rightArrowPress);
        this.addEventListener(document, 'keydown', enterPress);

        this.wrapper.appendChild(this.ul);
    }

    get getMenu() {
        return this.wrapper;
    }

    addItem(name, position = 1000) {
        const ul = this.getMenu.querySelector('ul');
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = name[1];
        a.append(name[0]);
        li.appendChild(a);

        if (position === 0) {
            ul.firstChild.classList.toggle('active');
            li.classList.toggle('active');
            ul.insertBefore(li, ul.children[position]);
        } else {
            ul.insertBefore(li, ul.children[position]);
            
        }        
    }

    removeItem(position) {
        const ul = this.getMenu.querySelector('ul');
        const child = ul.children[position];
        if (position === 0) {
            if (child.nextElementSibling) {
                child.nextElementSibling.classList.toggle('active');
            }
        }
        ul.removeChild(child);
        this.itemsCount -= 1;
    }

    addEventListener(target, event, func) {
        target.addEventListener(event, func);
    }
}
