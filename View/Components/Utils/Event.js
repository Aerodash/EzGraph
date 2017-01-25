let debug = false;
export default class Event {
    constructor() {
        this.vue = new Vue();
    }

    fire(event, data = null) {
        if (debug) console.log('[Event] "' + event + '" event was fired ! Data : ', JSON.stringify(data));
        this.vue.$emit(event, data);
        return this;
    }

    listen(event, callback) {
        this.vue.$on(event, callback);
        return this;
    }

    off(event) {
        this.vue.$off(event);
        return this;
    }
}