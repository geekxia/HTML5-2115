// 学习目标：学习定义React组件的两种方式，及组件的渲染流程。

// 1、两种定义组件的方式

// - 类组件：有state、有生命周期、有this、有上下文、有ref 等特性；所以相对于函数式组件有，类组件的性能较差。
// - 函数式组件：没有state，没有生命周期，没有this，没有上下文，没有ref等特性；所以相对类组件，函数式组件的性能较好。

// - 无论是类组件，还是函数式组件，都有props。在类组件中，使用this.props来访问。在函数式组件中，其入参就是props。

// - 当我们封装React组件时，所以就有两种选择：如果你封装的组件用不到state，就封装成函数式组件；如果你封装的组件要用到state，就封装类组件。


// 2、用自己的话描述一个React组件的渲染流程

// - 以类组件为例，当React组件被实例化时，render()初次被调用并返回JSX（JSX实际上就是React.createElement()的结果），进一步生成Fiber树（虚拟DOM），接着进入提交阶段，把Fiber渲染成真实的DOM结构，此时页面就完成了初始渲染。当声明式变量被this.setState()修改时，render()会再次被调用，返回全新的JSX，再次生产新的Fiber树（新的虚拟DOM），此时在电脑内存中就有了两颗Fiber树，React在背后进行协调运算（Diff运算），找出最小化的脏节点（这些脏节点会构成一个最小化的Fiber），接着进入提交阶段，只把脏节点更新到真实的DOM中去。

// - 函数式组件默认是没有state的，自react(v16.8)以后，新增了Hooks API，可以“模拟”出类组件中state的特性。现在我来描述一下函数式组件的渲染流程：函数式组件初始化时，第一次返回JSX，第一次生成Fiber树，接着提交更新渲染成真实的DOM；当set*系列方法修改useState所定义的声明式变量时，这会触发整个函数式组件重新执行（也就是当前函数重新调用），进而返回全新的JSX，再次生产新的Fiber树。React接着进行协调运算，找到最小化的脏节点，提交更新真实DOM。


import React, { Component, useState, useEffect } from 'react'

class PanChu extends Component {
  constructor (props) {
    super(props)
    // 相当于是vue中的data选项，即所谓的声明式变量
    // 特点：当state中的变量发生变化时，视图自动更新。
    this.state = {
      count: 1
    }
  }
  // 相当于vue中的mounted
  componentDidMount () {
    console.log('类组件的props', this.props)
    this.timer = setInterval(()=>{
      this.setState(state=>({count: state.count+1}))
    }, 1000)
  }
  // 相当于是vue中的beforeDestroy
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  // 这个render就是一个生命周期的钩子
  render () {
    console.log('re rendered')
    return (
      <>
      <h1>潘楚 { this.state.count }</h1>
      </>
    )
  }
}

const XingXing = props => {
  console.log('函数式组件的props', props)
  const [count, setCount] = useState(1)
  useEffect(()=>{
    const timer = setInterval(()=>{
      setCount(count+1)
    }, 1000)
    return ()=>{
      clearInterval(timer)
    }
  }, [count])
  return <h1>兴兴 { count }</h1>
}

export default () => (
  <>
    <PanChu />
    <XingXing />
  </>
)
