import Mock from 'mockjs';
import mockData from './mock-data';
import { useFastExtend } from '@kyol/usejs';
useFastExtend();
const fetchMock = (type, url) => {
    return new Promise((resolve, reject) => {
        const time = Mock.Random.integer(4, 20) * 100;
        const template = Object.find(mockData, (value, key) => {
            const [, path] = key.split(' ');

            return path === url;
        });
        let tem = {
            code: 200,
            message: 'successful',
        };
        if (!template) {
            tem = {
                code: 502,
                message: 'server is error',
            };
        } else if (template && !template.key.startsWith(type.toUpperCase())) {
            tem = {
                code: 403,
                message: 'access method is error',
            };
        }
        const key = `${type.toUpperCase()} ${url}`;
        const _data = { ...mockData[key] };
        if (Object.find(_data, (value, key) => key.startsWith('code|'))) {
            tem = {};
        }
        const data =
            Mock.mock({
                ...tem,
                ...mockData[key],
            }) || {};
        setTimeout(() => {
            cls(`响应时间：`, time);
            if (data?.code === 200) resolve(data);
            reject(data);
        }, time);
    });
};
export default fetchMock;
