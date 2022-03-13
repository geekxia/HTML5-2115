// 把项目打包的配置，都写在这里

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
  // 当项目打包时指定为production
  mode: 'production',
  // 有助打包出高质量的代码
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    })
  ],
  module: {
    rules: [
      // MiniCssExtractPlugin.loader用于把css-loader返回的css代码抽离成css文件
      {
        test: /\.(css|scss)/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin()
    ]
  }
}
