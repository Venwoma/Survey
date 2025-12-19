import { createNodeFragment, createTag } from '../create-dom';
import { createRadio, radioUidMap } from '../base/radio';
import { store } from '../store';
import createTitle from '../base/title';
import { createText } from '../base/text';
import { uselanguage } from '../lang';
/**
 *
 * @param {{
 *      values : 选择的枚举值
 *      type：类型 emoji | star
 *      onchange:  值改变的时候触发函数  参数(value,label)
 *      }}} option
 * @returns
 */
export const createScoreMoji = (question, option) => {
    /** 获取基础信息 */
    const {
        title,
        question_type: questionType = 'score_emoji',
        max_answer_num: max = 3,
        min_answer_num: min = 0,
    } = question || {};
    const { onchange, options = [] } = option || {};
    const {
        baseUrl,
        tagkey,
        questionOptionsKeys: { id },
    } = store;
    const type = questionType === 'score_emoji' ? 'emoji' : 'star';
    /**组装信息 */
    const molist = (
        type === 'emoji'
            ? max === 3
                ? ['A', 'C', 'E']
                : ['A', 'B', 'C', 'D', 'E']
            : Array(5).fill('F')
    ).slice(0, max);

    const uid = question[id] || radioUidMap.getUid();
    const createRadioNode = createRadio(uid);
    const ScroeNode = createTag('div', {
        uid,
        question,
        questionType,
        classNames: [`${tagkey}-score`, `${tagkey}-score-${type === 'emoji' ? 'emoji' : 'star'}`],
        // 获取值
        getValue() {
            return ScroeNode.value;
        },
        // 设置值
        setValue(value) {
            // 以枚举的关系设置值，枚举永远不变
            if (type === 'emoji') {
                const currentNode = Radios.find((node) => node.value === value);
                currentNode?.setValue(true);
            } else {
                const currentNode = Radios.find((node) => node.value === value);
                currentNode?.setValue(true);
                extendsStar.changesStyle(currentNode.index);
            }
            ScroeNode.value = value;
        },
        clear() {
            Radios.forEach((Raido) => {
                Raido.setValue(false);
            });
        },
    });
    // star 独有函数处理
    const extendsStar = {
        changesStyle: (index) => {
            Radios.forEach((node, i) => {
                node.classList.remove('ischecked');
                if (i <= index) {
                    node.classList.add('ischecked');
                }
            });
        },
        onmouseenter() {
            const index = this.index;
            Radios.some((node, i) => {
                if (i > index) return true;
                node.classList.toggle('active');
                return false;
            });
        },
        onmouseleave() {
            const index = this.index;
            Radios.some((node, i) => {
                if (i > index) return true;
                node.classList.toggle('active');
                return false;
            });
        },
    };
    const Radios = molist.map((v, index) => {
        const [p, n, star] = [
            createTag('img', {
                src: `${baseUrl}/images/emoji/emoji${v}.png`,
                classNames: ['score-img', 'score-img-dark'], // 灰色星星
            }),
            createTag('img', {
                src: `${baseUrl}/images/emoji/emoji${v}+.png`,
                classNames: ['score-img', 'score-checked'], // 抖动星星
            }),
            createTag('img', {
                src: `${baseUrl}/images/emoji/emoji${v}+.png`,
                classNames: ['score-img', 'score-img-hover'], // 悬浮星星
            }),
        ];

        // 创建单选按钮
        let RadioImagesNode = type === 'emoji' ? [p, n] : [p, n, star];
        const Radio = createRadioNode({
            label: options[index]?.label || v,
            value: options[index]?.value || index,
            index, //当前索引值
            slot: createNodeFragment(...RadioImagesNode),
            classNames: [`${tagkey}-score-radio`, 'score-radio-label'],
            onchange: (value, label) => {
                ScroeNode.value = value;
                type === 'star' && extendsStar.changesStyle(index);
                onchange?.(value, label);
            },
            ...(type === 'star' ? extendsStar : {}),
        });
        Radio.classList.remove(`${tagkey}-radio-checkbox-label`);
        return Radio;
    });
    const RadioGroupNode = createTag('div', {
        classNames: ['score-group', `${tagkey}-mt-24`],
    }).$append(...Radios);
    const Title = createTitle(title || 'How satisfied are you with our product?');
    const { Satisify, Dissatisify } = uselanguage('Satisify', 'Dissatisify');
    const SatisifyNode = createText(Satisify);
    const DissatisifyNode = createText(Dissatisify);
    const footTextOrder =
        type === 'emoji' ? [SatisifyNode, DissatisifyNode] : [DissatisifyNode, SatisifyNode];
    const foot = createTag('div', {
        classNames: ['score-footer', `${tagkey}-flex-between`, `${tagkey}-mt-4`],
    }).$append(...footTextOrder);

    return ScroeNode.$append(Title, RadioGroupNode, foot);
};

