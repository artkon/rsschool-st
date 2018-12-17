import { push } from './internal/push';

const toPairs = (obj) => {
    const newArr = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            push(newArr, [key, obj[key]]);
        }
    }
    return newArr;
}

export { toPairs };
