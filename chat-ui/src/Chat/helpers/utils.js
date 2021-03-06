const getFormatedTime = (ms) => {
    const date = new Date(ms);

    let hours = (date.getHours() < 10) 
        ? '0' + date.getHours() 
        : date.getHours();
    let minutes = (date.getMinutes() < 10)
        ? '0' + date.getMinutes()
        : date.getMinutes();

    return "" + hours + ":" + minutes;
}

const createElement = (tag, props, ...children) => {
    const element = document.createElement(tag);
    
    Object.assign(element, props);

    children.forEach(child => {
        let el = child;
        if (typeof child === 'string') {
            el = document.createTextNode(child);
        }

        element.appendChild(el);
    });

    return element;
}

export { getFormatedTime, createElement };
