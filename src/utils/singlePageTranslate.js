import { translate } from 'baidu-translate-api';
import debounce from 'lodash.debounce';
import cloneDeep from 'lodash.clonedeep';

// 每个页面独立缓存（避免跨页面污染）
const pageCache = new Map();
// 无需翻译的配置（按需调整）
const ignoreTags = ['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'];
const ignoreTextReg = /^[\d\W_]+$/i;
const ignoreKeywords = ['ZAP-CRM', 'API', 'VIP'];

/**
 * 生成节点唯一标识（仅在当前页面内生效）
 */
const getNodeKey = (node, pageId) => `${pageId}-${node.tagName}-${Array.from(node.parentNode.children).indexOf(node)}`;

/**
 * 只遍历指定页面节点的文本
 */
const crawlPageText = (pageRoot, pageId) => {
    const result = [];
    const walker = document.createTreeWalker(pageRoot, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            const parentTag = node.parentElement?.tagName || '';
            if (ignoreTags.includes(parentTag) || !node.textContent.trim()) {
                return NodeFilter.FILTER_SKIP;
            }
            return NodeFilter.FILTER_ACCEPT;
        },
    });

    let currentNode;
    while ((currentNode = walker.nextNode())) {
        const text = currentNode.textContent.trim();
        // 过滤无需翻译的文本
        if (ignoreTextReg.test(text) || ignoreKeywords.some((k) => text.includes(k))) {
            continue;
        }
        result.push({
            node: currentNode,
            text,
            key: getNodeKey(currentNode, pageId),
        });
    }
    return result;
};

/**
 * 批量翻译（防抖）
 */
const batchTranslate = debounce(async (textList) => {
    const map = {};
    const uniqueTexts = [...new Set(textList)].filter(Boolean);
    if (uniqueTexts.length === 0) return map;

    try {
        for (const text of uniqueTexts) {
            const res = await translate(text, { from: 'en', to: 'zh' });
            map[text] = res.trans_result.dst;
        }
    } catch (err) {
        console.error('翻译失败：', err);
        uniqueTexts.forEach((t) => (map[t] = t));
    }
    return map;
}, 200);

/**
 * 单页面切换语言
 * @param {HTMLElement} pageRoot 页面根节点（如 ref 指向的 div）
 * @param {string} pageId 页面唯一标识（如 'home-page'）
 * @returns {boolean} 当前是否为中文状态
 */
export const togglePageLanguage = async (pageRoot, pageId) => {
    if (!pageRoot || !pageId) return false;

    // 初始化页面缓存
    if (!pageCache.has(pageId)) {
        pageCache.set(pageId, {
            isZh: false,
            original: new Map(),
        });
    }
    const cache = pageCache.get(pageId);

    if (cache.isZh) {
        // 切回英文：恢复缓存的原文
        const textNodes = crawlPageText(pageRoot, pageId);
        textNodes.forEach(({ node, key }) => {
            if (cache.original.has(key)) {
                node.textContent = cache.original.get(key);
            }
        });
        cache.isZh = false;
    } else {
        // 切换中文：抓取 → 缓存 → 翻译 → 替换
        const textNodes = crawlPageText(pageRoot, pageId);
        // 缓存原文（仅第一次）
        textNodes.forEach(({ node, text, key }) => {
            if (!cache.original.has(key)) {
                cache.original.set(key, cloneDeep(text));
            }
        });
        // 翻译并替换
        const textList = textNodes.map((item) => item.text);
        const translateMap = await batchTranslate(textList);
        textNodes.forEach(({ node, text }) => {
            node.textContent = translateMap[text] || text;
        });
        cache.isZh = true;
    }

    return cache.isZh;
};

/**
 * 页面卸载时清空缓存（释放内存）
 * @param {string} pageId 页面唯一标识
 */
export const clearPageCache = (pageId) => {
    if (pageCache.has(pageId)) {
        pageCache.get(pageId).original.clear();
        pageCache.delete(pageId);
    }
};
