/**
 * 这里是缓存区
 */
import store from '../store/index';

const { preFix } = store;
export default {
    getLocal(key) {
        return window.localStorage.getItem(`${preFix}-${key}`);
    },
    setLocal(key, value) {
        window.localStorage.setItem(`${preFix}-${key}`, value);
    },
    deleteLoca(key) {
        window.localStorage.removeItem(`${preFix}-${key}`);
    },
    getSession(key) {
        return window.sessionStorage.getItem(`${preFix}-${key}`);
    },
    setSession(key, value) {
        window.sessionStorage.setItem(`${preFix}-${key}`, value);
    },
    deletessionSe(key) {
        window.sessionStorage.removeItem(`${preFix}-${key}`);
    },
};
