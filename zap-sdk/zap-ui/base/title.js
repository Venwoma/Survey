import { createTag } from '../create-dom';
import { store } from '../store';

const tagkey = store.tagkey;

export default function createTitle(str, { tag = 'div', classNames = [] } = {}) {
    const stag = createTag(tag, { classNames: [`${tagkey}-title`, ...classNames] });
    stag.innerHTML = str;
    return stag;
}
