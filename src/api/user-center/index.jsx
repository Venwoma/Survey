import { $post } from '../base';

/**
 * @method 获取账户信息
 */

export function httpAccount(params) {
    return $post('/api/user-center/account', params);
}

/**
 * @method 获取项目信息
 */

export function httpProject(params) {
    return $post('/api/user-center/project', params);
}
