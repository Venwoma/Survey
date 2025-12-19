# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 项目启动说明

- node > 18 以上

- react 18+ react-router v7 版本

- 项目有 zap-crm、zap-sdk、zap-ui 三个功能

- npm run dev 启动 crm 系统

- npm run dev:sdk 单独运行 SDK 开发环境

- sass@1.89.2, react@19.x, react-router-dom@7.x,

-

## 目录结构

- |-assets
  |-enter
  | |-client
  | |-server
  |-pages<页面>
  |-routes<暂定路由>
  |-store<数据中心>
  |-utils(工具)
  |-store(数据中心)

## 路由规则

- 页面路由全部在 pages 文件夹下,路径和路由具备映射关系

- 路由文件以小写破折号断文,主要用来区别路由地址与文件多单词的匹配 firstName-secondName.jsx | firstName-secondName

- 容器映射页面组件意义 className="page-" 开头

```jsx
export defalut function YourComponentName (){
  return <any className="page-">

  <any>
}
```

## 组件规则

- 遵守 react 的标准大写字母开头的驼峰式命名,
- 最外层容器遵守映射组件名

```jsx

export defalut function YourComponentName (){
  return <any className="your-component-name anySubName">

  <any>
}

// 或者
const YourComponentName = () =>{

}
export defalut YourComponentName;
```

## 函数

- 以小写开头驼峰式明明

## CSS

- 以小写破折号命名

## 数据管理

- 不建议采用 redux 毕竟第一眼看,他就是一坨屎一样的沉重

- 采用轻量库二次封装后简洁使用

## 观察者模式

- 尽量遵守 观察者认证 模式 方便排查来源
