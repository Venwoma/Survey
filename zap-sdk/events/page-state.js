/**
 * 页面隐藏
 */
import { sendData } from '../api/api.js';
import store from '../store/index.js';
import watcher from '../plugin/watcher.js';
import { getHtml, getPageInfo, getHtmlCleanDoc } from '../tools.js';
import { searchOnEnter, searchOnInput } from './search-input.js';
import { collectDataMap } from '../store/collect-data.js';
import { paramsObverser, productListObserver } from './observer.js';
import mousehover from './mousehover.js';
const { eventType, pageInfo } = store;

let [startTime, endTime] = ['', ''];
// 页面显示函数

export const pageShowAction = () => {
    // 标注函数已经运行
    store.runState.pageShowAction = true;
    Object.assign(pageInfo, getPageInfo());
    sendData({ ...pageInfo, [eventType]: 'init', html: getHtmlCleanDoc(getHtml(store.isHtmlBase64)), originHtml: getHtml(store.isHtmlBase64) }).then((res) => {
        const { process_result } = res?.data || {};
        const { searchSelector, productorWrap, productorSelector, productParamsSelector, globalSearchSelector } = store.apiProps;
        const {
            [searchSelector]: _searchSelector = '',
            [productorWrap]: _productorWrap = '',
            [productorSelector]: _productorSelector = '.production',
            [productParamsSelector]: _productParamsSelector = '.production',
            [globalSearchSelector]: _globalSearchSelector = '.input',
        } = process_result || {};
        Object.assign(store.apiPropsValue, {
            searchSelector: _searchSelector,
            productorWrap: _productorWrap,
            productorSelector: _productorSelector,
            productParamsSelector: _productParamsSelector,
            globalSearchSelector: _globalSearchSelector,
        });
        // 逻辑判断页面是什么类型在根据类型设计
        if (_globalSearchSelector) {
            searchOnEnter(_globalSearchSelector);
            searchOnInput(_globalSearchSelector);
        }
        if (_searchSelector) {
            searchOnEnter(_searchSelector);
            searchOnInput(_searchSelector);
        }
        if (_productParamsSelector) {
            paramsObverser(_productParamsSelector);
        }
        if (_productorSelector) {
            mousehover();
            productListObserver(_productorSelector);
        }
    });
};

// 不可见时间累计
export const pageToggleAction = () => {
    if (!store.runState.pageToggleAction) store.runState.pageToggleAction = true;
    const { pageState } = collectDataMap;
    if (document.visibilityState === 'hidden') {
        // 隐藏
        startTime = Date.now();
        if (store.runtimor) {
            clearTimeout(store.runtimor);
            store.runtimor = null;
        }
    } else {
        endTime = Date.now();
        pageState.leaveTime.push([startTime, endTime]);
    }
};

// 页面消失函数
export const pageHideAction = () => {
    try {
        const { pageState } = collectDataMap;
        pageState.pageHoldTime.endTime = Date.now();
        if (store?.http?.sendBeacon) {
            store?.http?.sendBeacon(collectDataMap, store);
        } else {
            navigator?.sendBeacon(store?.http?.sendBeaconUrl || '/internal/cantor/api/overseas/chat/', JSON.stringify(collectDataMap));
        }
    } catch (e) {
        console.log(e, '内部错误');
    }
};

// 当load 函数运行失败的时候重新运行这个函数重新运行一次 数据
export const reloadPageState = () => {
    document.addEventListener('visibilitychange', pageToggleAction);
    pageShowAction();
    watcher.watch('pagehide', pageHideAction);
};

// 默认导出函数
export default function pageState(options) {
    document.addEventListener('visibilitychange', pageToggleAction);
    watcher.watch('pageshow', pageShowAction);
    watcher.watch('pagehide', pageHideAction);
}
