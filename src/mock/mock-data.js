export default {
    'POST /api/auth/jwt/login': {
        'code|1': [200, 403, 502],
        message: function () {
            return this.code === 200 ? 'Login successful' : this.code === 403 ? 'Login error' : 'server is error';
        },
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
};
