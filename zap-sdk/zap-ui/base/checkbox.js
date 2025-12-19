// 多选按钮
import { store } from '../store';
import { createTag } from '../create-dom';
import { protectData } from '../../store/protectData';
import checkedImage from '../assets/images/checked.png';
const tagkey = store.tagkey;

export const checkboxUidMap = protectData('checkboxUid');
export const createCheckbox =
    (name) =>
    ({ label = '多选', value = 1, style = {}, classNames = [], onchange, ...surplus } = {}) => {
        let CheckboxCompoment = createTag('label', {
            style,
            classNames: [
                `${tagkey}-checkbox`,
                `${tagkey}-radio-checkbox-label`,
                `${tagkey}-no-selected`,
                ...classNames,
            ],
        });
        let form = `<input type="checkbox" value=${value} name="${name}" data-${tagkey}='true'/>`;
        form += label
            ? `<span data-${tagkey}node='true' class="${tagkey}-flex ${tagkey}-checkbox-label">${label}                
            </span>
            <img src="${checkedImage}" class="${tagkey}-icon" alt="${tagkey}"></img>`
            : '';
        CheckboxCompoment.innerHTML = form;
        CheckboxCompoment.onchange = () => {
            const input = CheckboxCompoment.control || CheckboxCompoment.querySelector('input');
            CheckboxCompoment.checked = input.checked;
            onchange?.(input.checked, value, label, input);
        };

        Object.assign(CheckboxCompoment, surplus, {
            label: label,
            value: value,
            checked: !!CheckboxCompoment.checked,
            getValue: () => ({ checked: CheckboxCompoment.checked, value }),
            setValue: (val) => {
                const input = CheckboxCompoment.control || CheckboxCompoment.querySelector('input');
                input.checked = !!val;
                CheckboxCompoment.checked = !!val;
            },
        });
        return CheckboxCompoment;
    };
