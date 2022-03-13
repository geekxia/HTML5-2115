// 学习目标：熟悉地定义state、使用state、修改state，还要了解state的特点及其对组件渲染的影响。

// 1、关于state

// - 在类组件中有state，在函数式组件中默认是没有state（自v16.8之后使用Hooks可以模拟state）。

// 2、state定义与使用

// - 只能在constructor() 使用 this.state={} 定义声明式变量。关于state变量的数据类型，常用的比如：基本数据类型、数组、对象。
// - 在类组件中，使用 this.state 来访问这些声明式变量。

// 3、如何修改state声明式变量？

// - 注意：在React中不要直接修改state，这样的操作，render()不会执行，导致视图不更新。（只能使用this.setState()这个专属方法来修改state）

// - 语法1：this.setState({}, callback)
// - 语法2：this.setState((state,props)=>({}), callback)
// - 注意：当我们修改state声明式变量时，如果新值是由旧值计算而来，推荐使用语法2；如果新值与旧值无关，推荐使用语法1。
// - 注意：在React合成事件中，this.setState()是异步的，所以this.setState()有了第二个参数callback，表示这个异步render已完成。

// 4、this.setState()详解

// - 在合成事件（on*系列事件、生命周期）中，this.setState()是异步的；并且同一个合成事件的作用域中，如果调用了多次this.setState()，React会自动合并它们，并且只执行一次render()。
// - 在非合成事件（定时器、Promise.then()等）中，this.setState()是同步的；并且这些非合成事件中，如果调用多次this.setState()，React没法合并他们，也就是这会导致执行多次render()。


import React, { Component } from 'react'
export default class StudyState extends Component {

  constructor (props) {
    super(props)
    // 定义state
    this.state = {
      count: 1,
      number: Math.random(),
      name1: '狗蛋儿',
      name2: '狗蛋儿',
      age1: 0,
      age2: 0,
      name: '张三'
    }
  }

  add () {
    console.log('-----a', this.state.count)
    // 这是错误的操作，不建议这么修改state
    // this.state.count++
    this.setState((state, props)=>{
      // do something
      // console.log('prev state', state)
      // console.log('prev props', props)
      return {
        count: state.count + 1
      }
    }, ()=>console.log('-----c', this.state.count))
    console.log('-----b', this.state.count)
  }

  toggle () {
    console.log('-----a', this.state.number)
    // 当新值与旧值无关时，推荐这种写法
    this.setState({
      number: Math.random()
    }, ()=>console.log('-----c', this.state.number))
    console.log('-----b', this.state.number)
  }

  backup () {
    this.setState({name1:'陈老大'})
    for (let i=0; i<10; i++) {
      console.log('--i', i)
    }
    this.setState({name2:'陈老二'})
    // do something
    this.setState({age1:3})
    // do something
    this.setState({age2:2})
    // React会自动把上述代码合并成一个this.setState()
    // this.setState({
    //   name1:'陈老大',
    //   name2:'陈老二',
    //   age1:3,
    //   age2:2
    // })
  }

  asyncClick () {
    setTimeout(()=>{
      console.log('-----a', this.state.name)

      // 这个作用域（宏任何的函数作用域）
      this.setState({name: '李四'}, ()=>{
        console.log('-----c', this.state.name)
      })

      console.log('-----b', this.state.name)
    }, 1000)
  }

  render () {
    console.log('--re render')
    const { count, number, name1, name2, age1, age2, name } = this.state
    return (
      <div>
        <h1>学习state</h1>
        <h1>{ count }</h1>
        <button onClick={()=>this.add()}>自增</button>
        <hr/>

        <h1>{ number }</h1>
        <button onClick={()=>this.toggle()}>随机改变</button>
        <hr/>

        <h1>老大：{ name1 } : { age1 }</h1>
        <h1>老二：{ name2 } : { age2 }</h1>
        <button onClick={()=>this.backup()}>上户口</button>
        <hr/>

        <h1>{ name }</h1>
        <button onClick={()=>this.asyncClick()}>测试“非合成”事件</button>
      </div>
    )
  }
}
