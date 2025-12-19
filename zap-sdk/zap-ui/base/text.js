import { createTag } from '../create-dom';

export const createText = (str, { classNames = [] } = {}) => {
    const span = createTag('span', { classNames: [...classNames] });
    span.innerHTML = str;
    return span;
};
