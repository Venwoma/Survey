/**
 *
 * 这是错误监听日志报告
 *
 *
 *
 * */
import { sendData } from '../api/api.js';
import watcher from '../plugin/watcher.js';
import store from '../store/index.js';
const { eventType, includesMudolues } = store;

const errorpipe = (error) => {
    if (typeof error.reason === 'object') {
        return {
            errorMessage: error?.reason.message,
            stack: error.reason.stack,
        };
    } else {
        return {
            errorMessage: error,
        };
    }
};
// 处理全局异步错误和同步的语法错误
const unhandledrejectionAction = (e) => {
    e.preventDefault();
    const data = {
        ...errorpipe(e),
        [eventType]: e.type,
    };
    sendData({ error: data }).catch((e) => console.log(e));
    console.log(data);
};

// 处理全局的资源加载错误
const errorAction = (e) => {
    const data = {
        catchPromiseHander: e.reason,
        [eventType]: e.type,
    };
    sendData({ error: data }).catch((e) => console.log(e));
    console.log(data);
};

export const catchPromiseHander = () => {
    includesMudolues?.unhandledrejection === true &&
        watcher.watch('unhandledrejection', unhandledrejectionAction);
};

export const catchAsyncError = () => {
    includesMudolues?.error === true && watcher.watch('error', errorAction);
};
