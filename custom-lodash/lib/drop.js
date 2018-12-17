import { isArray } from './internal/isArray';
import { dropWhile } from "./dropWhile";

const drop = (arr = [], n = 1) => {
    if (!isArray(arr)) {
        return [];
    }

    let count = n;

    if (!(typeof count === 'number' && !isNaN(count))){
        count = 0;
    }

    const countFunc = () => {
        return count-- > 0 ? true : false; 
    }

    return dropWhile(arr, countFunc);

}

export { drop };
