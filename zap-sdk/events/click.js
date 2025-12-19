/**
 * click event
 */
import { getTargetInfo } from '../tools.js';
import watcher from '../plugin/watcher.js';
import { sendData } from '../api/api.js';
// 点击事件
export const getClick = function (e) {
    if (e.target.dataset.wjnode || e.target === document.documentElement) return;
    if (e?.target?.tagName?.toLowerCase() === 'input') return;
    const data = getTargetInfo(e);
    sendData({ clickData: data });
};

export default function click(options) {
    watcher.watch('click', getClick, true);
}
