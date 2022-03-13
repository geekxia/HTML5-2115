// 学习目标：熟练掌握React类组件常用的生命周期，以及React组件渲染的两个重要阶段（render阶段、commit阶段）。

// 1、常用生命周期（3-2-1）

// - 挂载阶段（3）constructor、render、componentDidMount
// - 更新阶段（2）render/shouldComponentUpdate、componentDidUpdate
// - 卸载阶段（1）componentWillUnmount

// - 强调：只有类组件才有生命周期，函数式组件是没有的。

// 2、两个阶段

// - render阶段: 用于异步地生成Fiber树, 只有当浏览器主线程空闲时才工作, 这个阶段所生成的Fiber, 是用于协调运算(diff).
// - commit阶段: 用于把Fiber提交渲染成真实的DOM, 这个阶段是同步的, 不会被中断, 当commit完成时, 视图就渲染或更新成功了.


import React, { Component, PureComponent } from 'react'

export default class StudyLife extends Component {

  // constructor()
  // 这是React类组件的构造函数，当React组件被实例化时调用
  // 它的参数是props，代表的是父组件传递过来的数据
  // 强调：在constructor中，一般不做复杂的业务逻辑，也就是说在这里不要调接口、不要执行DOM操作、不要开启定时器等。
  // 强调：在constructor中，也不建议调用this.setState()方法，这个操作是完全没有必要的。
  // 强调：在constructor中，不要对props和state交叉赋值。不仅如此，在整个React组件的内部，也不要对props和state进行交叉赋值。
  // 在组件的整个生命中，只执行一次。
  constructor (props) {
    // 调用父类Component的构造器函数
    // super(props)这行代码，必须是constructor的第一行代码
    super(props)
    // 这是类组件中唯一的定义state的地方
    // 这就是所谓的声明式变量，当使用this.setState()修改state时，会触发render()执行，进而更新视图。
    // 怎么理解声明式？当我们需要操作视图时，不建议直接操作DOM，而是在这里声明变量，再通过这些变量去控制视图的变化。
    this.state = {
      count: 1
    }
    // do something
    console.log('-----constructor')
    // 一般不要在这儿写业务逻辑
  }

  // componentDidMount()
  // 相当于vue中的mounted()，表示视图第一次渲染完成。
  // 在这里，你可以“为所欲为”，所以你可以在这里调接口、开定时器、DOM操作等。
  // 在这里，可以正常使用 this.setState()
  // 在组件的整个生命中，也只执行一次。
  componentDidMount () {
    console.log('-----componentDidMount')
  }

  // shouldComponentUpdate()
  // 它是一个“开关”，用于精细化地控制是否执行更新阶段, 是一种性能优化方案.
  // 如果这个生命周期返回 true，更新阶段正常执行
  // 如果这个生命周期返回 false，不执行更新阶段
  // 所以，这个生命周期，必须得返回一个布尔值.
  // 举个场景: 比如咱们的state上有10个声明式变量, 其中9个变量参与了视图渲染, 还有1个没有参与视图渲染. 如果在业务逻辑中, 我们修改了这个未参与视图渲染的变量,请问要不要执行更新阶段呢? 显然是不需要执行更新阶段的, 所以就有了这个"开关"的存在.
  // 因为这个生命周期过于灵活, 比较麻烦, 所以最新的React中, 不推荐使用这个生命周期了, 建议使用 PureComponent / React.memo() 来替代.
  // PureComponent也可以解决这个性能优化的问题, 当你使用PureComponent时,就不能再使用shouldComponentUpdate.
  // React.memo()用于函数式组件上, 其功能和PureComponent一样.
  // 在shouldComponentUpdate()中, 也不建议使用this.setState()
  shouldComponentUpdate (props, state) {
    console.log('-----shouldComponentUpdate')
    // console.log('state', state, 'props', props)
    if (state.count > 10) {
      // return false
    } else {
      // return true
    }
    return true
  }

  // componentDidUpdate()
  // 相当于vue中的updated(), 表示视图已更新完成
  // 这个生命周期, 还相当于是 this.setState(xx, callback)中的callback.
  // 结论: 在React中, 我们一般不使用this.setState(xx, callback)的callback方法, 而推荐使用 componentDidUpdate 来替换.
  // 注意: 在componentDidUpdate中, 可以使用 this.setState(), 但是一定要给终止条件.
  componentDidUpdate () {
    console.log('-----componentDidUpdate')
    if (this.state.count < 10) {
      setTimeout(()=>{
        this.setState(state=>({count: state.count + 1}))
      }, 1000)
    }
  }

  // componentWillUnmount()
  // 相当于vue中的beforeDestroy(), 表示当前组件即将被销毁
  // 一般在这里, 关闭定时器, 清除缓存等操作
  // 这里没有必须再调用  this.setState()
  componentWillUnmount () {
    console.log('-----componentWillUnmount')
  }

  // render()
  // 是类组件必须要有的一个生命周期，不能少
  // 它必须返回有效的JSX节点：JSX变量、null。
  // render()在挂载阶段和更新阶段，都会执行，它返回JSX节点，进一步生成Fiber树(本质上就是一个双向链表，有了这个链表结构，React就不需要递归了，使用循环即可完成对节点的遍历，这是React v16之后的架构)
  // render()这个过程，就是我们所谓的“render阶段”，这个阶段是异步的。只有当浏览器主线程空闲时才工作。
  // 需要特别注意：在render()方法内部，不能调用this.setState()，这会触死循环。
  // render()在初始化阶段和更新阶段, 都用得着.
  render () {
    console.log('-----render')
    const { count } = this.state

    return (
      <div>
        <h1>学习生命周期</h1>
        <div>
          <h1>{ count }</h1>
          <button onClick={
            ()=>this.setState(_=>({count: _.count+1}))
          }>自增</button>
        </div>
      </div>
    )
  }
}
