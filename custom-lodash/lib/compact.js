import { push } from './internal/push';
import { isArray } from './internal/isArray';

const compact = (arr = []) => {
    if (!isArray(arr)) {
        return [];
    }

    const newArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        const cond1 = arr[i] != false && arr[i] != undefined && !isNaN(arr[i]);
        const cond2 = typeof arr[i] === "string" && arr[i] !== '' || isArray(arr[i]);
        if (cond1 || cond2) {
            push(newArr, arr[i])
        }
    }

    return newArr;
}

export { compact };
