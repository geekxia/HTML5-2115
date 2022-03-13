// 这是ESLint的配置文件（ESLint官方支持5种配置文件，这是优先最高的）

module.exports = {
  // 解析器的配置，这个parser可以eslint一起工作
  parser: "@babel/eslint-parser",
  // 解析选项配置
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  // 这是ESlint插件的配置
  // 什么是ESlint插件？是一些小版本的检测工具，可以配合eslint这个包一起作用。
  plugins: [
    "jsx-a11y",
    "react",
    "react-hooks"
  ],
  extends: [
    "plugin:jsx-a11y/recommended",
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  // ESLint检测规则的配置
  // ESlint错误级别有三种：error(2) warn(1) off(0)
  rules: {
    "semi": "error",
    "linebreak-style": 0,   // 关闭掉这条检测规则
  }
}
