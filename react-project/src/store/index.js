// Redux怎么学？记住“三个三”。

// 第1个三（三个API）：createStore、combineReducers、applyMiddleware
// 第2个三（三个概念）：store、reducer、action
// 第3个三（三个特点）：store单一数据源、store是只读的、只能使用纯函数reducer修改store。

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
// 有了redux-thunk这个插件，在store的外部，dispatch(action生成器)/dispatch(action)都支持。
import thunk from 'redux-thunk'

import study from './modules/study'
import user from './modules/user'
import good from './modules/good'

// combineReducers() 用于把多个小的reducer函数合并成根reducer
const reducer = combineReducers({
  // 命名空间
  study,
  user,
  good
})

// redux也是基于中间件的，redux生态中有很多中间件
// 注意，在redux中使用中间件，是有顺序讲究的
const middlewars = compose(
  applyMiddleware(thunk),
  applyMiddleware(logger)
)

const store = createStore(reducer, middlewars)
console.log('--store', store.getState())
export default store
