/**
 * 排查性能问题
 */

export const getPerformanceMemory = () => {
    const memory = performance.memory;
    return {
        useMemory: (memory.usedJSHeapSize / (1024 * 1024)).toFixed(2) + 'm',
        totalMemory: (memory.totalJSHeapSize / (1024 * 1024)).toFixed(2) + 'm',
    };
};
