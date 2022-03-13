// 学习目标：学习条件渲染、列表渲染。

// 1、条件渲染：本质上就是对“表达式”的灵活运用。

// - 单一元素的条件渲染：(exp) && <jsx/>
// - 两个元素的条件渲染：(exp) ? <jsx1/> : <jsx2/>
// - 多个元素的条件渲染：建议封装render*方法来渲染

// 2、列表渲染：官方推荐使用 map() 方法来渲染列表

// - map() 入参是数组，返回值也是一个数组。
// - JSX正好也支持对数组的直接渲染。
// - 理解：一个源数组进入map()这台机器，返回经过加工后的新数组（由JSX元素组成的数组）

// - 注意：列表渲染加 key。
// - 原则：列表渲染时，如果需要数据处理，建议封装自定义渲染函数；反之，直接编写在render()中即可。

import React, { PureComponent } from 'react'

export default class StudyList extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      role: 'student',
      day: 'white',
      row: 0,
      list: [
        { id:1, name:'潘楚', gender:1 },
        { id:2, name:'培玄', gender:0 },
        { id:3, name:'偷心人', gender: -1 }
      ]
    }
  }

  toggle1 () {
    this.setState(state=>{
      return {
        role: state.role ==='student' ? 'teacher' : 'student'
      }
    })
  }

  toggle2 () {
    this.setState(_=>({day:_.day==='white'?'black':'white'}))
  }

  // 约定：封装渲染视图的方法时，我习惯用render开头
  // 像这类方法，我们一般称之为“自定义的渲染方法”，所以返回值必须是有效的JSX
  // 注意：既然是自定义的渲染方法，所以在函数体中不能使用this.setState()
  renderRow () {
    const { row } = this.state
    let result = null
    switch (row) {
      case 0:
        result = <h1>第一排同学</h1>
        break
      case 1:
        result = <h1>第二排同学</h1>
        break
      case 2:
        result = <h1>第三排同学</h1>
        break
      case 3:
        result = <h1>第四排同学</h1>
        break
      case 4:
        result = <h1>第五排同学</h1>
        break
      default:
    }
    return result
  }

  toggle3 () {
    this.setState(_=>({row: (_.row+1)%5 }))
  }

  renderUserList () {
    const { list } = this.state
    return list.map((ele,idx)=>{
      let genderZh = null
      if (ele.gender===0) genderZh='女生'
      if (ele.gender===1) genderZh='男生'
      if (ele.gender===-1) genderZh='未知性别'
      return (
        <div key={ele.id}>
        { idx } - { ele.name } - { genderZh }
        </div>
      )
    })
  }

  render () {
    const { role, day, row, list } = this.state

    return (
      <div>
        <h1>学习条件渲染和列表渲染</h1>
        { role==='teacher' && <button>点击</button> }
        <button onClick={()=>this.toggle1()}>切换1</button>
        <hr/>

        {
          day === 'white' ? <h1>太阳</h1> : <h1>月亮</h1>
        }
        <button onClick={()=>this.toggle2()}>切换2</button>

        {
          Math.random() > 0.6
            ? (
              Math.random() > 0.8
                ? <div>两次考试都及格</div>
                : <div>考试不通过</div>
            )
            : (
              Math.random() > 0.6
                ? <div>再给你一次机会</div>
                : <div>劝退</div>
            )
        }
        <hr/>

        { this.renderRow() }
        <button onClick={()=>this.toggle3()}>
          模拟面试（一排一排地来）
        </button>
        <hr/>

        {
          list.map((ele,idx)=>(
            <div key={ele.id}>
            { idx } - {ele.name} - {ele.gender}
            </div>
          ))
        }
        <hr/>

        { this.renderUserList() }

      </div>
    )
  }
}
