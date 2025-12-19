// import create
import { createStringToNode } from '../create-dom';
import { protectData } from '../../store/protectData';
import { store } from '../store';

const tagkey = store.tagkey;
// 创建数据
export const inputUidMap = protectData('input');

// 基础输入框
export const createEsInput = ({
    value = '',
    placeholder = '请输入',
    classNames = [],
    type = 'text',
    ...surplus
} = {}) => {
    try {
        const id = inputUidMap.getUid();
        const tag = type === 'text' ? 'input' : 'textarea';
        let form = `<${tag} type="${type}" data-${tagkey}='true' value="${value}" name="${id}" placeholder="${placeholder}" />`;
        const input = createStringToNode(form, {
            classNames: [`${tagkey}-input-base`, ...classNames],
            ...surplus,
        });
        return input;
    } catch (e) {
        console.log(e, 'createEsInput');
    }
};
