import Mock from 'mockjs';
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
                    'status|1': ['Status', 'Draft', 'Active'],
                },
            ],
        },
    },
};
