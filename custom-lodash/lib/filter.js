import { push } from './internal/push';
import { isArray } from './internal/isArray';

const filter = (arr = [], func) => {
    if (!isArray(arr)) {
        return [];
    }
    if (func === undefined) {
        return arr;
    }
    if (typeof func !== 'function') {
        return [];
    }

    const newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        if( func(arr[i], i, arr) ) {
            push(newArr, arr[i]);
        }
    }
    return newArr;
}

export { filter };
