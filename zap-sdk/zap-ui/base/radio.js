// 单选按钮

// import create
import { createTag, createStringToNode } from '../create-dom';
import { protectData } from '../../store/protectData';
import { store } from '../store';

const tagkey = store.tagkey;
export const radioUidMap = protectData('radioUid');
/**
 *
*   @param interface RedioProps<T> {
        label?: string;
        value: T;
        onchange?: (value: T) => void;
        [key: string]: unknown;
    }
    @param interface RedioComponent<T> {
        (props?: Partial<RedioProps<T>>): HTMLLabelElement & { getValue: () => T | '' };
        displayName?: string;
    }

 *
 */
export const createRadio = (name) => {
    const Redio = ({ label = '单选', value = 1, onchange, slot, ...surplus } = {}) => {
        //  创建容器
        let RedioComponent = createTag('label', {
            classNames: [
                `${tagkey}-radio`,
                slot ? '' : `${tagkey}-radio-checkbox-label`,
                `${tagkey}-no-selected`,
            ],
        });
        // 创建表单
        const input = createStringToNode(
            `<input type="radio"  value=${value}  name="${name}" data-${tagkey}="true" label="${label}"/>`,
        );
        // 创建内容体
        const span = createStringToNode(`<span data-${tagkey}="true">${label || ''}</span>`);
        // 组合组件
        RedioComponent.$append(input, slot || span);
        // 暴露函数，获取当前的状态
        Object.assign(RedioComponent, {
            ...surplus,
            label: label,
            value: value,
            // 单选获取值
            getValue: () => ({
                checked: (RedioComponent.control || RedioComponent.querySelector('input'))?.checked,
                value,
                label,
            }),
            // 单选设置值
            setValue: (val) => {
                const input = RedioComponent.control || RedioComponent.querySelector('input');
                input.checked = !!val;
            },
            onchange: () => {
                onchange?.(value, label);
            },
        });

        return RedioComponent;
    };
    return Redio;
};
