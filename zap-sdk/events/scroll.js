/**
 * 滚动事件
 */
import watcher from '../plugin/watcher.js';
import { sendData } from '../api/api.js';
import store from '../store/index.js';
import { collectDataMap } from '../store/collect-data.js';
import { getTimeParam } from '../tools.js';

const scrollThrottleTime = store.scrollThrottleTime || 1500;

let scrollData = {};
const scrollAction = (e) => {
    if (scrollAction.$throttle) return;
    scrollAction.$throttle = true;
    const data = {
        startTime: getTimeParam().time,
        startScrollTop: e.target?.scrollingElement?.scrollTop,
    };
    Object.assign(scrollData, data);
};

const scrollendAction =
    (timing = 500) =>
    (e) => {
        if (scrollendAction.$debounce) {
            clearTimeout(scrollendAction.$debounce);
            scrollendAction.$debounce = null;
        }
        scrollendAction.$debounce = setTimeout(() => {
            scrollAction.$debounce = null;
            const data = {
                endScrollTop: e.target.scrollingElement.scrollTop,
                offsetHeight: e.target.scrollingElement.offsetHeight,
                endTime: getTimeParam().time,
            };
            Object.assign(scrollData, data);
            sendData({ scrollData: scrollData });
            collectDataMap.scrollData.push(scrollData);
        }, timing);
    };

export default function (options) {
    try {
        watcher.watch('scroll', scrollAction);
        watcher.watch('scrollend', scrollendAction(scrollThrottleTime));
    } catch (e) {
        console.warn('浏览器不支持scrollend', e);
    }
}
