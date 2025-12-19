// 定义全局通用数据
import('./assets/css/index.scss');

// 创建组件
import { createTag, createNodeFragment, createNodeFixed } from './create-dom.js';
import { store } from './store/index.js';
// 基础组件
import QRadio from './components/q-radio.js';
import QEsInput from './components/q-esInput.js';
import QCheckbox from './components/q-checkbox.js';
import QTextarea from './components/q-textarea.js';

// 复用组件
import { Message } from './base/message.js';
import { createCheckbox } from './base/checkbox.js';
import { createRadio } from './base/radio.js';
import { createEsInput } from './base/input.js';
import { createButton } from './base/buttom.js';
import { createStyle, removeCreateStyle, createLinks } from './hooks.js';
import { CQuestionCard } from './components/c-question-card.js';
import { createProcess } from './base/process.js';
import createQuestionList from './components/c-quesion-list';
import { createScoreMoji, createNps } from './components/q-score.js';

// 样式
// 默认提交问卷行为
const testSendAction = (res) => {
    if (res.data?.process_result && res.data?.process_result?.questions) {
        const {
            data: {
                process_result: { questions },
            },
        } = res;
        const node = questions.map((q) => {
            if (q.type === 'radio') {
                return QRadio(q);
            } else if (q.type === 'checkbox') {
                return QCheckbox(q);
            } else if (q.type === 'subjective') {
                return QEsInput(q);
            } else {
                return QRadio(q);
            }
        });
        const Button = createButton('x', {
            type: 'text',
            style: {
                float: 'right',
                marginRight: '12px',
            },
            onclick: () => {
                vnode.$close();
            },
        });
        const div2 = createTag('div', {
            style: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
            },
        });
        const ButtonSubmit = createButton('提交问卷', {
            style: { marginTop: '8px' },
            onclick() {
                vnode.style.animationDirection = 'reverse';
                const values = node.map((v) => v.getValue());
                Message(`您选择的答案是：${values}`);
                setTimeout(() => {
                    vnode.$close();
                }, 2000);
            },
        });
        const nodeList = createNodeFragment(Button, ...node, div2.$append(ButtonSubmit));
        const vnode = CFixedBottom(nodeList);
    }
};
// 创建样式表
// todo test
const zapUiInitCreate = () => {
    import('./assets/css//css-js/index.js').then((res) => {
        const { tagkey } = store;
        createStyle(`${tagkey}-ui-css`, res.default);
    });
};
const init = (option) => {
    const { questionOptionsKeys = {}, ...surplus } = option;
    Object.assign(store.questionOptionsKeys, questionOptionsKeys);
    Object.assign(store, surplus);
    const { links = [] } = store;
    createLinks(links);
    if (store.cssInJs) zapUiInitCreate();
};

init(store);
export {
    createTag,
    createNodeFragment,
    createNodeFixed,
    createCheckbox,
    createRadio,
    createEsInput,
    createButton,
    createScoreMoji,
    createNps,
    createProcess,
    // components
    QCheckbox,
    QRadio,
    QEsInput,
    QTextarea,
    Message,
    CQuestionCard,
    createQuestionList,
    // Function hooks
    testSendAction,
    createStyle,
    removeCreateStyle,
    createLinks,
    init,
};
