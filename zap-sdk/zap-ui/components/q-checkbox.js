import { createTag } from '../create-dom';
import { createCheckbox, checkboxUidMap } from '../base/checkbox';
import CreateTitle from '../base/title';
import { store } from '../store';

// 创建多选题型
export default function QCheckbox(
    question,
    { tag = 'div', id, classNames = [], transformDataFunc, onchange } = {},
) {
    const {
        questionOptionsKeys: { id: storeId },
        tagkey,
    } = store;
    // 优化外部转化
    let transformData = question;
    if (transformDataFunc) {
        transformData = transformDataFunc(question);
    }

    const { title, options: checkboxOptions = [], question_type: questionType } = transformData;

    const uid = id || transformData[storeId] || checkboxUidMap.getUid();
    const Checkbox = createCheckbox(uid);
    const Title = CreateTitle(title || '标题');
    const checkboxValue = new Set([]);
    const doms = checkboxOptions.map((v) =>
        Checkbox({
            label: v.title,
            value: v.gid,
            onchange: (state, value, label, e) => {
                if (state) {
                    checkboxValue.add(value);
                } else {
                    checkboxValue.delete(value);
                }
                checkboxQuestion.value = [...checkboxValue];
                onchange?.([...checkboxValue], state, value, label, e);
            },
            classNames: [`${tagkey}-flex-between`],
        }),
    );
    const checkboxGroup = createTag('div', {
        classNames: [`${tagkey}-radio-checkbox-group`],
    }).$append(...doms);

    const checkboxQuestion = createTag(tag, {
        questionType,
        classNames: [`${tagkey}-q-checkbox`, ...classNames],
    }).$append(Title, checkboxGroup);
    Object.assign(checkboxQuestion, {
        value: checkboxValue,
        uid,
        getValue: () => {
            return [...checkboxValue];
        },
        setValue: (value) => {
            checkboxValue.clear();
            value.forEach((v) => checkboxValue.add(v));
            doms.forEach((dom) => {
                dom.setValue(value.includes(dom.value));
            });
            checkboxQuestion.value = [...checkboxValue];
        },
        clear() {
            checkboxQuestion.value = [];
            doms.forEach((dom) => {
                dom.setValue(false);
            });
        },
    });
    return checkboxQuestion;
}
