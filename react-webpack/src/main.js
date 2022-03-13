/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'

// 根组件
import App from './App'
import '@/assets/style.scss'

// 这就是JSX语法
const app = <App />
const dom = document.getElementById('root')

// 把App根组件挂载（渲染）到#root这个DOM节点上
ReactDOM.render(app, dom)
/* eslint-enable */
