// 这就是webpack的配置文件（语法是CommonJS、Node语法）

// 抛出webpack配置对象
// module.exports = {}
// 抛出一个函数，这个函数被调用时返回wepback配置对象
// module.exports = () => ({})

const { merge } = require('webpack-merge')

const serve = require('./config/serve')
const build = require('./config/build')
const config = require('./config/common')

// 从--env中取出环境变量，来区分生产打包环境和本地开发环境
module.exports = ({development}) => merge(config, development?serve:build)
