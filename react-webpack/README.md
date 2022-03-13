# React导学

- 如果你想把vue3.0学好，必须会React。

- 【react学习路径】
  - Webpack自搭建开发环境：一则学习webpack、二则学习React基础。
  - create-react-app脚手架：redux状态管理、antd组件库、Hooks编程、开发经验（项目实战）
  - 阿里系React栈：dva、umi、ant-design-pro、and-design-charts。。。。

- 【react学习方法】
  - 翻文档（把react领域中的文档，至少翻5遍以上）
  - 翻代码（多找开源代码、看代码，欣赏或批判别人的代码）

- 少看视频（多记笔记、多总结、多翻老师的代码）
- 面向文档开发（少百度）

- 【react就业情况】
  - 成为react开发者：js基本功扎实、ES6语法熟练、webpack架构、react基础、TypeScript、Hooks编程、SPA路由、状态管理、阿里系开源项目（antd、umi）
  - 薪资：普遍偏高一些。

# 环境说明

- node 最好在 v14+
- npm 最好在 v6+
- cnpm 淘宝镜像：https://www.npmjs.com/package/cnpm
```
npm install cnpm -g --registry=https://registry.npmmirror.com
```

# Webpack(以v5为例)

- 为什么要学习webpack？它是目前前端领域最重要的工程化工具。（前端工程化）
- 什么是webpack？它是一个打包器，用于把各种模块进行编译打包，转化成浏览器能够普遍兼容的静态资源代码。

- webpack，这个包是核心包，它提供了很多API和插件
- webpack-cli，这个包暴露出一系列好用的webpack命令行。
```
cnpm i webpack -g
cnpm i webpack-cli -g
cnpm i webpack -D
cnpm i webpack-cli -D
查看webpack命令行的帮助文档：
webpack -h  
查看webpack的版本：
webpack -v
```

- webpack是构建工具，运行在node环境中。所以我们要编写webpack的配置文件(webpack.config.js)，再在node环境运行。
- 结论：我们使用webpack，本质上就是在编写webpack配置文件；什么样的配置，就有什么样的功能。

- 如果理解webpack？这里做一个简单的类比：你可以把webpack理解成是一个榨汁机，我们向webpack中丢入原材料，经过编译打包，得到可口的饮料。

- 打包（一般项目上线或上测试时，打包）
```
webpack --config webpack.config.js
```

- 本地服务构建（需求开发的过程）
```
cnpm i webpack-dev-server -g
cnpm i webpack-dev-server -D
```
- `webpack serve`可以运行本地服务，默认本地服务目录是public。
- 需求：我们运行本地服务时，要把src/main.js和public/index.html关联起来，我们推荐使用 html-webpack-plugin 来实现。

- 作业：继续翻阅webpack文档。

- webpack有两大功能：用于项目打包(build)，还用于本地开发(serve)。
- 问题：把build和serve都交叉在一起，代码难维护，其次两个环境有很多不同配置需要分开。
- 方案：我们要把build和serve环境，彻底分开，以便于对不同环境采用不同的配置。
  - 在webpack(v4)中，我们通常使用`cross-env`这个包来区分环境。
  - 在webpack(v5)中，我们`--env`这个webpack命令选项来区分环境。
- 无论你使用cross-env还是`--env`来区分环境，我们都可以方便地把两个环境的配置分开。鉴于webpack的配置是非常复杂，这里不建议我们手动合并配置文件，而是建议使用webpack-merge这个包来完成配置合并。
```
cnpm i webpack-merge -D
```

- 什么是loaders？在webpack中，使用loaders可对各种模块文件进行加载编译，最终转化成浏览器能够识别的代码。loaders是webpack的核心。
  - vue-loader，可以加载并编译.vue文件。
  - sass-loader，可以处理.scss文件。
  - babel-loader，可以处理ES6语法，将其转化成ES5代码。

- 在代码中处理.css文件，需要安装css-loader、style-loader。
  - css-loader，用于加载处理.css文件，它返回css代码。
  - style-loader，用于把css代码插入head标签中去。
- 在代码中处理.scss文件，需要安装sass、sass-loader、css-loader、style-loader。
  - sass-loader，用于加载处理.scss文件。
  - sass，是sass编译器，用于把sass代码转化css代码。
  - 思考：在vue脚手架中，你们安装过sass吗？

# Babel

- 什么Babel？有什么用？（https://www.babeljs.cn/docs/）
- 如何学习Babel：如何使用预设？如何使用插件？
  - @babel/core  这是Babel编译器的核心包（一定要安装的）
  - @babel/preset-env 这是一个预设，用于对大多数的ES6语法进行编译，转换成ES5
  - @babel/preset-react  这是一个预设，用于把JSX语法编译成ES5代码
  - @babel/preset-typescript 这也是一个预设，用于把TS语法转化成ES5
