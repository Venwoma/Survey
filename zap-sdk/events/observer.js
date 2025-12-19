/**
 * 观察角色
 */
import { createObserver } from '../plugin/usejs.mjs';
import { collectDataMap } from '../store/collect-data.js';
import { getTimeParam } from '../tools.js';
import store from '../store/index.js';

// 创建监听器对象
export const instance = createObserver();

// 参数监听
export const paramsObverser = (paramsSelector) => {
    try {
        const { observerData } = collectDataMap;
        const { runState } = store;
        if (runState.hasOnParamsObserver) return;
        const dynamicNode = document.querySelector(paramsSelector); // 获取动态类
        console.log(dynamicNode, 'productor=>', paramsSelector);
        let startTime = '';
        if (!dynamicNode) {
            runState.hasOnParamsObserver = false;

            return;
        }
        runState.hasOnParamsObserver = true;
        instance.add(dynamicNode).then(({ isIntersecting }) => {
            if (isIntersecting) {
                startTime = getTimeParam().time;
            } else {
                if (startTime) {
                    observerData.paramsObserver.push({
                        startTime,
                        endTime: getTimeParam().time,
                    });
                }
            }
        });
    } catch (e) {
        console.log('不存在商品参数区域', e);
    }
};

export const productListObserver = (selectors) => {
    const { observerData } = collectDataMap;
    const { runState } = store;
    try {
        if (runState.hasOnProductListObserver) return;
        const dynamicNodes = Array.from(document.querySelectorAll(selectors) || []); // 获取动态类
        console.log(dynamicNodes, 'productor=>', selectors);
        if (!dynamicNodes && dynamicNodes.length) return (runState.hasOnProductListObserver = false);
        runState.hasOnProductListObserver = true;
        dynamicNodes.forEach((dynamicNode) => {
            dynamicNode.setAttribute('observer', true);
            instance.add(dynamicNode).then((isIntersecting) => {
                if (isIntersecting) {
                    dynamicNode.startTime = getTimeParam().time;
                } else {
                    if (dynamicNode.startTime) {
                        observerData.productListObserver.push({
                            startTime: dynamicNode.startTime,
                            endTime: getTimeParam().time,
                            target: dynamicNode.outerHTML,
                        });
                    }
                }
            });
        });
    } catch (e) {
        console.log('不存在商品参数区域', e);
    }
};
