import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { getType } from "@/utils/tools.jsx";

/**
 * @description 数据中心函数,针对 react的复杂函数操作简化封装函数
 * @param {Function | AsyncFunction} curryFunction
 * @returns Function<Object>
 *
 */
export const createStore = (curryFunction) => {
  try {
    let data = {};
    if (typeof curryFunction === "function") {
      data = curryFunction() || {};
    } else if (getType(curryFunction) === "object") {
      data = curryFunction;
    } else {
      throw new Error("参数不是函数或者对象");
    }
    const task = (setFunc, state, errorMessage) => {
      if (typeof setFunc === "function") {
        const data = setFunc(state);
        if (getType(data) === "object") return data;
      } else if (getType(setFunc) === "object") {
        return setFunc;
      } else {
        throw new Error({ error: errorMessage });
      }
    };
    const store = create(
      immer((set, get) => ({
        ...data,
        setSync: async (setFunc) => {
          if (typeof setFunc !== "function") {
            throw new Error("setSync的参数必须是函数"); // ✅ 直接抛字符串
          }
          const resData = await setFunc(get());
          set((state) => {
            const data = task(
              resData,
              state,
              "createStore的参数必须是函数或者对象"
            );
            if (data) return data;
          });
        },
        set: (setFunc) => {
          set((state) => {
            const data = task(
              setFunc,
              state,
              "createStore的参数必须是函数或者对象"
            );
            if (data) return data;
          });
        },
      }))
    );
    store.useState = (fc) => [
      fc ? store((state) => fc?.(state)) : store(),
      store((state) => state.set),
    ];
    store.useSet = () => store((state) => state.set);
    return store;
  } catch (e) {
    throw new Error(e, "createStore is error");
  }
};
/**
 ## 一些特殊数据需要自己从新定义一个新的文件

    --store
    |   |
    |   -member.jsx

// member.jsx
const state = {
    name: 'kyol-luowei',
    age: 10,
};
export const xxxStore = createStroe(() => state);

// xxxx.jsx
const name = xxxStore((state) => state.name);

// 修改内部属性
const set = store.useSet();
set((state) => ({ height: '180cm' }));
set((state) => (state.height = '180cm'));
=> state = {    name: 'kyol-luowei', age: 10,height:'180cm'}
 */
