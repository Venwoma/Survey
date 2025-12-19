import kyolHttp from './baseApi.js';
import store from '../store/index.js';
import { getHtml, getTimeParam, getHtmlCleanDoc } from '../tools.js';
import { eventUidMap } from '../store/protectData.js';

import { collectDataAll } from '../store/collect-data.js';
let instace = kyolHttp({
    base: '/',
    url: store.http.target,
});

//
instace.interceptors.request.use((config) => {
    if (store.http?.intercaptor.request) store.http?.intercaptor.response(config);
    return config;
});

// 拦截器
instace.interceptors.response.use((response) => {
    if (store.http?.intercaptor.response) store.http?.intercaptor.response(response);
    return response;
});

export const getInit = () => (store?.http?.getInit ? store?.http?.getInit() : instace({ method: 'POST', data: { autoInit: true }, isdev: true }));

export const sendData = (data, options) => {
    Object.assign(data, { event_id: eventUidMap.getUid(), ...getTimeParam() });
    if (data[store.eventType] !== 'init') {
        Object.assign(data, {
            [store.eventType]: 'generate_question',
            html: getHtmlCleanDoc(getHtml(store.isHtmlBase64)),
        });
    }
    const { html = '', eventType, time, event_id, ...surplus } = data;
    const _data = {
        event_id,
        event_type: eventType,
        page_content: html,
        custom_metadata: surplus,
        timestamp: time,
    };
    collectDataAll.push(JSON.parse(JSON.stringify(_data)));
    if (store?.isTest) console.log(_data); // 处理所有数据行为
    return store?.http?.sendData ? store?.http?.sendData?.(data) : instace({ method: 'POST', data: _data, ...options });
};
