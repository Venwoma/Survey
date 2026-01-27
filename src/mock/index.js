import Mock from 'mockjs';
import mockData from './mock-data';

const fetchMock = (type, url) => {
    return new Promise((resolve, reject) => {
        const time = Mock.Random.integer(4, 20) * 100;
        const key = `${type.toUpperCase()} ${url}`;
        const data = Mock.mock(mockData[key]) || {};
        setTimeout(() => {
            cls(`响应时间：`, time);
            if (data?.code === 200) resolve(data);
            reject(data);
        }, time);
    });
};
export default fetchMock;
