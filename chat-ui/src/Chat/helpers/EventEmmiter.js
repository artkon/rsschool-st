class EventEmmiter {
    constructor() {
        this.events = {};
    }

    on(type, callback) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(callback);
        const index = this.events[type].length - 1;
        return function () {
            this.unsubscribe(type, index).bind(this);
        }
    }

    emit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach( callback => callback(arg) );
        }
    }
    
    unsubscribe(type, index) {
        this.events[type].splice(index, 1);
    }
}

export default EventEmmiter;
