import { pickBy } from "./pickBy";

const pick = (object = {}, targetArr = []) => {
    if (typeof object !== 'object' || object === null) {
        return {};
    }

    const picker = (value, key) => {
        return includes(targetArr, key);
    }

    return pickBy(object, picker);

}

export { pick };
