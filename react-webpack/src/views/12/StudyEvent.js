// 学习目标：熟练地绑定事件、事件传参、使用事件对象、阻止冒泡。

// 1、合成事件：在React中，元素上的事件（鼠标事件、键盘事件、表单事件等）都被React做了二次封装，这些事件被之为“合成事件”。比如 onClick、onMouseEnter、onInput、onChange、onKeyUp、onScroll。。。

// 2、在类组件中，绑定事件有两种语法，一种使用ES5的方式进行绑定，另一种使用箭头函数来绑定事件。后者，是我们推荐的做法。

// - 使用ES5方式绑定事件：<div onClick={this.click.bind(this)} />，在事件处理器函数中，最后一个参数永远都是事件对象。（ES5方式已经不推荐使用了）

// - 使用ES6方式绑定事件：<div onClick={ev=>this.click(ev)} />，在click方法中this指向当前组件实例，事件对象需要手动传递。

// - 结论：在React中，不要再使用ES5的方式绑定事件了，统一推荐使用ES6的方式绑定事件。

// 3、关于事件对象的一些功能

// - 阻止默认事件 event.preventDefault()
// - 阻止冒泡  event.stopPropagation()
// - 表单取值  event.target.value / event.target.checked
// - 键盘事件  event.keyCode
// - 事件委托 event.target.dataset
// - 在React事件中，各种事件功能，和二阶段学习的事件操作是一致的

// 4、函数式组件中如何绑定事件？只能使用ES6箭头函数的方式绑定事件，关于事件传参、事件对象的用法，和类组件中ES6方式绑定事件一致。

import React, { Component } from 'react'

const ChuMing = () => {
  // 事件处理器（在函数式组件中没有this）
  const click = (arg1, arg2, event) => {
    console.log('clicked arg', arg1, arg2)
    console.log('clicked event', event)
  }

  return (
    <div>
      <h3>安楚铭</h3>
      <button onClick={ev=>click(11,22,ev)}>
        点击[在函数式组件中绑定事件]
      </button>
    </div>
  )
}

export default class StudyEvent extends Component {

  constructor (props) {
    super(props)
    this.state = { count: 1 }
  }

  // 这是真实的事件处理器函数（用this来访问）
  click1 (arg1, arg2, event) {
    // 在这个作用域里访问this
    console.log('clicked this', this.state.count)
    console.log('clicked arg', arg1, arg2)
    console.log('clicked event', event)
  }

  // 这只是真实事件处理器中的一处调用
  click2 (arg1, arg2, event) {
    console.log('clicked this', this)
    console.log('clicked event', event)
    console.log('clicked arg', arg1, arg2)
  }

  search (ev) {
    // 根据键盘码监听Enter事件
    if (ev.keyCode === 13) {
      console.log('搜索', ev.target.value)
    }
  }

  click3 (ev) {
    // console.log('clicked event row')
    const row = ev.target.dataset.row
    console.log(`你点击的是第 ${row} 行`)
  }

  render () {
    return (
      <div>
        <h1>学习事件绑定</h1>
        <button onClick={this.click1.bind(this, 11, 22)}>
          点击[用ES5的方式绑定]
        </button>
        <hr/>

        <button onClick={ev=>this.click2(33, 44, ev)}>
          点击[用ES6的方式绑定]
        </button>
        <hr/>

        搜索：<input type="text" onKeyUp={ev=>this.search(ev)} />
        <hr/>

        { /* 使用事件委托，减少事件绑定 */ }
        <div onClick={ev=>this.click3(ev)}>
          <h3 data-row={1}>第一行</h3>
          <h3 data-row={2}>第二行</h3>
          <h3 data-row={3}>第三行</h3>
        </div>
        <hr/>

        <ChuMing />
      </div>
    )
  }
}
