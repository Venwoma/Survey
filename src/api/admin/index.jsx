import { $post } from '../base';

/**
 * @method 获取问卷列表
 */

export function httpAdminList(params) {
    return $post('/api/admin/list', params);
}
