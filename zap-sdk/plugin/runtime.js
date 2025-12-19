import { collectDataMap } from '../store/collect-data.js';
import store from '../store/index.js';
import { sendData } from '../api/api.js';
const runtiming = store.runtiming;

// 设置上报时间
const runtime = () => {
    store.runtimor = setTimeout(() => {
        const { scrollData, mousehoverData } = collectDataMap;
        if (scrollData.length && scrollData.length < 10) return;
        sendData({ scrollData, mousehoverData }).then((res) => {
            Object.assign(collectDataMap, { scrollData: [], mousehoverData: [] });
            runtime();
            return res;
        });
    }, runtiming);
};

export default runtime;
