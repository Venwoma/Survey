// 收集的数据信息
export const collectDataAll = [];
export const createCollectData = () => ({
    //
    // 用户信息
    userInfo: {},
    // 页面切换数据存储
    pageState: {
        leaveTime: [], // 切换页面的时间集合
        // 持续时间
        pageHoldTime: {
            startTime: '',
            endTime: '',
        },
    },
    // 点击过的元素
    clickData: [],
    // 滚轴数据对象
    scrollData: [],
    // 鼠标悬浮时间
    mousehoverData: [],
    // 鼠标数据存储
    mousemoveData: [],
    // 搜索数据
    searchInputData: {
        value: '', // 实时记录的值+回车记录信息
        stateValueList: [], // 输入未回车的记录信息
    },
    //监听器信息
    observerData: {
        paramsObserver: [], // 悬浮在参数上的时间戳数组
        productListObserver: [], // 列表页面被进入可视区的产品时间戳与对象元素
    },
});
// 创建
export const collectDataMap = createCollectData();

// 清空
export const clearCollect = () => {
    Object.assign(collectDataMap, createCollectData());
};

// 更新数据
export const upDateCollect = (keys) => {
    const data = createCollectData();
    keys.forEach((item) => {
        if (collectDataMap[item]) collectDataMap[item] = data[item];
    });

    clearCollect();
};
