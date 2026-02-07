import Password from 'antd/es/input/Password';
import Mock from 'mockjs';

Mock.Random.extend({
    comEmail: function () {
        // 生成随机用户名 + @ + 随机域名 + .com
        const username = this.string('lower', 5, 10); // 5-10位小写字母用户名
        const domain = this.string('lower', 3, 6); // 3-6位小写字母域名
        return `${username}@${domain}.com`;
    },
});

const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    const length = Mock.Random.integer(8, 16); // 随机8-16位长度
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Mock.Random.integer(0, chars.length - 1));
    }
    return password;
};

export default {
    // 随机测试接口
    'GET /api/random': {
        'code|1': [200, 430, 502],
        data: {
            id: '@id',
            title: '@ctitle',
            name: '@name',
            title: '@title',
            email: '@email',
            address: Mock.Random.region(),
        },
    },
    'POST /api/auth/jwt/login': {
        data: {
            token: 'mock_jwt_token_123456789',
            user: {
                id: '@id',
                name: '@name',
                email: '@email',
                role: 'admin',
            },
            expires_in: 3600,
        },
    },
    'POST /api/auth/register': {
        code: 200,
        data: {
            token: 'mock_register_token_987654321',
            user: {
                id: '@id',
                name: '@name',
                email: '@email',
                role: 'user',
            },
            expires_in: 7200,
        },
        message: 'Register success',
    },
    'POST /api/admin/list': {
        data: {
            'list|10': [
                {
                    title: '@id',
                    date: function () {
                        const type = Mock.Random.pick(['minutes', 'hours']);
                        const value = Mock.Random.integer(1, type === 'minutes' ? 59 : 24);

                        return `${value} ${type} ago`;
                    },
                    category: '@name',
                    'triggers|0-10000': 10000,
                    responses: function () {
                        return Mock.Random.integer(0, this.triggers);
                    },
                    lastResponse: function () {
                        if (this.responses === 0) return '-';

                        const type = Mock.Random.pick(['minutes', 'hours']);
                        const value = Mock.Random.integer(1, type === 'minutes' ? 59 : 24);
                        return `${value} ${type} ago`;
                    },
                    'status|1': ['Paused', 'Draft', 'Active'],
                },
            ],
        },
    },
    'POST /api/user-center/account': {
        data: {
            account: {
                username: '@name',
                email: '@comEmail',
                password: generatePassword(),
            },
        },
    },
    'POST /api/user-center/project': {
        data: {
            project: {
                name: `Project_${Mock.Random.integer(1000, 999999)}`,
                url: Mock.Random.url(),
            },
        },
    },
};
