import { push } from './internal/push';
import { isArray } from './internal/isArray';

const take = (arr = [], length = 1) => {
    if (!isArray(arr)) {
        return [];
    }
    if (typeof length !== 'number' || isNaN(length) || length < 0) {
        return [];
    }

    const newArr = [];
    length = (length > arr.length) ? arr.length : length;
    for (let i = 0; i < length; i += 1) {
        push(newArr, arr[i]);
    }

    return newArr;
}

export { take };
