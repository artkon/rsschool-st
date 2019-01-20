import { isArray } from './internal/isArray';
import { push } from './internal/push';
import { identity } from './internal/identity';

const dropWhile = (arr = [], func = identity) => {
    if (!isArray(arr)) {
        return [];
    }

    const newArr = [];
    let falsyFlag = true;
    for (let i = 0; i < arr.length; i += 1) {
        if (falsyFlag) {
            if (!func(arr[i], i, arr)) {
                push(newArr, arr[i]);
                falsyFlag = false;
            } 
        } else {
            push(newArr, arr[i]);
        }

    }
    return newArr;
}

export { dropWhile };
