const watcher = Object.freeze({
    watch(eventType, callback, config = false) {
        if (watcher.watchList.has(eventType)) {
            watcher.watchList.get(eventType).push(callback);
        } else {
            watcher.watchList.set(eventType, [callback]);
        }
        // 注册事件
        window.addEventListener(eventType, callback, config);
    },
    offWatch(eventType, callback) {
        window.removeEventListener(eventType, callback);
    },
    // 移除所有
    offWatchAll() {
        this.watchList.clear();
    },
    // 列队数据
    unloadQueueListAction: [], // 关闭的时候需要做的行为
    unload(fn, isSertFirst = false) {
        if (typeof fn === 'function') {
            if (isSertFirst === true) watcher.unloadQueueListAction[isSertFirst ? 'unshift' : 'push'](fn);
        }
    },
    // 页面移除的时候 移除所有当前页面的事件行为
    pageUnload() {
        watcher.watch('beforeunload ', () => {
            watcher.watchList.forEach((value, key) => {
                value.forEach((fn) => {
                    watcher.offWatch(key, fn);
                });
            });
            watcher.unloadQueueListAction?.forEach((fn) => {
                fn();
            });
        });
    },

    // 观察器
    emit(eventName, ...params) {
        const { onList, queue } = this;
        if (onList.has(eventName)) {
            onList.get(eventName).forEach((item) => {
                item(...params);
            });
        } else {
            queue.has(eventName) ? queue.get(eventName).push(params) : queue.set(eventName, [params]);
        }
    },
    on(eventName, fn) {
        const { onList, queue } = this;
        onList.has(eventName) ? onList.get(eventName).push(fn) : onList.set(eventName, [fn]);
        if (queue.has(eventName)) {
            queue.get(eventName).forEach((param) => {
                fn(queue.get(...param));
            });
            queue.delete(eventName);
        }
    },
    off(eventName, fn) {
        const ami = this.onList.get(eventName)?.findIndex((fnName) => fnName === fn);
        if (ami !== 0 && ami !== -1) this.onList.get(eventName).splice(ami, 1);
    },
    offAll() {
        this.onList.clear();
    },
    // 收集监听集合
    watchList: new Map(),
    // 观察者集合
    onList: new WeakMap(),
    // 列队集合
    queue: new WeakMap(),
});

export default watcher;
