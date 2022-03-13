// 学习目标：能够识别上下文语法；如果某些特殊场景，你要能够借助上下文来解决问题。

// 1、什么是React上下文？

// - 官方提供了一个重要API（React.createContext()）用于创建上下文对象，通过上下文组件可以在React组件树中自上而下地传递数据。
// - 特点：自下而下地在组件树之间传递数据。

// 2、如何定义上下文？并向组件树中注入数据？

// - const ThemeContext = React.createContext()
// - <ThemeContext.Provider value={'数据'} />

// 3、在业务组件中如何使用上下文？

// - 第一种语法：Home.contextType=ThemeContext，在this.context上访问数据。
// - 第二种语法：<Consumer>{(ctx)=>(jsx视图)}</Consumer>，在this.context上仍然没有数据。
// - 提示：如果要在函数式组件中使用上下文数据，后面的 useContext()来实现。

// 4、使用上下文通信，和使用props穿透，有什么区别？

// - 上下文只要在顶层组件中注入了，那么在后代组件中都可以直接消费。
// - props传值，必须厘清楚组件之间的父子关系，并一层一层地向下穿透 {...props}。
// - 注：如果想更好地理解React上下文的特点，你可类比vue中 provide/inject。


import React, { PureComponent } from 'react'
import ThemeContext, { Consumer } from '@/utils/theme'

// 【使用上下文的第一种语法（推荐）】
export default class extends PureComponent {
  render () {
    console.log('this context', this.context)
    return (
      <Consumer>
      {
        ctx => {
          console.log('ctx', ctx)
          return (
            <div style={{...ctx}}>
              <h1>学习上下文</h1>
            </div>
          )
        }
      }
      </Consumer>
    )
  }
}

// 【使用上下文的第二种语法（不常用）】
class StudyContext extends PureComponent {
  render () {
    console.log('this context', this.context)
    return (
      <div>
        <h1>学习上下文</h1>
      </div>
    )
  }
}
// 给当前组件添加上下文类型
StudyContext.contextType = ThemeContext
// export default StudyContext2
