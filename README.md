# 前言

taro 小程序脚手架

内置自定义导航、自定义 tabbar

# 技术栈

Taro + dva + scss

Taro 是一套遵循 React 语法规范的 多端开发 解决方案。

使用 Taro，我们可以只书写一套代码，再通过 Taro 的编译工具，
将源代码分别编译出可以在不同端（微信/百度/支付宝/字节跳动小程序、H5、React-Native 等）运行的代码。

Taro 的语法规则基于 React 规范，它采用与 React 一致的组件化思想，组件生命周期与 React 保持一致，
同时在书写体验上也尽量与 React 类似，支持使用 JSX 语法，让代码具有更丰富的表现力。

# 项目运行

```
# 全局安装taro脚手架
yarn global add @tarojs/cli

# 安装项目依赖
yarn -i

# 启动项目
yarn dev || yarn start

```

# 注意事项

##### 1. dva model 需要在全局 models 中引入，否则无法使用：

```
   import home from '../pages/home/model';

   export default [home];
```

##### 2. iconfont 使用方法：注册 阿里 iconfont 账号，找管理员加入项目。

仅可在路由注册的页面中使用，引入的子组件无法使用。页面中引入方式：

```
   <View className='iconX'>&#xe645;</View>
```

##### 3. 推荐使用 prettier 格式化代码，已配置全局命令：

```
   yarn prettier || npm run prettier
```

##### 4. 推荐使用 css modules，scss 文件命名为 index.modules.scss:

```
   import styles from './index.modules.scss';
   <View className={styles.homeWrap}>
```

##### 5. 推荐使用 sass 变量，全局变量文件路径 ‘\*\*/styles/mixin.scss’：

引入方式： scss 文件中 import

```
   @import '@/src/styles/mixin';
```

##### 6. 可以使用命令自动生成页面模板，用处不大，仅做娱乐使用:

```
   yarn template 'fileName'
```

# 业务介绍

目录结构

    ├── config                 // Taro 配置目录
    │   ├── dev.js                 // 开发配置
    │   ├── index.js               // 默认配置
    │   └── prod.js                // 生产配置
    │   └── test.js                // 测试配置
    │   └── uat.js                // 预生产配置
    ├── dist                   // 微信小程序编译结果目录
    ├── src                    // 源码目录
    │   ├── assets             // 静态文件
    │   ├── components             // 自定义组件
    │   ├── models                 // 全局 dva model
    │   ├── pages                  // 页面文件目录
    │   │   └── index
    │   │       ├── index.js           // 页面逻辑
    │   │       ├── index.scss         // 页面样式
    │   │       ├── model.js           // 组件 dva model
    │   │       ├── service.js         // 接口
    │   ├── styles
    │   │      ├── iconfont.scss       // 阿里 iconfont 图标
    │   │      ├── mixin.scss     // sass 样式变量
    │   ├── utils
    │   │       ├── dva.js           // dva 配置
    │   │       ├── getSystemInfo.js    // 获取系统信息，自定义导航数据
    │   │       ├── request.js         // ajax
    │   │       ├── util.js           // 常用工具类
    │   │       ├── wxApi.js         // 微信接口
    │   ├── webview             // webview
    │   ├── app.js             // 入口文件
    │   └── index.html
    └── .eslintrc                // eslint 配置
    └── .gitignore                // git 忽略目录、文件
    └── .prettierrc                // prettier 配置
    └── package.json            // 项目依赖
    └── package.config.json            // 项目配置
