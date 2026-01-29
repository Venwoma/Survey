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
    'POST /api/admin/list': {
        data: {
            'list|10': [
                {
                    'Survey Title': '@id',
                    category: '@name',
                    'trrigers|0-10000': 10000,
                    'Last responsed|1': ['-', 0, 1, 2, 3, 4],
                    'Status|1': ['Status', 'Draft', 'Active'],
                },
            ],
        },
    },
};
