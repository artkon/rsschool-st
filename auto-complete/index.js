const createAutocomplete = (dictArg = []) => {
    const cache = {};
    let dictionary = dictArg;

    return (input = '') => {
        if (input === '') {
            return [];
        }

        if (input in cache) {
            return cache[input];
        }

        let cacheFlag = false;

        let partInput = input.slice(0, -1);
        while (partInput !== '') {
            if (partInput in cache) {
                cacheFlag = true;
                dictionary = cache[partInput];
                break;
            } else {
                partInput = partInput.slice(0, -1);
            }
        }

        const filterer = item =>
            item.toLowerCase().startsWith(input.toLowerCase());

        const res = dictionary.filter(filterer);

        cache[input] = res;

        if (cacheFlag) {
            dictionary = dictArg;
        }

        return res;
    };
};

module.exports.createAutoComplete = createAutocomplete;
