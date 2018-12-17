import { omitBy } from "./omitBy";
import { includes } from "./includes";

const omit = (object = {}, pathsArr = []) => {
    if (typeof object !== 'object' || object === null) {
        return {};
    }

    const omitter = (value, key) => {
        return includes(pathsArr, key);
    };

    return omitBy(object, omitter);
}

export { omit };
