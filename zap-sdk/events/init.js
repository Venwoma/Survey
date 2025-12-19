import watch from '../plugin/watcher.js';
import store from '../store/index.js';
import { getInit } from '../api/api.js';
import mouseMove from './mousemove.js';
import click from './click.js';
import scroll from './scroll.js';
import pageState, { reloadPageState } from './page-state.js';
import runtime from '../plugin/runtime.js';
import { collectDataMap } from '../store/collect-data.js';
import { getPerformanceMemory } from '../plugin/dev-test.js';
import { testSendAction, Message, createQuestionList } from '../zap-ui/index.js';
const loadAction = function (e) {
    if (store.loaded) return;
    store.runState.loadAction = true;
    // runStart();
    return getInit()
        .then((res) => {
            if (res.data.autoInit) {
                // pageState();
                store.loaded = true;
                const questions = [
                    {
                        gid: 24,
                        title: '您在浏览商品列表时遇到的最大困难是？',
                        question_type: 'multiple',
                        options: [
                            {
                                gid: 24,
                                title: '商家/商品太多，难以比较',
                            },
                            {
                                gid: 25,
                                title: '产品信息分散，查找困难',
                            },
                            {
                                gid: 26,
                                title: '相似产品价格差异大，不好选择',
                            },
                        ],
                    },
                    {
                        gid: 28,
                        title: '您是否找到了符合您需求的商品？',
                        question_type: 'single',
                        options: [
                            {
                                gid: 1,
                                title: '有',
                            },
                            {
                                gid: 2,
                                title: '没有',
                            },
                        ],
                    },
                    {
                        gid: 29,
                        question_type: 'blank',
                        title: ' 填空题',
                    },
                    {
                        gid: 41,
                        title: '星星',
                        min_answer_num: 1,
                        max_answer_num: 5,
                        question_type: 'score',
                    },
                    {
                        gid: 41,
                        title: '表情',
                        min_answer_num: 1,
                        max_answer_num: 5,
                        question_type: 'score_emoji', // 后端自定义一个新题目
                    },
                    {
                        gid: 51,
                        title: '您向朋友或同事推荐我们的可能性有多大？',
                        max_answer_num: 10,
                        min_answer_num: 0,
                        question_type: 'nps',
                    },
                ];

                // testSendAction({ data: { process_result: { questions } } });
                const Q = createQuestionList(questions, {
                    onchange(value, key, data) {
                        console.log('change', data);
                    },
                    close() {
                        console.log('关闭信息');
                    },
                    submit() {
                        console.log('提交信息');
                    },
                }).next();
            }
        })
        .catch((e) => {
            Message('wenjuanSDK 挂在失败');
            console.log(e);
        });
};

const checkoutPageLoad = () => {
    console.warn('checkoutPageLoad is trigger');
    setTimeout(() => {
        if (!store.loaded) {
            store.loaded = true;
            runStart();
            reloadPageState();
        }
    }, 2000);
};
const runStart = () => {
    if (store.loaded) {
        mouseMove();
        click();
        scroll();
        store.isOpenLoop && runtime();
        if (store.isTest) console.log(getPerformanceMemory(), '监听完成');
    } else {
        console.log('---loopRun---');
        setTimeout(runStart, 1000);
    }
};

const eventsInit = () => {
    const { pageState } = collectDataMap;
    pageState.pageHoldTime.startTime = Date.now();
    watch.watch('load', loadAction);
    checkoutPageLoad();
};

export default eventsInit;
