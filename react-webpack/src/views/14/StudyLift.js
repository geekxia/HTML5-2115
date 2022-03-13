// 学习目标：深入理解“状态提升”的思想，灵活使用父子组件通信。

// 1、什么是状态提升？

// - 这是一种从React的角度来实现组件之间数据共享的通信方案。当两个React要进行数据共享(通信)时，我们的做法是，先找到这两个组件的最近的父级组件，然后把这个需要共享的数据定义在这个最近父级组件state中。再复用React单向数据流的特点，在这两个组件中实现对数据的共享。

// - 状态提升，是React中最基本、也是最基础的组件之间的通信方案。

// - 约定：当我们谈论父子组件时，一般我们谈论是的自定义组件，也就是说不考虑那些HTML元素。


// 2、父子组件通信

// 父传子，使用props传递数据（在React中，props还可以传递一个自定义事件）
// 子传传，使用 on* 这种自定义事件（在子组件中触发，调用父组件作用域中的事件）

// - 注意：在React中，没有$emit()这样的通信方案。

// 3、怎么理解“受控组件”？

// - 当我们在使用自定义组件时，给组件传递数据时尽可能地使用state声明变量。
// - 为什么要受控呢？由state声明式变量所控制的组件，其状态变化可被预测。

const Celsius = ({ value, onChange }) => {
  return (
    <div>
      <h3>
        请输入摄氏温度：
        <input
          type="text"
          value={Number(value)}
          onChange={onChange}
        />
      </h3>
    </div>
  )
}

const Fahrenheit = ({ value }) => {
  // 声明式变量，只能参与运算，你不要去修改它
  const val = (Number(value) * 9 / 5) + 32
  return (
    <div>
      <h3>华氏温度：{ val }</h3>
    </div>
  )
}

import React, { PureComponent } from 'react'

export default class StudyLift extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      temper: 0
    }
  }

  change (ev) {
    console.log('父组件changed', ev.target.value)
    this.setState({temper: Number(ev.target.value)})
  }

  render () {
    const { temper } = this.state
    return (
      <div>
        <h1>学习状态提升</h1>
        <hr/>
        {/* 这就是受控组件：组件状态由声明式变量所控制着！ */}
        <Celsius value={temper} onChange={ev=>this.change(ev)} />
        <hr/>
        <Fahrenheit value={temper} />
      </div>
    )
  }
}
