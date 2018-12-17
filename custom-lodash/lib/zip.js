import { push } from './internal/push';
import { isArray } from './internal/isArray';

const zip = (...arr) => {
    for (let i = 0; i < arr.length; i += 1) {
        if (!isArray(arr[i])) {
            throw new Error('Argument array isn\'t correct');
        }
    }
    const newArr = [];
    for (let i = 0; i < arr[0].length; i += 1) {
        newArr[i] = [];
        for (let j = 0; j < arr.length; j += 1) {
            push(newArr[i], arr[j][i]);
        }
    }
    return newArr;
}

export { zip };
