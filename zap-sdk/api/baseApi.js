// 获取后端数据接口
const kyolHttp = (baseOptions) => {
    const baseConf = {}; // 初始化定义一些基础参数
    // 实例化一个对象
    /**
     *
     * @param {object<{data?,params?:object,isdev:Boolean,method:string,url!:string}>} options
     * @returns
     */
    const intstancer = (options) => {
        // 转化数据
        const config = JSON.parse(JSON.stringify({ ...baseConf, ...baseOptions, ...options }));
        if (intstancer.$useRequest) intstancer.$useRequest(config);
        const { data, params, headers, ...surplus } = config;
        const dataConf = { ...surplus };
        dataConf.method = (dataConf.method || 'GET')?.toUpperCase();
        if (dataConf.method === 'POST' && data) {
            dataConf.body = JSON.stringify(data);
        } else if (dataConf.method === 'GET') {
            dataConf.url = dataConf.url + (params ? `?${new URLSearchParams(params).toString()}` : '');
        }
        dataConf.headers = {
            'Content-Type': 'application/json',
            ...headers,
        };
        const { isdev, url, reponseType, ...finallySurplus } = dataConf;
        if (isdev) {
            return Promise.resolve(config).then((config) => intstancer.$useResponse(config));
        } else {
            return fetch(url, {
                ...finallySurplus,
            })
                .then((res) => res[reponseType || 'json']?.())
                .then((res) => intstancer.$useResponse(res));
        }
    };
    intstancer.get = (url, { params, ...config }) => intstancer({ url, params, ...config });

    intstancer.post = (url, body, config) => intstancer({ method: 'post', url, body, ...config });
    // 全局拦截器
    kyolHttp.$useRequest = null;
    kyolHttp.$useResponse = null;
    Object.assign(kyolHttp, {
        default: {
            base: '',
            url: '',
            headers: {},
        },
        interceptors: {
            request: {
                use(useRequest) {
                    if (typeof useRequest === 'function') kyolHttp.$useRequest = useRequest;
                },
            },
            response: {
                use(useResponse) {
                    if (typeof useResponse === 'function') kyolHttp.$useResponse = useResponse;
                },
            },
        },
    });

    // 定义拦截器
    intstancer.$useRequest = kyolHttp.$useRequest;
    intstancer.$useResponse = kyolHttp.$useResponse;

    // 实例化拦截器函数
    intstancer.interceptors = {
        request: {
            use(useRequest) {
                if (typeof useRequest === 'function') intstancer.$useRequest = useRequest;
            },
        },
        response: {
            use(useResponse) {
                if (typeof useResponse === 'function') intstancer.$useResponse = useResponse;
            },
        },
    };
    // 返回一个初始化项目
    return intstancer;
};

export default kyolHttp;
