// js
import NodeElements from './store/node-elements.js';
import { store } from './store/index.js';
/**
 * 基础模型定义
 */
const defineStyle = {
    boxSizing: 'border-box',
};
const definePorps = {
    $append(...dom) {
        if (dom.length) {
            this.append(...dom);
        } else {
            document.body.appendChild(this);
        }
        return this;
    },
    $appendTo(node) {
        node && node.appendChild(this);
    },
    $atFixed(option = { right: 0, bottom: 0 }) {
        Object.assign(this.style, {
            position: 'fixed',
            ...option,
        });
        return this;
    },
    $on(event, fn, option) {
        this.addEventListener(event, fn, option);
        return this;
    },
    $off(event, fn) {
        this.removeEventListener(event, fn);
        return this;
    },
    $show() {
        if (this.style.display !== 'none') return this;
        this.style.display = this.$show.preState;
        return this;
    },
    $hide() {
        if (this.style.display === 'none') return this;
        this.$show.preState = this.style.display;
        this.style.display = 'none';
        return this;
    },
    $bcColor(color = 'white') {
        this.style.backgroundColor = color;
        return this;
    },
    $close(time, closedFn) {
        if (time && typeof time === 'number') {
            this.preCloseTimer = setTimeout(
                () => {
                    closedFn?.();
                    this.$close();
                },
                time > 100 ? time : time * 1000,
            );
            return this;
        }
        if (this?.remove) {
            time?.() || closedFn?.();
            this?.remove();
        } else {
            time?.() || closedFn?.();
            this.parentNode?.removeChild(this);
        }
        return this;
    },
    $clearClose() {
        if (this.preCloseTimer) clearTimeout(this.preCloseTimer);
    },
    $autoClose() {
        if (NodeElements.autoNode) {
            NodeElements.autoNode.$close();
        }
        if (this instanceof HTMLDivElement) {
            NodeElements.autoNode = this;
        }
        return this;
    },
};
const defineDivStyleProps = {
    ...defineStyle,
};
const defineSpenStyleProps = {
    ...defineStyle,
};

const BaseDiv = class extends HTMLDivElement {
    constructor() {
        super();
    }
};

const ExtendDiv = class extends BaseDiv {
    constructor() {
        super();
    }
};
Object.assign(ExtendDiv.prototype, definePorps);

class WjDiv extends ExtendDiv {
    constructor() {
        super();
        Object.assign(this.style, defineDivStyleProps);
        this.setAttribute('wj-div', true);
    }
}
class WjSpan extends ExtendDiv {
    constructor() {
        super();
        Object.assign(this.style, defineSpenStyleProps);
        this.setAttribute('wj-span', true);
    }
}

/**
 * 扩展标签属性
 */
customElements.define(`${store.tagkey}-div`, WjDiv, {
    extends: 'div', //扩展的DIV标签
});
customElements.define(`${store.tagkey}-span`, WjSpan, {
    extends: 'span', //扩展的DIV标签
});

/**
 * 对外暴露函数
 */
export const transformArrayClassNames = (classNames) =>
    Array.isArray(classNames) ? classNames : [classNames];

export const addClassName = (node, classNames) => {
    try {
        const names = Array.isArray(classNames) ? classNames : [classNames];
        return names.filter(Boolean).length && node.classList.add(...names.filter(Boolean));
    } catch (e) {
        console.log(e, 'addClassName Function params names is Not Array');
    }
};

/**
 *
 * @param {HtmlElement} tag
 * @param {*Object<{style: object,className}>} param1
 * @returns object<HtmlBaseDivElement>
 */
export const createTag = (tag, { style, classNames = '', ...surplus } = {}) => {
    const target = document.createElement(tag);
    Object.assign(target, surplus, definePorps);
    Object.assign(target.style, style);
    target.classList.add(`${store.tagkey}`);
    target.dataset[`${store.tagkey}`] = 'true';
    addClassName(target, classNames);
    return target;
};

// 创建一个字符串元素产生的DOM
export const createStringToNode = (string, { style, classNames = [], ...surplus } = {}) => {
    const template = document.createElement('template');
    if (typeof string === 'string' && string.trim()) {
        template.innerHTML = string;
        const dom = template.content.firstChild;
        if (dom) {
            Object.assign(dom.style, defineStyle, style);
            dom.classList.add(...classNames);
            Object.assign(dom, definePorps, surplus);
        }
        return template.content.firstChild;
    } else {
        console.log('createNode params mush be StringHTML');
    }
};

// 创建代码片段，临时容器
export const createNodeFragment = (...doms) => {
    const template = document.createDocumentFragment();
    Object.assign(template, definePorps);
    doms.forEach((v) => template.append(v));
    return template;
};

// 创建一个自定义卡片
export const createNodeFixed = (
    string,
    { tag = 'div', style, classNames = '', ...surplus } = {},
) => {
    const nodeWrap = createTag(tag);
    const defaultStyle = {
        position: 'ralative',
    };
    if (typeof string === 'string') {
        nodeWrap.innerHTML = string;
    } else if (string.append) {
        nodeWrap.appendChild(string);
    } else {
        throw new Error(string, '不是合格的对象');
    }
    Object.assign(nodeWrap, surplus);
    Object.assign(nodeWrap.style, defaultStyle, { ...style });
    addClassName(nodeWrap, [`${store.tagkey}`, ...classNames]);
    return nodeWrap;
};
