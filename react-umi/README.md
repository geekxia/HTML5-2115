# 阿里生态

- dva：react-router-dom + redux + redux-saga
- umi：非常重要的，你一定要会用。
- ant-design-pro：是基于umi的一个开源项目，还提供一个套好用的组件库。
- ant-design / ant-design-mobile / @ant-design/icons（组件库）
- ahooks
- ant-design-charts / bizcharts
- 微服务架构 qiankun

# Umi项目

- umi项目创建，参考umi文档。
- umi是基于配置的，有很功能都是配置出来。除了编写业务逻辑外，其它的功能几乎都配置出来的。
- .umirc.ts 这是umi脚手架的其中一种配置方式，还可以使用config目录来配置（在and-design-pro中可以看到config配置方式）。
- .umirc.ts 这个配置文件是支持热更新的，你添加配置成功，浏览器中的代码会自动更新，无须重启。
- umi项目，是基于插件的。umi背后有很多umi插件，比如: @umijs/* 。不同的umi插件有不同的功能。
- umi内置了路由功能，有两种路由模式，一种约定式路由，一种配置式路由。
- umi内置了dva（redux、redux-saga），umi中默认就是支持redux状态管理。


# TS环境

- tsconfig.json 是TS的配置文件，配置选项非常多。
- XXX.d.ts 这是TS的声明文件，用于指定环境中TS模块和变量的声明。
- @types/XXX，这些包，是第三方提供的声明文件。
- .ts 是文件后缀，TS环境只会检测.ts/.tsx这种文件，对.js/.jsx文件不起使用。如果你要写TS代码，请把文件命名成.ts/.tsx文件。

- TS是微软发布的JavaScript超集，与脸书的Flow竞争的。Vue2是用Flow语言编写的，Vue3是用TS编写的。Vue3的兴趣，也带动了TS在国内的兴趣。（2020年底）
- TS语法范围 > JavaScript语法范围。TS中有很语法，在ES6+中开始逐步实现了。
- 学TS学什么呢？学习TS类型、学习TS面向对象编程。对咱们来讲，只用学TS类型，在Vue/React开发环境中主要使用的是TS类型校验。
- TS类型：字符串、数值类型、布尔类型、数组类型、对象类型、void类型、never类型、元组、枚举等。
- 提示：为了更好地编写TS代码，建议使用VsCode编辑器。VsCode和TS都是微软这家公司的产品，VsCode已经内置了TS检测插件，对TS有着更加友好的支持。
- TS入门笔记：https://zhuanlan.zhihu.com/p/377754481
