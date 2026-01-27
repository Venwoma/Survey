import axios from 'axios';
import fetchMock from '../mock';
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

const proxyApi = (type, url, ...params) => {
    if (window.mock || import.meta.env.DEV) {
        return fetchMock(type, url);
    }
    return instance[type](url, ...params);
};
const $get = (url, params, option) => proxyApi('get', url, { params, ...option });

const $post = (url, data, option) => proxyApi('post', url, data, option);
const $postDown = (url, data, option) => $post(url, data, { responseType: 'blob', ...option });

export { instance, $get, $post, $postDown };
