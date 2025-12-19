// 基础配置对象
import store from './store/index';
import html2Canvas from 'html2Canvas';
/**
 * 静态函数
 *
 *  */

export const getScreenInfo = (() => ({ screenWidth: window.screen.width, screenHight: window.screen.height }))();

export const getClientInfo = () => ({ clientWidth: window.innerWidth, clientHeight: window.innerHeight });

/**
 * @description 字符串转base64
 * @param {String} str
 */
export const enCodeBase64 = (str) => {
    const bytes = new TextEncoder().encode(str);
    return btoa(String.fromCharCode(...bytes));
};

export const deCodeBase64 = (str) => {
    const bytes = new Uint8Array([...atob(str)]).map((v) => v.charCodeAt(0));
    return new TextDecoder().decode(bytes);
};

// 生成随机数组
export const getRandomString = (size = 2) =>
    Array(size)
        .fill('')
        .reduce((p) => p + Math.random().toString(36).slice(2), '');

/**
 * 动态函数
 *
 *  */
// 导出纯净的html元素页面
export const toPurityHtml = (dom) => {
    try {
        const node = typeof dom === 'object' ? dom : new DOMParser(dom);
        const [links, scripts] = [node.querySelectorAll('link'), node.querySelectorAll('script')];
        [links, scripts].forEach((item) => {
            item.forEach((v) => v.remove());
        });
        if (node?.documentElement) return node?.documentElement.innerHTML;
        return node?.innerHTML;
    } catch (e) {
        console.log(e);
    }
};

/**
 * @description 返回正确解析的字符串,解决unit8
 * @param {boolean} useBase64
 * @returns String
 */
export const getHtml = (useBase64 = false) => (useBase64 ? enCodeBase64(document.documentElement.outerHTML) : document.documentElement.outerHTML);

// 获取页面的图片格式
export const getHtmlImage = () => html2Canvas(document.documentElement).then((canvas) => canvas.toDataURL('image/jpeg', 1.0));

/**
 *
 * @param {string} str
 * @returns HTMLString
 */
export const getHtmlCleanDoc = (str) => {
    if (!str?.trim?.()) throw new Error(`${str} is not string`);
    const tags = store.removeHtmlTags;
    const node = new DOMParser()?.parseFromString(str, 'text/html');
    const getDom = (id) => node.querySelectorAll(id);
    const remove = (dom) => dom?.remove();
    const action = {
        script: () => {
            getDom('script').forEach(remove);
        },
        link: () => {
            getDom('link').forEach(remove);
        },
        style: () => {
            getDom('style').forEach(remove);
        },
        img: () => {
            getDom('img').forEach(remove);
        },
        svg: () => {
            getDom('svg').forEach(remove);
        },
    };
    tags.forEach((v) => action[v]());
    return node.documentElement.outerHTML;
};

// 获取页面加载新能参数
export const getPerformance = () => {
    return performance.getEntriesByType('navigation')?.[0];
};

// 获取时间函数
export const getTimeParam = (d = new Date()) => ({ time: d.getTime(), date: d.toLocaleString() });

// 获取浏览器信息
export const getNavigator = () => {
    return {
        platform: navigator.platform,
        userAgent: navigator.userAgent,
        language: navigator.language,
        isMobile: !!window.ontouchmove,
        ...getScreenInfo,
        ...getClientInfo(),
    };
};

// 获取地址信息
export const getUrlInfo = () => ({
    pathname: location.pathname,
    url: location.href,
    domain: location.host,
});

// 组合函数
export const compose =
    (...func) =>
    (...params) =>
        func.reduceRight((p, n, index) => (index === func.length - 1 ? n(...p) : n(p)), params);

// 获取页面基础信息
export const getPageInfo = function () {
    try {
        const pfm = getPerformance()?.serverTiming?.[0];
        const basePage = {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            isSSR: !!pfm,
            navigationType: navigation?.activation?.navigationType,
            timing: performance.timing,
            ...getScreenInfo,
            ...getUrlInfo(),
            ...getNavigator(),
            ...getTimeParam(),
        };
        return basePage;
    } catch (e) {
        console.error('脚本错误', e);
    }
};

/**
 * 返回基础信息结构
 */
export const getTargetInfo = (e) =>
    e?.target
        ? {
              target: e.target.innerText,
              //   target: enCodeBase64(e.target.outerHTML),
              originTarget: e.target.outerHTML,
              targetName: e?.target?.tagName?.toLowerCase(),
          }
        : {};

// 生成唯一值
export const getOnlyUid = (idWrap) => {
    const id = getRandomString();
    return idWrap[id] ? getOnlyUid(idWrap) : (idWrap[id] = id);
};

// 获取API 中对应的对象
export const getPropsMap = () => {
    const { apiProps, apiPropsValue } = store;
    let { searchSelector, productorWrap, productorSelector, globalSearchSelector, productParamsSelector } = apiProps;
    ({ searchSelector, productorWrap, productorSelector, globalSearchSelector, productParamsSelector } = apiPropsValue);
    return {
        searchSelector,
        productorWrap,
        productorSelector,
        globalSearchSelector,
        productParamsSelector,
    };
};
