import { createRadio, radioUidMap } from '../base/radio';
import { store } from '../store';
import { createTag } from '../create-dom';
import CreateTitle from '../base/title';

/**
 *
 * @param {Object<{title:String,options:Array<string>}>} question
 * @returns HTMLDivElement
 */
/**
 *
 * @param {参数} question
 * @param {Object} options
 * @returns object<{questionType: '题目类型'}>
 */
export default function QRadio(question, options) {
    const tagkey = store.tagkey;
    const { id, onchange, transformDataFunc } = options || {};
    const storeId = store?.questionOptionsKeys.id;
    // 优化外部转化
    let transformData = question;
    if (transformDataFunc) {
        transformData = transformDataFunc(question);
    }

    const { title, options: radioOptions = [], question_type: questionType } = transformData;
    const uid = id || transformData[storeId] || radioUidMap.getUid();
    const Radio = createRadio(uid);
    const Title = CreateTitle(title);

    const doms = radioOptions.map((v, index) =>
        Radio({
            label: v.title,
            value: v.gid,
            index,
            onchange: (val) => {
                radioQuestion.value = val;
                onchange?.(val);
            },
        }),
    );
    const radioGroup = createTag('div', { classNames: [`${tagkey}-radio-checkbox-group`] }).$append(
        ...doms,
    );

    const radioQuestion = createTag('div', {
        questionType,
        classNames: `${tagkey}-q-radio`,
    }).$append(Title, radioGroup);
    Object.assign(radioQuestion, {
        value: radioQuestion.value,
        uid,
        question,
        getValue: () => radioQuestion.value,
        setValue: (val) => {
            radioQuestion.value = val;
            doms.forEach((dom) => {
                dom.setValue(val === dom.value);
            });
        },
        clear() {
            radioQuestion.value = '';
            doms.forEach((dom) => {
                dom.setValue(false);
            });
        },
    });
    return radioQuestion;
}
