import { createNodeFixed, createTag } from '../create-dom';
import { store } from '../store';
import { createButton } from '../base/buttom';
import { createNodeFragment } from '../create-dom';
import closeImage from '../assets/images/close.png';
import { createProcess } from '../base/process';

export const CQuestionCard = (node, option = {}) => {
    const tagkey = store.tagkey;
    const {
        style, // 自定义样式
        classNames = [], // 类名数组
        backClick, // 回退按钮
        nextClick, // 下一步按钮
        close, // close函数
        index = 1, // 当前题目索引
        total = 1, // 题目总数
        left, // 定位
        right,
        bottom,
        top,
        created, // 钩子函数生命周期
        ...surplus
    } = option;
    const closeNode = createTag('img', {
        src: closeImage,
        classNames: [`${tagkey}-close`, `${tagkey}-icon`],
        onclick: () => {
            close?.(fixCard);
        },
    });

    // 底部按钮
    const Buttonlist = [];
    if (index > 1) {
        Buttonlist.push(createButton('back', { type: 'dark', onclick: backClick }));
    }
    if (index <= total && !['single', 'score_emoji'].includes(node.questionType)) {
        const isLast = index === total;
        Buttonlist.push(
            createButton(isLast ? 'Finish' : 'Next', {
                type: 'primary',
                onclick: nextClick,
            }),
        );
    }
    const Foot = createTag('div', { classNames: [`${tagkey}-c-question-card_foot`] }).$append(
        ...Buttonlist,
    );

    // 创建组件弹窗内容
    const nodeList =
        total === 1
            ? [node, Foot, closeNode]
            : [createProcess(index, total), node, Foot, closeNode];
    const fixCard = createNodeFixed(createNodeFragment(...nodeList), {
        childNode: node,
        style,
        classNames: [`${tagkey}-c-question-card`, ...classNames],
        ...surplus,
    });
    Object.assign(fixCard.style, { left, right, bottom, top });
    typeof created === 'function' && created?.(fixCard);
    return fixCard;
};
