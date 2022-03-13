// 在React中封装组件有两种方式：类组件、函数式组件。

/* eslint-disable */
import React from 'react'
import { HashRouter } from 'react-router-dom'
import Layout from '@/layout'
import { Provider } from 'mobx-react'
import store from '@/store'


const App = () => (
  <HashRouter>
    {/*
      使用mobx-react提供的上下文组件，
      向React组件树中注入store数据。
    */}
    <Provider {...store}>
      <Layout />
    </Provider>
  </HashRouter>
)

export default App


// const element = <div style={{height:'20px',background:'red'}} />

/* eslint-enable */

// change (key, ev) {
  // const theme = {...this.state.theme}
  // theme[key] = ev.target.value
  // this.setState({theme})

  // this.setState(state=>(
  //   { theme: {...state.theme, [key]:ev.target.value } }
  // ))
// }
