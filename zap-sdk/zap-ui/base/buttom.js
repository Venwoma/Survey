import { createTag } from '../create-dom';
import { store } from '../store';

const tagkey = store.tagkey;

export const createButton = (
    label,
    { type = 'primary', style, classNames = [], ...surplus } = {},
) => {
    const button = createTag('span', {
        classNames: [`${tagkey}-button`, `${tagkey}-button-${type}`, ...classNames],
        style,
    });
    button.textContent = label;
    Object.assign(button, surplus);
    return button;
};
