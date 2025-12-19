import { createTag, createNodeFragment } from '../create-dom';
import { createEsInput } from '../base/input';
import Title from '../base/title';
const QEsInput = (question, option) => {
    const h2 = question.title ? Title(question.title) : '';
    const input = createEsInput();
    const wrap = createTag('span');
    createNodeFragment(h2, input).$appendTo(wrap);
    Object.assign(wrap, {
        questionType: 'input',
        ...option,
    });
    return wrap;
};
export default QEsInput;
