export const leftArrowPress = (e) => {
    if (e.keyCode === 39) {
        let li = document.querySelector('.active');
        li.classList.toggle('active');
        li = (li.nextElementSibling) ? li.nextElementSibling : li.parentNode.firstChild;
        li.classList.toggle('active');
    }
}

export const rightArrowPress = (e) => {
    if (e.keyCode === 37) {
        let li = document.querySelector('.active');
        li.classList.toggle('active');
        li = (li.previousElementSibling) ? li.previousElementSibling : li.parentNode.lastChild;
        li.classList.toggle('active');
    }
}

export const enterPress = (e) => {
    if (e.keyCode === 13) {
        let li = document.querySelector('.active');
        alert(li.firstChild.innerHTML);
    }
}
