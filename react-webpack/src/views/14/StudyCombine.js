// 学习目标：深入理解“组合”这种设计模式在React组件化中应用与实践；能够熟练封装可复用的React组件。

// 1、谈一谈什么组合模式？

// - 借助 props.children 和 render props特性，封装可复用的React组件。

// - 我们在封装React时，可以借鉴下面这个方法论：
// - 第1步：对将要被封装的视图进行结构化拆解（没有标准，仁者见仁智者见智）
// - 第2步：把拆解出来的每个局部结构封装成React组件（props定义是重点）
// - 第3步：借助于props.children和render props等特性，把多个局部组件组合成最终视图。


// 2、React Portals

// - 语法：ReactDOM.createPortal(<jsx/>, container)
// - 作用：用于把JSX元素渲染React根组件以外任意的DOM处。

// 3、prop-types

// - 作用：当我们封装可复用的组件时，必须做props数据类型等验证。
// - 安装：cnpm i prop-types -S
// - 文档：https://www.npmjs.com/package/prop-types


// 4、假如使用继承思想来封装组件？

// class Modal extends PureComponent {}
// class MiddleModal extends Modal {}
// class SmallModal extends Modal {}
// class DeleteSmallModal extends SmallModal {}


import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './style.scss'

const Header = props => {
  const { title, closable, closeIcon, onCancel } = props
  return (
    <div className='header'>
      <div>{ title }</div>
      {
        closable && (
          <div className='close' onClick={onCancel}>
          { closeIcon }
          </div>
        )
      }
    </div>
  )
}

// 当是大弹框时的主体区域
const Main = props => {
  const { children } = props
  return (
    <div className='main'>
      { children }
    </div>
  )
}

const Footer = props => {
  const { onCancel, onOk, prompt } = props
  // console.log('---prompt', prompt)
  const defaultBtn = (
    <span
      key='1'
      className='default'
      onClick={onCancel}
    >取消</span>
  )
  const primaryBtn = (
    <span
      key='2'
      className='primary'
      onClick={onOk}
    >确定</span>
  )
  const dangerBtn = (
    <span
      key='3'
      className='danger'
      onClick={onOk}
    >删除</span>
  )
  return (
    <div
      className='footer'
      style={{
        borderColor: (prompt ? 'transparent' : '#eee')
      }}
    >
      {
        [dangerBtn, defaultBtn]
      }
    </div>
  )
}

// 当是小弹框时的主体区域
const Prompt = props => {
  return (
    <div className='prompt'>
      <div className='tip'>
        <div className='icon'><span></span></div>
        <div className='content'>
          <div>你确定要删除吗？</div>
          <div>描述细节</div>
        </div>
      </div>
      <Footer {...props} />
    </div>
  )
}

// 组合的结果
class Modal extends PureComponent {

  constructor (props) {
    super(props)
    // 当有人要使用Modal，用代码创建一个DOM元素
    // 一会儿，用于挂载并渲染Modal弹框
    this.el = document.createElement('div')
  }

  componentDidMount () {
    document.body.appendChild(this.el)
  }

  componentWillUnmount () {
    document.body.removeChild(this.el)
  }

  render () {
    // console.log('modal props', this.props)
    const { visible, onCancel, prompt, width } = this.props
    const close = ev => {
      // 点击弹层空白处，隐藏弹框
      // console.log('ev', ev.target.dataset.self)
      if (ev.target.dataset.self) {
        (typeof onCancel === 'function') && onCancel()
      }
    }
    return ReactDOM.createPortal(
      (
        <div
          className='layer'
          style={{display:(visible?'block':'none')}}
          data-self={true}
          onClick={close}
        >
          <div
            className='modal'
            style={{
              width: (prompt ? '420px' : `${width}px`),
              marginLeft: (prompt ? '-210px' : `-${width/2}px`)
            }}
          >
            {/* props穿透 */}
            { !prompt && <Header {...this.props} /> }
            { !prompt ? <Main {...this.props} /> : <Prompt {...this.props} /> }
            { !prompt && <Footer {...this.props} /> }
          </div>
        </div>
      ), this.el
    )
  }
}
// 给组件的props设定默认值
Modal.defaultProps = {
  title: '标题',
  closable: true,
  closeIcon: 'X',
  visible: false,
  // 当prompt=true是那种小弹框（不带有Header和Footer）
  prompt: false,
  width: 520
}

Modal.propTypes = {
  title: PropTypes.node,  // ReactNode
  closable: PropTypes.bool, // boolean
  closeIcon: PropTypes.node,
  visible: PropTypes.bool,
  onCancel: PropTypes.func, // function
  onOk: PropTypes.func,
  prompt: PropTypes.bool,
  type: PropTypes.oneOf(['default','small','middle']).isRequired,
  footer: PropTypes.element,  // jsx变量
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default class extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      show: false
    }
  }

  submit () {
    (new Promise(resolve=>{
      setTimeout(()=>{
        resolve(true)
      }, 200)
    })).then(()=>{
      console.log('提交成功')
      this.setState({show: false})
    })
  }

  render () {
    const { show } = this.state
    return (
      <div>
        <h1>学习组合模式</h1>
        <button onClick={()=>this.setState({show:true})}>打开弹框</button>
        <Modal
          title='呵呵'
          closable
          closeIcon={<span>X</span>}
          visible={show}
          onCancel={()=>this.setState({show:false})}
          onOk={()=>this.submit()}
          type='default'
        >
          <div style={{color:'red'}}>some contents</div>
          <div>some contents</div>
          <div>some contents</div>
          <div>some contents</div>
        </Modal>

      </div>
    )
  }
}
