import { testSendAction } from '../zap-ui/index';
const config = {
    version: '0.1.3',
    isHtmlBase64: false,
    removeHtmlTags: ['script', 'link', 'style', 'img', 'svg'], // 需要移除的html 标签内容
    preFix: 'wj-sdk',
    loaded: false, // 是不是加载完成
    eventType: 'eventType', // 通用事件名称字段
    isTest: true, // 测试
    isOpenLoop: false, //设置是不是执行循环计算鼠标数据
    runtiming: 3000, // 循环响应接口时间间隔
    runtimor: null, // runtiming 计时器对象，
    http: {
        target: 'https://t3.wenjuan.com/internal/cantor/api/overseas/chat/', // 发送地址
        intercaptor: {
            response: (res) => {
                // testSendAction(res);
            },
            request: null,
        },
    }, // 外部使用的API 定义
    scrollThrottleTime: 1500,
    overTime: 2, // 需要收集悬浮多久DOM 默认以S 秒为单位
    pageInfo: {},
    // 动态变化参数配置<会在代码中切换开关>
    runState: {
        hasOnParamsObserver: true, // 开启区间参数
        hasOnProductListObserver: false,
        pageShowAction: false, // 页面展示
        pageToggleAction: false, // 执行了切换监听
        loadAction: true, // 是不是load加载成功
    },
    // api中定义的选择器名称
    apiProps: {
        searchSelector: 'list_search_selector', // 小搜索框
        productorWrap: 'list_container', // 产品区最外层容器
        productorSelector: 'list_item_selector', // 产品容器
        globalSearchSelector: 'global_search_selector', // 搜索框ID
        productParamsSelector: 'product_params_selector',
    },
    // 这是接口中apiProps参数名称
    apiPropsValue: {
        searchSelector: '',
        productorWrap: '',
        productorSelector: '',
        productParamsSelector: '',
        globalSearchSelector: '',
    },
    plugins: {}, // 使用的第三方插件库
    // 开关集合
    includesMudolues: {
        mousemove: true,
        mousehover: true,
        scroll: true,
        scrollend: true,
        click: true,
        pageToggle: true,
        unhandledrejection: true,
        error: true,
    },
};

export default config;
