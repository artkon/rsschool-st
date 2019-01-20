import { identity } from "./internal/identity";

const omitBy = (object = {}, func = identity) => {
    if (typeof object !== 'object' || object === null) {
        return {};
    }

    const newObj = {};
    for (const key in object) {
        if(!func(object[key], key)) {
            newObj[key] = object[key];
        }
    }
    return newObj;
}

export { omitBy };
