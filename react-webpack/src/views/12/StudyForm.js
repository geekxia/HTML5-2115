// 学习目标：熟练掌握各种表单的使用，要知道什么受控表单。

// 1、常用的表单有哪些？

// - 文本类的表单、多行文本框、拾色器、多选框、单选按钮组、下拉框。
// - 在这里，我们只学习表单赋值、表单取值。

// 2、受控表单(受控组件)：表单的value/checked由声明式变量所控制着。

// - 非受控表单：表单的value/checked属性与声明式变量无关。
// - 在React开发中，除了 input[type=file] 文件上传表单之外，其它表单都建议使用受控表单。


// 3、理解数据流

// - 单向数据流：state只能自上而下地传输。
// - 表单单向绑定：谈论的是受控表单。


import React, { PureComponent } from 'react'

// 全局变量
let password = ''
let addr2 = ''

// checkbox
const Checkbox = props => {
  const { data, value, onChange } = props
  const change = ev => {
    // 当勾选时，向value中追加一个选择；当取消勾选时，从value中删除一个选择。
    const val = ev.target.value
    const chd = ev.target.checked
    const newValue = chd ? [...value, val] : value.filter(ele=>ele!==val)
    // 把处理好的最新选择的结果，回传给父组件
    onChange({target:{value:newValue}})
  }
  return (
    <div>
    {
      data.map(ele=>(
        <span key={ele.id}>
          <input
            type="checkbox"
            checked={value.includes(ele.value)}
            onChange={change}
            value={ele.value}
          />
          <span>{ele.label}</span>
        </span>
      ))
    }
    </div>
  )
}

// Radio
const Radio = props => {
  const { data, value, onChange } = props
  return (
    <div>
    {
      data.map(ele=>(
        <span key={ele.id}>
          <input
            type="radio"
            checked={value===ele.value}
            onChange={onChange}
            value={ele.value}
          />
          <span>{ ele.label }</span>
        </span>
      ))
    }
    </div>
  )
}

// 从语法的角度，可以省略类组件的名字
export default class extends PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      mobile: '',
      addr: '广东深圳',
      addr2: '',

      username: '',
      lucky: '#000000',
      info: '',
      level: '',
      fav: ['book'],
      gender: 'unknow'
    }
  }

  getPass (ev) {
    console.log('ev 密码', ev.target.value)
    password = ev.target.value
  }

  getMobile (ev) {
    // this.setState({mobile: ev.target.value})
    this.state.mobile = ev.target.value
  }

  getAddr (ev) {
    // this.setState({addr2: ev.target.value})
    addr2 = ev.target.value
  }

  submit1 () {
    const data = {
      username: document.getElementById('name').value,
      desc: this.refs.desc.value,
      password: password,
      mobile: this.state.mobile,
      addr: addr2
    }
    console.log('提交', data)
  }

  // React官方特别推荐，对多个表单进行取值时，尽可能地复用onChange的事件处理器
  getCtrlFormValue (key, ev) {
    this.setState({[key]: ev.target.value})
  }

  submit2 () {
    const data = {
      username: this.state.username,
      lucky: this.state.lucky,
      info: this.state.info,
      level: this.state.level,
      fav: this.state.fav,
      gender: this.state.gender
    }
    console.log('提交', data)
  }

  render () {
    const { addr, username, lucky, info, level, fav, gender } = this.state

    const levelArr = [
      { id: 1, label: '高中', value: 'gaozhong' },
      { id: 2, label: '大专', value: 'dazhuang' },
      { id: 3, label: '本科', value: 'benke' },
      { id: 4, label: '硕士', value: 'shuoshi' }
    ]

    const favArr = [
      { id: 1, label: '足球', value:'footerball' },
      { id: 2, label: '篮球', value:'basketball' },
      { id: 3, label: '跑步', value:'running' },
      { id: 4, label: '编程', value:'coding' },
      { id: 5, label: '读书', value:'book' }
    ]

    const genderArr = [
      { id: 1, label: '男', value: 'man' },
      { id: 2, label: '女', value: 'woman' },
      { id: 3, label: '保密', value: 'unknow' }
    ]

    return (
      <>
      <div>
        <h1>学习表单绑定</h1>
        <hr/>
        用户名：
        <input type="text" id='name' />
        <br/>
        简介：
        <textarea ref='desc' cols="30" rows="3" />
        <br/>
        密码：
        <input type="password" onInput={ev=>this.getPass(ev)} />
        <br/>
        手机号：
        <input type="text" onBlur={ev=>this.getMobile(ev)}/>
        <br/>
        住址：
        {/* addr是声明式变量，它只是影响了表单的初始值，并没有影响value */}
        <input
          type="text"
          defaultValue={addr}
          onInput={ev=>this.getAddr(ev)}
        />
        <br/>
        上传图像：
        <input type="file"/>
        <br/>
        <button onClick={()=>this.submit1()}>提交</button>
      </div>
      <hr/>
      { /* 以上表单，都是非受控表单 */ }

      { /* 以下表单，才是我们推荐的用法 */ }
      用户名：
      <input
        type="text"
        value={username}
        onChange={ev=>this.getCtrlFormValue('username', ev)}
      />
      <br/>
      幸运色：
      <input
        type="color"
        value={lucky}
        onChange={ev=>this.getCtrlFormValue('lucky', ev)}
      />
      <br/>
      简介：
      <textarea
        cols="30"
        rows="3"
        value={info}
        onChange={ev=>this.getCtrlFormValue('info', ev)}
      />
      <br/>
      选择学历：
      <select
        value={level}
        onChange={ev=>this.getCtrlFormValue('level', ev)}
      >
        {
          levelArr.map(ele=>(
            <option
              key={ele.id}
              value={ele.value}
            >
              { ele.label }
            </option>
          ))
        }
      </select>
      <br/>
      选择爱好：
      <Checkbox
        data={favArr}
        value={fav}
        onChange={ev=>this.getCtrlFormValue('fav', ev)}
      />
      {/*
        favArr.map(ele=>(
          <span key={ele.id}>
            <input
              type="checkbox"
              checked={fav.includes(ele.value)}
              onChange={ev=>this.getCtrlFormValue('fav', ev)}
              value={ele.value}
            />
            <span>{ele.label}</span>
          </span>
        ))
      */}
      <br/>
      选择性别：
      <Radio
        data={genderArr}
        value={gender}
        onChange={ev=>this.getCtrlFormValue('gender', ev)}
      />
      {/*
        genderArr.map(ele=>(
          <span key={ele.id}>
            <input
              type="radio"
              checked={gender===ele.value}
              onChange={ev=>this.getCtrlFormValue('gender', ev)}
              value={ele.value}
            />
            <span>{ ele.label }</span>
          </span>
        ))
      */}
      <br/>
      <button onClick={()=>this.submit2()}>提交</button>
      </>
    )
  }
}
