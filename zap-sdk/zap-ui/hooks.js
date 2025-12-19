import { store } from './store/index';
import NodeElements from './store/node-elements.js';
// 使用钩子函数

export const useFormValue = (node, { getValue, setValue }) => {
    if (typeof getValue !== 'function')
        return console.error('useFormValue must has  hooks Function');
    Object.assign(node, {
        getValue,
        setValue,
    });
};

/**
 * 关闭当前弹窗
 */
export const useFixedNode = () => {
    return NodeElements.autoNode;
};

// 需要使用创建style的表
export const createStyle = (id, ...textList) => {
    try {
        if (document.head && !document.querySelector(`#${id}`)) {
            const style = document.createElement('style');
            style.textContent = textList.join('');
            style.id = id;
            document.head.append(style);
            store.test && console.log(id, '样式挂在成功');
        } else {
            store.test && console.log('已经存在');
        }
    } catch (e) {
        throw new Error('appendStyle is error');
    }
};

// 移除css-in-js
export const removeCreateStyle = (id) => {
    const styletarget = document.head.querySelector(`#${id}`);
    if (styletarget) styletarget.remove();
};

// 需要使用创建style的表
export const createLinks = (links) => {
    try {
        if (links?.length) {
            const head = document.head;
            // 创建远程links
            links.forEach((link) => {
                const _link = document.createElement('link');
                Object.assign(_link, {
                    onerror: () => {
                        throw new Error('link创建失败');
                    },
                    ...link,
                });

                const hadLinks = head.getElementsByTagName('link');
                if (!hadLinks.some((hadlink) => hadlink.id === link.id)) {
                    head.append(_link);
                }
            });
        }
    } catch (e) {
        throw new Error('useCreateLinks is error', e);
    }
};
