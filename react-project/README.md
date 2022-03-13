# 环境搭建

- 特别注意：电脑上node版本必须在v14+
- 使用create-react-app创建react项目
```
cnpm i create-react-app -g
create-react-app -V  
cnpm i yarn -g

yarn create react-app react-project

cd react-project
npm start
```
- create-react-app这个脚手架默认隐藏了webpack的配置，但实际工作中我们经常需要用到webpack配置，所以我们通常要想办法把webpack配置给暴露出来。
- 当你在执行`npm run eject`时，如果报错，说明你已经修改过代码了。为了保证代码不丢失，所以这个执行暴露的操作，是失败的。该怎么办呢？
```
git init
git add --all
git commit -m '准备执行暴露操作'
npm run eject
执行暴露操作成功了，文件目录结构已经发生了变化
但是命令行卡住了，这说明正在从外网安装很多第三方包
怎么办？ctrl+C 结束掉这个命令，同时删掉node_modules包
然后用淘宝镜像重新安装依赖包！
cnpm i
npm start
```

- 当我们`npm run eject`后，环境中webpack就暴露出来了，经常我们还需要做一些额外配置，让环境更加符合我们的开发体验（主要研究scripts目录和config目录）。
- 改端口号：DEFAULT_PORT
- 每次启动项目不打开浏览器：openBrowser(urls.localUrlForBrowser)
- 修改入口文件为main：appIndexJs: resolveModule(resolveApp, 'src/main')
- 添加'@'绝对路径：resolve.alias
- 当前环境已经集成了sass-loader：要想让当前环境支持sass，我们还需要安装sass这个编译器。
- 研究config/webpackDevServer.config.js文件，你大约应该是可以搞明白如何配置代理。


# 使用ant-design这个组件库

- cnpm i antd -S
- 在index.html中使用CDN加速器导入antd.css样式文件(在文档找链接)
- cnpm i @ant-design/icons -S

# redux

- 传统架构：redux、react-redux、redux-thunk / redux-saga
- 新型架构：@reduxjs/toolkit、react-redux
- 注意：我们只讲解传统架构。

- redux 用于定义redux数据容器。
- react-redux 基于上下文、高阶组件、Hooks的，用于连接redux数据容器和react组件树
- redux-thunk/redux-saga 这是redux常用插件，用于解决redux异步数据流的，二选一即可。
```
cnpm i redux -S
cnpm i react-redux -S
```