// NPS图

export const createNps = (question, option) => {
    const {
        tagkey,
        questionOptionsKeys: { id },
    } = store;
    const {
        title,
        min_answer_num: min = 0,
        max_answer_num: max = 10,
        question_type: questionType = 'score_emoji',
    } = question || {};
    const { onchange } = option || {};
    const { hard, easy } = uselanguage('hard', 'easy');
    const Title = createTitle(title || '打分题');
    const uid = question[id] || radioUidMap.getUid();
    const NpsNode = createTag('div', {
        uid,
        question,
        questionType,
        classNames: [`${tagkey}-score-nps`, `${tagkey}-pt-8`],
        index: 0, // 选中子圆圈的索引值
        value: 0, // 选中的圆圈分数， 默认就等于index 索引值
        setValue(value) {
            NpsNode.value = value;
            data.lastPointerText = 0;
            pointerList.forEach((node, i) => {
                node.classList.remove('active');
                node.classList.remove('active-anim');
                if (i <= value) {
                    node.classList.add('active');
                }
            });
            NpsLine.style.width = (value * 100) / (max - min) + '%';
            // 操作文字出现
            pointerListText[data.lastPointerText].classList.remove('active');
            pointerListText[value].classList.add('active');
            data.lastPointerText = value;
            NpsNode.value = NpsNode.index = value;
        },
    });
    const NpsLine = createTag('div', { classNames: ['score-line'] });
    const HardNode = createText(hard);
    const EasyNode = createText(easy);

    const Footer = createTag('div', {
        classNames: ['score-footer', `${tagkey}-flex-between`, `${tagkey}-mt-4`],
    }).$append(HardNode, EasyNode);

    const data = {
        lastPointerText: 0,
    };

    const pointerList = Array(max - min + 1)
        .fill('')
        .map((_, index) =>
            createTag('div', {
                index,
                style: {
                    left: (index / (max - min)) * 100 + '%',
                },
                classNames: ['pointer'],
                onclick() {
                    if (index === NpsNode.value) return;
                    // 设置线轴显示
                    pointerList.forEach((node, i) => {
                        node.classList.remove('active');
                        node.classList.remove('active-anim');
                        if (i <= index) {
                            node.classList.add('active');
                        }
                    });
                    // 给当前点击的元素添加动画
                    this.classList.add('active-anim');
                    NpsLine.style.width = (index * 100) / (max - min) + '%';
                    // 操作文字出现
                    pointerListText[data.lastPointerText].classList.remove('active');
                    pointerListText[index].classList.add('active');
                    data.lastPointerText = index;
                    NpsNode.value = NpsNode.index = index;
                    onchange?.(index, this);
                },
            }),
        );
    // 创建文字
    const pointerListWrap = createTag('div', {
        classNames: ['pointer-list-wrap'],
    }).$append(...pointerList);
    const pointerListText = Array(max - min + 1)
        .fill('')
        .map((_, index) =>
            createTag('span', {
                index,
                style: {
                    left: (index / (max - min)) * 100 + '%',
                    top: '20px',
                },
                classNames: ['pointer-text'],
                textContent: index,
            }),
        );
    // 创建容器
    const pointerListTextWrap = createTag('div', {
        classNames: ['pointer-list-text-wrap'],
    }).$append(...pointerListText);

    // 创建容器
    const scoreWrapNode = createTag('div', { classNames: ['score-nps-content'] }).$append(
        NpsLine,
        pointerListWrap,
        pointerListTextWrap,
    );

    return NpsNode.$append(Title, scoreWrapNode, Footer);
};

export const createScore = (question, option) => {
    return (
        ['score_emoji', 'score'].includes(question?.question_type) ? createScoreMoji : createNps
    )(question, option);
};