- Babel插件非常非常多，用于对一些小语法进行专门的编译，你可把插件理解成是预设的“补丁”。
- 常识：最新的Babel编译是v7版本，所有的Babel包(含插件在内)都是以“@babel/*”开头。

- 如何使用Babel？
  - 在webpack中，配置处理js文件的loaders规则（要安装babel-loader）。
  - 在项目根目录中，添加一个名为babel.config.js的Babel配置文件。
```
cnpm i babel-loader -D
cnpm i @babel/core -D
cnpm i @babel/preset-env -D
cnpm i @babel/preset-react -D
cnpm i @babel/plugin-proposal-decorators -D
cnpm i @babel/plugin-proposal-class-properties -D
```
- 这些“@babel”开头的预设和插件，都要在babel.config.js中进行配置，否则不起作用。


# ESLint

- 作用：约束大家写代码的规范（这个“规范”指的是代码风格不良，而不是语法错误）。
- 常识：在工程化环境，要有能力识别是ESLint错误，还是代码语法错误。
- 如何在webpack中集成ESLint代码检测？
  - 在webpack(v4)中，使用eslint-loader来实现。
  - 在webpack(v5)中，使用eslint-webpack-plugin这个插件来实现。
- 以webpack(v5)为例，说明如何集成ESLint？
  - 在webpack中配置 eslint-webpack-plugin
  - 在项目根目录创建 .eslintrc.js 文件，编写ESLint的配置。
```
在webpack中集成ESLinit：
cnpm i eslint-webpack-plugin -D
这是ESlint官方的包，用于检测代码规则的：
cnpm i eslint -D
这个包用于和eslint配合，一起检测ES6的新语法规范：
cnpm i @babel/eslint-parser -D
下面这些都是ESLint插件，用于检测一些小语法：
cnpm i eslint-config-airbnb -D
cnpm i eslint-plugin-import -D
cnpm i eslint-plugin-jsx-a11y -D
cnpm i eslint-plugin-react -D
cnpm i eslint-plugin-react-hooks -D
```

- 解决ESLint报错的四种常用方案：
  - 在ESLint配置文件中，修改检测规则的级别（0/1/2）
  - 在代码中使用ESlint注释（eslint-disable-line、eslint-disable、eslint-enable）
  - 在项目根目录中添加.eslintigore文件，编写要忽略检测的文件目录或文件名
  - 老老实实，到代码中去，按照ESLint的要求，把代码改成“合法”的。

# webpack扩展

- 怎么扩展？建议的玩法，一边翻文档，一边添加“有意义”的配置。
- 扩展目标：让开发环境更爽更快更方便；让打包构建的代码更加优质。

- 抽离vendor：在entry中通过配置，把第三方包独立出来，避免和业务代码交叉。
- 支持图片资源的加载。{test,type}
- 使用 devtool：'inline-source-map', 增强调试功能，显示src源码位置。
- Tree Shaking：这是我们常说的“摇树”功能，通过配置Tree Shaking，当webpack打包时可以自动删除代码中的“死代码”，进而降低代码包的体积。
- 代码分割：根据动态导入语法“()=>import()”对代码进行切割，把一个大的js文件分割成多个小的js文件。比如vue中的路由懒加载、react中的代码分割，都是典型的应用场景。
- 使用resolve属性：配置省略后缀，配置路径别名。。。
- devServer：还常用于配置代码，解决工作中跨域请求问题。
- 发挥你的想象力。只能说webpack非常强大。但是vite也值得拥有。

# React基础

- 目标一：非常熟练JSX语法，写JSX要像你写CSS一样。
- 目标二：非常熟练地封装React组件、使用第三方组件。

- 在webpack中如何集成React框架？
  - 使用@babel/preset-react支持JSX语法；
  - 安装系列检测React代码规范的ESLint工具。
```
cnpm i react -S
cnpm i react-dom -S
```
- react，是核心包，提供了组件封装的相关功能。
- react-dom，用于把React组件渲染到真实的DOM中去。

# react-router-dom(v5)

- 官网：https://v5.reactrouter.com/web/guides/quick-start
- 提示：最新的react路由是v6，因为比较新，暂时不讲。
```
cnpm i react-router-dom@5.3.0 -S
```

- 两种路由模式：<HashRouter>、<BrowserRouter>
- 两个跳转组件：<Link>、<NavLink>
- 定义路由规则的三个组件：<Switch>、<Route>、<Redirect>
  - <Switch>，加快<Route>的匹配速度；<Switch>必须是<Route>的直接父组件。
  - <Redirect>，用于重定向。

- 代码分割（路由懒加载）：当我们页面比较多时，为了优化项目性能，我们要把整个bundle分割成多个小的js文件。那该如何分割呢？在SPA单页应用程序中，一般以路由为标准进行分割。背后的原理：Webpack打包时，一旦遇到动态导入语法【()=>import()】，默认就把它切分成一个小的js文件（一个chunk）。
  - 如何做：https://v5.reactrouter.com/web/guides/code-splitting
  - cnpm i @babel/plugin-syntax-dynamic-import -D
  - 并且要在babel.config.js中添加这个插件的配置
  - cnpm i @loadable/component -S

- 使用路由API：history、location、match等。
  - 在React路由系统中，凡是被<Route>直接修饰过的React组件，其props上都有路由API。
  - 对那些没有被<Route>所修饰过的React，其props上默认是没有路由API。如果想在这些组件中使用路由API，用withRouter这个高阶组件来注入路由API，或者使用官方提供的路由Hooks来访问路由API。
  - 结论：无论当前React组件中是否有路由API，我们都推荐使用路由Hooks来访问路由API。

- 虽然路由组件和API都比较简单，但大家需要注意的是，用路由设计SPA应用的路由系统，却不是一件容易的事儿。

# 状态管理

- 状态管理工具，本质上就是一个数据容器。当我们希望某个数据在应用程序中跨组件共享时，我们就可以把这个数据定义状态管理工具中。
- 常用见的状态管理工具：vuex（只能用在vue中）mobx（在vue和react中都能）redux（一般只配合react使用）。

- mobx(v5) + mobx-react(v6) 以前比较旧的版本，已经很少使用了。
- mobx(v6) + mobx-react(v7) 目前比较常用的版本，大家一定要会。

- mobx 用于定义数据容器的（定义store的）。
- mobx-react 是基于React上下文、高阶组件封装的连接工具，用于把mobx数据store与React组件树连接起来，方便我们使用store数据。
```
cnpm i mobx -S
cnpm i mobx-react -S
```
