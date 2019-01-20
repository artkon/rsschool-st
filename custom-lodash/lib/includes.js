import { isArray } from './internal/isArray';

const includes = (arr, target, from = 0) => {
    if (!isArray(arr) || target === undefined) {
        return false
    }
    if (from > arr.length || from < -arr.length) {
        return false;
    }

    let fromIndex = from;

    fromIndex = (fromIndex < 0) ? arr.length + fromIndex : fromIndex;

    for (let i = fromIndex; i < arr.length; i += 1) {
        if (arr[i] === target) {
            return true;
        }
    }
    return false;
}

export { includes };
