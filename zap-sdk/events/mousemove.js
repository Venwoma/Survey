// import store from '../store/index.js';
import { collectDataMap } from '../store/collect-data.js';
import Watcher from '../plugin/watcher.js';
import { getTargetInfo, getTimeParam } from '../tools.js';
import { sendData } from '../api/api.js';
//获取鼠标信息
export const getMouseInfo = ({ pageX, pageY }) => ({ pageX, pageY });

/**
 *
 * @description 防抖模式
 *
 */
const mousemoveActionDebounce = (e) => {
    if (e.target.dataset.wjnode || e.target === document.documentElement) return;
    if (mousemoveActionDebounce.$time) {
        clearTimeout(mousemoveActionDebounce.$time);
    } else {
        const startData = {
            ...getTargetInfo(e),
            ...getMouseInfo(e),
            ...getTimeParam(),
        };
        collectDataMap.mousemoveData.push(startData);
    }
    mousemoveActionDebounce.$time = setTimeout(() => {
        const endData = {
            ...getTargetInfo(e),
            ...getMouseInfo(e),
            ...getTimeParam(),
        };
        collectDataMap.mousemoveData.push(endData);
        mousemoveActionDebounce.$time = null;
        sendData({ mousemoveData: collectDataMap.mousemoveData });
        collectDataMap.mousemoveData = [];
    }, 1000);
};

export const mousemoveAction = (e) => {
    mousemoveActionDebounce(e);
};

export default function (options) {
    Watcher.watch('mousemove', mousemoveAction);
}
