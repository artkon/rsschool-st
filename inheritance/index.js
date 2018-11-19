function Builder(initValue) {
    this.buffer = initValue || 0;
}

Builder.prototype.plus = function (...args) {
	this.buffer += args.reduce(function (acc, cur) { return acc + cur; });
	return this;
}

Builder.prototype.minus = function (n, toNum, toType) {
    if (typeof toNum !== 'undefined') {
        this.buffer = toType.call(this, toNum.call(this) - n);
    } else {
        this.buffer -= n;
    }

	return this;
  }

Builder.prototype.multiply = function (n) {
    var temp = this.buffer;
    for (let i = 1; i < n; i += 1) {
        this.buffer += temp;
    }
	return this;
}

Builder.prototype.divide = function (n, toNum, toType) {
    if (toNum && toType) {
        this.buffer = toType.call(this, toNum.call(this, this.buffer) / n);
    } else {
        this.buffer = this.buffer / n;
    }

	return this;
}

Builder.prototype.get = function () {
	return this.buffer;
}


class IntBuilder extends Builder {
    _isNumber (initValue) {
        let condition1 = typeof initValue !== 'number' && initValue !== undefined;
        let condition2 = isNaN(initValue) && initValue !== undefined;
        return !(condition1 || condition2);
    }

	constructor(initInt = 0) {
		super(initInt);
        if (!this._isNumber(initInt)) {
            throw new Error("Argrument isn't number");
        }
	}

	minus(...minusArgs) {
        const minusNum = minusArgs.reduce( (acc, cur) => { return acc + cur } );
        return super.minus(minusNum);
	}

	multiply(n) {
        return super.multiply(n);
	}

	divide(n) {
        return super.divide(n);
	}

	mod(n) {
		this.buffer = this.buffer % n;
		return this;
	}

	static random(min, max) {
		return Math.floor( Math.random() * (max - min) ) + min;
	}
}


function StringBuilder(initStr) {
    if (typeof initStr !== 'string' && initStr !== undefined) {
		throw new Error("Argrument isn't string");
    }
    this.buffer = (initStr) ? initStr : '';
}

StringBuilder.prototype = Object.create(Builder.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.toNum = function () {
    return this.buffer.length;
}
StringBuilder.prototype.toStr = function (n) {
    return this.buffer.slice(0, Math.floor(n));
}

StringBuilder.prototype.minus = function(n) {
    return Builder.prototype.minus.call(this, n, this.toNum, this.toStr);
}

StringBuilder.prototype.multiply = function(n) {
	return Builder.prototype.multiply.call(this, n);
}

StringBuilder.prototype.divide = function(n) {
    return Builder.prototype.divide.call(this, n, this.toNum, this.toStr);
}

StringBuilder.prototype.remove = function(str) {
	while(this.buffer.indexOf(str) !== -1){
        var beforeIndex = this.buffer.slice(0, this.buffer.indexOf(str));
        var afterIndex = this.buffer.slice(this.buffer.indexOf(str) + str.length);
		this.buffer = beforeIndex + afterIndex;
	}
	return this;
}

StringBuilder.prototype.sub = function(start, length) {
	this.buffer = this.buffer.substr(start, length);
	return this;
}
