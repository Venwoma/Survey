export default {
    'POST /api/auth/jwt/login': {
        code: 200,
        message: 'Login successful',
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
