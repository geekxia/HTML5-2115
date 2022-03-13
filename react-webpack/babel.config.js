// 这是Babel(v7)的配置文件

module.exports = {
  // 在这里配置“预设”
  presets: [
    ['@babel/preset-env', {}],
    ['@babel/preset-react', {}]
  ],
  // 在这里配置“插件”
  plugins: [
    // 下面这两个插件，用于支持ES6的装饰器语法
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties"],
    // 支持动态导入语法
    ["@babel/plugin-syntax-dynamic-import"]
  ]
}
