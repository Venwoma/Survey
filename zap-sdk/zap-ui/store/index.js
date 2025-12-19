const localLanguage = 'en-US'; // globalThis.navigator?.language;

export const store = (() => {
    return {
        version: '1.0.0',
        baseUrl: 'https://s1.wenjuan.com/assets/zap-sdk',
        tagkey: 'zap',
        language: localLanguage,
        languages: ['zh-CN', 'en-US'],
        zIndex: 4000,
        test: false, // 开发环境
        debugger: false, //调试功能
        // 题目对象参数列表
        questionOptionsKeys: {
            // 结构
            id: 'gid',
        },
        cssInJs: false, // 是否动态挂在css资源
        links: [], // 需要加载的CDN 远程资源
    };
})();
