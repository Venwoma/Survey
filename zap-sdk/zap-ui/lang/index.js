import { store } from '../store';
export const baseLang = {
    buttonBack: {
        'zh-CN': '回退',
        'en-US': 'Back',
    },
    buttonNext: {
        'zh-CN': '下一步',
        'en-US': 'next',
    },
    submit: {
        'zh-CN': '提交问卷',
        'en-US': 'submit',
    },
    Satisify: {
        'zh-CN': 'Very Satisify',
        'en-US': 'Very Satisify',
    },
    Dissatisify: {
        'zh-CN': 'Very Dissatisify',
        'en-US': 'Very Dissatisify',
    },
    hard: {
        'zh-CN': '非常困难',
        'en-US': 'Very hard',
    },
    easy: {
        'zh-CN': '非常容易',
        'en-US': 'Very easy',
    },
};

export const uselanguage = (...key) => {
    const lang = store.language;
    return key.reduce((p, k) => Object.assign(p, { [k]: baseLang[k]?.[lang] }), {});
};
