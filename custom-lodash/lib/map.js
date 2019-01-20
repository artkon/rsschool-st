import { push } from './internal/push';
import { isArray } from './internal/isArray';
import { identity } from "./internal/identity";

const map = (arr, mapper = identity) => {
    if (!isArray(arr)) {
        return [];
    }
    if (typeof mapper !== 'function') {
        return undefined;
    }

    const newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        push(newArr, mapper(arr[i], i, arr));
    }
    return newArr;
}

export { map };
