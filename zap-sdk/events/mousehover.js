/**
 * 鼠标悬浮事件
 */
import store from '../store/index.js';
import { collectDataMap } from '../store/collect-data.js';
import { getPropsMap, getTargetInfo, getTimeParam } from '../tools.js';

const { overTime } = store;

/**
 * 事件委托方式
 */
const mouseoverAction = (e) => {
    const { productorSelector } = getPropsMap();
    const selector = productorSelector?.split('.').filter(Boolean);
    if (selector.every((v) => e.target.classList.contains(v))) {
        e.target.enterTime = getTimeParam().time;
    }
};

const mouseoutAction = (e) => {
    if (e.target?.enterTime) {
        const data = {
            ...getTargetInfo(e),
            ...getTimeParam(),
        };
        e.target.leaveTime = data.time - e.target.enterTime;
        if (e.target?.leaveTime > 1000 * overTime) {
            data.overTime = e.target.leaveTime;
            collectDataMap.mousehoverData.push(data);
            store.isTest && console.log('悬浮时间大于' + overTime + '秒');
        }
    }
};

export default function (options) {
    document.body.addEventListener('mouseover', mouseoverAction);
    document.body.addEventListener('mouseout', mouseoutAction);
}
