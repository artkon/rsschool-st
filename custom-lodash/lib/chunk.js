import { push } from './internal/push';
import { isArray } from './internal/isArray';

const chunk = (arr = [], length = 1) => {
    if (!isArray(arr) || arr.length === 0) {
        return [];
    }
    if (!(typeof length === 'number' && !isNaN(length) && length > 0)){
        return [];
    }

    const newArr = [];
    let count = -1;
    for (let i = 0; i < arr.length; i += 1) {
        if (i % length === 0) {
            count += 1;
            newArr[count] = [];
        }
        push(newArr[ count ], arr[i]);
    }
    return newArr;
}

export { chunk };
