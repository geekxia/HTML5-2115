
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// 是开发环境和打包环境都共用的配置
module.exports = {
  // 配置webpack时，一定要给入口。
  // 当webpack开始工作（运行、打包）时，从这里开始
  // entry: './src/main.js'
  // entry: path.resolve(__dirname, 'src/main.js'),
  entry: {
    // 把第三方包分开，不和业务代码交叉在一起
    vendor: ['react', 'react-dom'],
    // 给入口文件取个名字，叫 app
    app: {
      dependOn: 'vendor',
      import: path.resolve(__dirname, '../src/main.js')
    }
  },

  // 配置webpack时，一定要给出口。
  output: {
    // 指定打包结果放在哪个目录中。
    path: path.resolve(__dirname, '../dist'),
    // filename: 'bundle.js'  // bundle 一捆JS、一杯饮料
    // 模仿vue项目打包，让打包结果带有hash标识，这个 [chunkhash] 特殊字符串，就表示给输出的文件自动添加hash标识。
    // 什么是 [chunkhash]？有什么用？当文件依赖发生代码变化、webpack打包，hash标识会自动发生变化，项目上线以后，浏览器向服务端请求静态资源，就会发现hash变了，浏览器将重新请求最新的静态资源，用户就感知到代码的迭代更新了。
    // [name] 这个特殊字符串，就是entry中你指定的文件名字
    filename: 'js/[name].[chunkhash].js',
    // 每次build打包时，webpack自动清理删除dist目录，无须我们手动删除
    clean: true
  },
  // 配置webpack插件（所有的插件都是class类，都要new）
  plugins: [
    // 作用：用于把bundle(js文件)和html关联起来
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      // 在body结束标签前插入js文件
      inject: 'body'
    }),
    // 作用：用于在命令行中显示编译的进度
    new webpack.ProgressPlugin()
  ],
  module: {
    rules: [
      // 当webpack工作时，遇到.js或.jsx文件模块时，使用babel-loader加载这些js/jsx模块，交给Babel编译器（@babel/core、@babel/preset-env、@babel/preset-react等）进行真正的编译，最终得到能够普遍兼容浏览器的ES5代码。
      // Babel如何工作呢？它会根据项目根目录中的babel.config.js中的配置来工作。
      // exclude，忽略哪些条件，在这里的意思是“不编译node_modules”中的js代码，因为第三方包都是编译过的，没必要再编译了。
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // 用于支持图片模块的加载
      // 下面写法是webpack(v5)中的写法，在v4中要使用file-loader来实现。
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      }
    ]
  },
  // 解析配置
  resolve: {
    // 可省略的后缀，一般只省略js文件的后缀
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    // 字符串别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}
