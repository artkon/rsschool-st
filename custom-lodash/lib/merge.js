const merge = (obj = {}, ...sources) => {
    if (typeof obj !== 'object') {
        return {};
    }
    for (let i = 0; i < sources.length; i += 1) {
        if (typeof sources[i] !== 'object') {
            sources[i] = {};
        }   
    }

    for (let i = 0; i < sources.length; i += 1) {
        for (const key in sources[i]) {
            if (typeof sources[i][key] === 'object') {
                if (obj[key] && typeof obj[key] === 'object') {
                    merge(obj[key], sources[i][key]);
                } else {
                        obj[key] = sources[i][key];
                }
            } else {
                if (sources[i][key] !== undefined) {
                    obj[key] = sources[i][key];
                }
            }
        }
    }
    return obj;
}

export { merge };
