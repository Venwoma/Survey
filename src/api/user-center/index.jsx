import { $post } from '../base';

/**
 * @method 获取账户信息
 */

export function httpAccount(params) {
    return $post('/api/user-center/account', params);
}
