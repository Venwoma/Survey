import axios from 'axios';

const instance = axios.create({
    baseURL: '/',
    timeout: 5000,
});

/**
 * @param config {Object}
 *
 */
instance.interceptors.request.use((config) => {
    if (import.meta.env.DEV) {
        config.url = `/proxy${config.url}`;
    }
    return config;
});

/**
 * @description  响应拦截器
 */
instance.interceptors.response.use((res) => {
    return res;
});

const $get = (url, params, option) => instance.get(url, { params, ...option });

const $post = (url, data, option) => {
    return instance.post(url, data, option);
};
const $postDown = (url, data, option) => $post(url, data, { responseType: 'blob', ...option });

export { instance, $get, $post, $postDown };
