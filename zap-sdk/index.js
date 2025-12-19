import { useFastExtend } from './plugin/usejs.mjs';
import eventsInit from './events/init.js';
import store from './store/index.js';
import { catchPromiseHander, catchAsyncError } from './events/error.js';
import { getClientInfo, getHtml, getNavigator, getPageInfo, getPerformance, getRandomString, getScreenInfo, getUrlInfo, getHtmlCleanDoc } from './tools.js';
import { collectDataMap } from './store/collect-data.js';
import { getPerformanceMemory } from './plugin/dev-test.js';
import * as ui from './zap-ui/index.js';
// eslint-disable-next-line react-hooks/rules-of-hooks
useFastExtend();
// 这是一个注释代码
const initSelf = function () {
    // 单例模式
    if (window.__wenjuanSDK__) return;
    window.__wenjuanSDK__ = true;

    // 测试模式
    if (store.isTest) console.log(getPerformanceMemory(), '初始化');
    // 初始化监听错误本质
    catchPromiseHander();
    catchAsyncError();
    if (globalThis.window) {
        eventsInit();
        window.__wenjuan_store__ = store;
        window.collectDataMap = collectDataMap;
    }
};
// 立刻初始化
initSelf();

// 初始化配置对象
const init = (config) => {
    const { runState, apiProps, apiPropsValue, plugins, pageInfo, eventIdMap, version, http, ...surplus } = config;
    Object.assign(store.http.intercaptor, http.intercaptor);
    Object.assign(store.http, http);
    Object.assign(store, surplus);
};

export default {
    init,
    getClientInfo,
    getHtml,
    getNavigator,
    getPageInfo,
    getPerformance,
    getRandomString,
    getScreenInfo,
    getUrlInfo,
    getHtmlCleanDoc,
    ui,
};
