const pickBy = (object = {}, func) => {
    if (typeof object !== 'object' || object === null) {
        return {};
    }

    const newObj = {};
    for (const key in object) {
        if (func(object[key])) {
            newObj[key] = object[key];
        }
    }
    return newObj;
}

export { pickBy };
