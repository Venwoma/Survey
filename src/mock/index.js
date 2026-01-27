import Mock from 'mockjs';
import { useFastExtend } from '@kyol/usejs';
useFastExtend();
import mockData from './mock-data';
Mock.setup({
    timeout: 4000,
});
const fetchMock = (type, url) => {
    const key = `${type.toUpperCase()} ${url}`;
    const data = Mock.mock(mockData[key]) || {};
    if (data?.code === 200) return Promise.resolve(data);
    return Promise.reject(data);
};

export default fetchMock;
