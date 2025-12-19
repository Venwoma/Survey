import QRadio from './q-radio';
import QCheckbox from './q-checkbox';
import QTextarea from './q-textarea';
import { createScore } from './q-score';
import { CQuestionCard } from './c-question-card';
const createQuestionList = (questions, option) => {
    // 外部关心的函数 一个提交一个变化
    const { onchange, submit, close } = option || {};
    const size = questions.length;
    // 默认事件
    const defineChange = (value, key, data) => {
        onchange?.(value, key, data);
    };
    // 单选类操作的题目 需要延迟多久切换下一题
    const singleDelayTime = 300;
    const emojiDelayTine = 400;
    // 回退清空单选和表情
    /**
     *
     * @param {Object} valueData  当选list的选中值集合
     * @param {Object} currentCard  当选展示中的卡片对象
     */
    const backClearValue = (valueData, currentCard) => {
        const { uid, questionType } = currentCard;
        if (['single', 'score_emoji'].includes(questionType)) {
            valueData[uid] = '';
            currentCard.childNode.clear();
        }
    };

    // 需要聚焦的时候
    const focusTextareaTask = (currentCard) => {
        if (currentCard.questionType === 'blank') {
            currentCard.querySelector('textarea').focus();
        }
    };
    // 任务分发
    const nodeMap = {
        single: (question, index) => {
            return QRadio(question, {
                onchange(value) {
                    proxyData.value[question.gid] = [value];
                    if (index !== size - 1) {
                        setTimeout(() => {
                            proxyData.currentCard.$hide();
                            proxyData.next();
                            defineChange(question.gid, value, proxyData.value);
                        }, singleDelayTime);
                    } else {
                        typeof submit === 'function' && submit(proxyData);
                        console.log('已经结束');
                    }
                },
            });
        },
        multiple: (question) => {
            return QCheckbox(question, {
                onchange(value) {
                    proxyData.value[question.gid] = [value];
                    defineChange(proxyData.value[question.gid], question.gid, proxyData.value);
                },
            });
        },
        // 输入框
        blank: (question) => {
            const TextareaNode = QTextarea(question, {
                oninput() {
                    proxyData.value[question.gid] = TextareaNode.getValue();
                    defineChange(proxyData.value[question.gid], question.gid, proxyData.value);
                },
            });
            return TextareaNode;
        },
        // 星星
        score: (question) => {
            return createScore(question, {
                onchange(value) {
                    proxyData.value[question.gid] = value;
                    defineChange(proxyData.value[question.gid], question.gid, proxyData.value);
                },
            });
        },
        // 表情
        score_emoji: (question) => {
            return createScore(question, {
                onchange(value) {
                    proxyData.value[question.gid] = value;
                    setTimeout(() => {
                        proxyData.currentCard.$hide();
                        proxyData.next();
                        defineChange(proxyData.value[question.gid], question.gid, proxyData.value);
                    }, emojiDelayTine);
                },
            });
        },
        // NPS 题
        nps: (question) => {
            return createScore(question, {
                onchange(value) {
                    proxyData.value[question.gid] = value;
                    defineChange(proxyData.value[question.gid], question.gid, proxyData.value);
                },
            });
        },
    };
    // 创建题型
    const QuestionNodeList = questions
        .map((v, index) => {
            const node = nodeMap?.[v.question_type]?.(v, index) || '';
            if (index !== 0) nodeMap;
            return node;
        })
        .filter(Boolean);

    // 创建数据中心
    const proxyData = Object.create({
        value: {}, // 数据存储中心
        index: -1, // 当前索引
        currentCard: {}, // 当前卡片
        CardNodeList: [], //数组
        next(i) {
            this.index++;
            const index = i || this.index;
            if (index <= size - 1) {
                if (!this.CardNodeList[index]) {
                    const question = QuestionNodeList[index];
                    // 创建卡片弹窗
                    const CardNode = CQuestionCard(question, {
                        index: index + 1,
                        total: size,
                        classNames: ['question-list-' + index],
                        question,
                        questionType: question.questionType,
                        uid: question.uid,
                        close() {
                            CardNode.$close();
                            typeof close === 'function' && close(proxyData);
                        },
                        nextClick() {
                            CardNode.$hide();
                            if (index + 1 !== size) {
                                proxyData.next();
                            } else {
                                typeof submit === 'function' && submit(proxyData);
                            }
                            return this;
                        },
                        backClick() {
                            CardNode.$hide();
                            proxyData.pre();
                        },
                    }).$append();
                    this.currentCard = CardNode;
                    this.CardNodeList.push(CardNode);
                } else {
                    this.CardNodeList[index].$show();
                    this.currentCard = this.CardNodeList[index];
                }

                focusTextareaTask(this.currentCard);
            } else {
                typeof submit === 'function' && submit(proxyData);
            }
            return proxyData;
        },
        pre() {
            this.index--;
            const index = this.index;
            if (index >= 0 && index <= size - 1) {
                this.CardNodeList[index].$show();
                this.currentCard = this.CardNodeList[index];
                backClearValue(this.value, this.currentCard);
                focusTextareaTask(this.currentCard);
            }
            return proxyData;
        },
        close() {
            this.CardNodeList.forEach((v) => v.$close());
        },
    });
    return proxyData;
};

export default createQuestionList;
