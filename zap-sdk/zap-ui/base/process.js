import { createTag } from '../create-dom';
import { store } from '../store';

/**
 *
 * @param {number} index  1~N
 * @param {*} total  0~n
 * @returns
 */
export const createProcess = (index = 1, total = 5) => {
    const { tagkey } = store;
    const left = `${((index - 1) * 100) / total}%`;
    const procseeLine = createTag('div', {
        style: {
            left,
            width: `${328 / total}px`,
        },
        classNames: [`${tagkey}-process-line`],
    });
    const ProcessNode = createTag('div', {
        classNames: [`${tagkey}-process`],
    }).$append(procseeLine);
    ProcessNode.dataset['total'] = total;
    ProcessNode.dataset['index'] = index;
    return ProcessNode;
};
