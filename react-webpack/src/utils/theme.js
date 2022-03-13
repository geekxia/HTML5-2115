// 使用上下文实现网站的颜色切换

import React from 'react'

// 上下文组件（上下文对象）
// 在上下文组件中，还有两重要的组件
// - <Provider value /> 用于向组件树中注入(提供)数据
// - <Comsumer /> 用于在组件中取出(消费)数据
const ThemeContext = React.createContext()
// console.log('ctx', ThemeContext)
const { Provider, Consumer } = ThemeContext

// 这个语法
export { Provider, Consumer }  // import { }
export default ThemeContext    // import 
