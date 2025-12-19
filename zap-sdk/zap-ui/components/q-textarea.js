import { store } from '../store/index';
import { createEsInput } from '../base/input';
import createTitle from '../base/title';
import { createTag } from '../create-dom';

export default function QTextarea(question, option) {
    const tagkey = store.tagkey;
    const { transformFunc, style, classNames = [], ...surplus } = option || {};
    let transformData = question;
    if (transformFunc) {
        transformData = transformFunc(question);
    }
    const { title, question_type: questionType } = transformData;
    const Title = createTitle(title || '标题');
    const Textare = createEsInput({
        type: 'textarea',
        auto: false,
        rows: 3,
        style: { resize: 'none', width: '100%', ...style },
        ...option,
        classNames: [`${tagkey}-mt-24`, ...classNames],
        surplus,
    });
    const QWrap = createTag('div', {
        classNames: [`${tagkey}-q-textarea`],
    }).$append(Title, Textare);

    Object.assign(QWrap, {
        value: Textare.value,
        uid: question[store.questionOptionsKeys.id],
        question,
        questionType,
        getValue: () => Textare.value,
        setValue: (value) => {
            Textare.value = value;
        },
    });
    return QWrap;
}
