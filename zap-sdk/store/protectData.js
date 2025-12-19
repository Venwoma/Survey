import { getOnlyUid } from '../tools';
const protectData = (tagName = 'eventId') => {
    const data = Object.create({
        name: tagName,
        _usePipe: [],
        usePipe(fn) {
            if (typeof fn === 'function') {
                this._usePipe.push(fn);
            } else {
                throw new TypeError('usePipe requires a function');
            }
        },
        getUid() {
            return getOnlyUid(this);
        },
    });
    const whiteListKeys = ['name', 'getUid'];
    const instance = new Proxy(data, {
        get(target, key) {
            if (!Object.prototype.propertyIsEnumerable.call(target, key) && !whiteListKeys.includes(key)) return '';
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            if (!whiteListKeys.includes(key)) return Reflect.set(target, key, value);
            return false;
        },
        getPrototypeOf() {
            return { ...instance };
        },
    });
    return instance;
};

const eventUidMap = protectData();

export { eventUidMap, protectData };
