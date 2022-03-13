module.exports = {
  plugins: [
    // 支持路由动态导入语法
    ["@babel/plugin-syntax-dynamic-import"],
    // 支持装饰器语法
    ["@babel/plugin-proposal-decorators", {legacy:true }],
    ["@babel/plugin-proposal-class-properties", {loose:true}]
  ]
}
