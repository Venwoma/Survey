import { $post } from '../base';

/**
 * @method 用户注册
 */
export function httpAuthRegister(params) {
    return $post(`/api/auth/register`, params);
}

/**
 * @method 用户登录
 */
export function httpAuthLogin(params) {
    return $post(`/api/auth/jwt/login`, params);
}
