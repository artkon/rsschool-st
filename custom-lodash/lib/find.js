import { isArray } from './internal/isArray';

const find = (arr = [], func, from = 0) => {
    if (!isArray(arr) || typeof func !== 'function') {
        return undefined;
    }
    if (arr.length === 1 || func === undefined) {
        return arr[0];
    }

    for (let i = from; i < arr.length; i += 1) {
        if (func(arr[i], i, arr)) {
            return arr[i];
        }
    }

    return undefined;
}


export { find };
