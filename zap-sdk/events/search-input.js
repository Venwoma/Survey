/**
 * 输入框事件
 *
 */
import store from '../store/index.js';
import { onEvent } from '../plugin/on-event.js';
import { collectDataMap } from '../store/collect-data.js';
import { sendData } from '../api/api.js';
import { curryDalay } from '../plugin/usejs.mjs';

const defineEnterAction = (event) => {
    if (event.key === 'Enter') {
        let { value: inputValue } = event?.target || {};
        inputValue = inputValue?.trim();
        collectDataMap.searchInputData.value = inputValue;
        sendData({ searchInputData: collectDataMap.searchInputData });
    }
};

const onInput = curryDalay((e) => {
    const value = e.target.value?.trim();
    if (value) {
        collectDataMap.searchInputData?.stateValueList?.push(value);
        collectDataMap.searchInputData.value = value;
        if (collectDataMap.searchInputData?.stateValueList.length >= 1) {
            sendData({ searchInputData: collectDataMap.searchInputData });
        }
    }
}, 2000);

export const searchOnEnter = (selector) => {
    onEvent(selector, {
        keyup: defineEnterAction,
    });
};
// 监听当前输入框内容
export const searchInterVal = () => {
    const select = store.search_box_selector;
    if (!select) return;
    const node = document.querySelector(select);
    if (!node) return;
    collectDataMap.searchInputData.value = node.value;
};

// 监听实时输入信息
export const searchOnInput = (select) => {
    try {
        if (!select) return;
        const selector = document.querySelector(select);
        if (selector) {
            selector.addEventListener('input', onInput);
        }
    } catch (e) {
        console.log(e, 'searchOnInput');
    }
};
