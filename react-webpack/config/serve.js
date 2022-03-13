// 把本地服务在配置，都写在这里

const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  // 当运行本地服务时指定为development
  mode: 'development',
  // 用于调试，如何代码报错，显示的是src源码中的位置
  devtool: 'inline-source-map',
  // 配置本地服务（对打包是没有作用的）
  // 本地服务默认访问的是当前项目的public目录
  devServer: {
    port: 8080,
    // 当服务启动成功后，你在src中编写代码，浏览器中自动更新。
    hot: true,
    // 当启动本地服务时，自动打开浏览器
    open: true,
    // 监听依赖文件变化
    static: '../dist',
    // 配置代理
    proxy: {
      '/api': {
        target: 'https://cnodejs.org',
        changeOrigin: true
      }
    }
  },
  // 为什么配置loaders的属性名叫module？
  // 原因：在webpack眼中，一切皆模块module
  module: {
    // 什么是rules？用于定义处理各种文件模块的编译规则。
    rules: [
      // 当webpack工作时，遇到以.css结尾的文件模块时，就使用css-loader加载.css文件，处理完成后返回css代码；再交给style-loader，把css代码插入html的head标签中去。
      // 当webpack工作时，遇到以.scss结尾的文件模块时，先使用sass-loader加载.scss文件，交给sass编译器进行真正的编译，编译得到.css文件，再由css-loader加载处理，进一步得到css代码，最后由style-loader把css代码插入html文件的head标签中去。
      // 注意：当我们处理文件模块需要多个loader时，要用数组语法，谁在后面请先工作。
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    // 在开发环境中集成ESLint代码规则的检测功能。
    // 当webapck工作时，遇到js/jsx/ts/tsx文件，就使用ESlint这个工具包对代码进行检测。
    new ESLintPlugin({
      eslintPath: 'eslint',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      exclude: 'node_modules'
    })
  ]
}
