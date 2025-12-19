import { createStore } from "./hooks";
/**
 *  系统通用数据存储
 *
 */
export const commonStore = createStore(() => ({
  isLogin: false,
  userInfo: {},
  showAdminLeft: true,
  messageApi: {},
  test: { a: { b: { c: 200 } } },
}));
