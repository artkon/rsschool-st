export default class CyclicMenu {
    constructor(menuItems, config, container) {
        this.menuItems = menuItems;
        this.config = config;
        this.classNames = this.config.classNames;
        this.container = container;

        this.menu = this.createMenu();
    }

    createMenu() {
        const ul = document.createElement('ul');
        ul.classList.add(this.classNames['menu']);

        this.menuItems.forEach(menuItem => {
            this.addItem(menuItem, ul);
        });

        const activeItem = ul.children[this.config['active-index']];
        this.toggleActive(activeItem);

        this.container.appendChild(ul);

        this.keyEventsFunc = this.keysEvents.bind(this);
        document.addEventListener('keydown', this.keyEventsFunc);

        return ul;
    }

    addItem(item, parent = this.menu) {
        const li = document.createElement('li');
        const a = document.createElement('a');

        li.classList.add(this.classNames['li']);
        a.classList.add(this.classNames['link']);

        a.href = item[1];
        a.append(item[0]);
        li.appendChild(a);

        parent.appendChild(li);
    }

    toggleActive(item) {
        item.classList.toggle(this.classNames['active-li']);
        const link = item.querySelector('.' + this.classNames['link']);
        link.classList.toggle(this.classNames['active-link']);
    }

    keysEvents(event) {
        console.log(event.keyCode);
        if (event.keyCode === this.config['keys']['nextItem']) {
            this.changeActiveItem(1);
        } else if (event.keyCode === this.config['keys']['prevItem']) {
            this.changeActiveItem(-1);
        } else if (event.keyCode === this.config['keys']['go']) {
            const a = document.querySelector('.' + this.classNames['active-link']);
            location.href = a.href;
        }
    }

    changeActiveItem(direction = 1) {
        let li = document.querySelector('.' + this.classNames['active-li']);
        this.toggleActive(li);

        let activeLi;

        if (direction === 1) {
            activeLi = (li.nextElementSibling)
                ? li.nextElementSibling 
                : li.parentNode.firstChild;
        } else if (direction === -1) {
            activeLi = (li.previousElementSibling) 
                ? li.previousElementSibling 
                : li.parentNode.lastChild;
        }
        this.toggleActive(activeLi);
    }


    removeMenu() {
        const parent = this.menu.parentElement;
        parent.removeChild(this.menu);
        document.removeEventListener('keydown', this.keyEventsFunc);
    }
}
