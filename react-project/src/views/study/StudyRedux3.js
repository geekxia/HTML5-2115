// 当前组件是类组件，我们有两种办法使用store数据
// - 只能使用react-redux提供的connect高阶组件，不能使用Hooks

import React from 'react'
import { connect } from 'react-redux'
import { getList, addCount, subCount } from '@/store/actions'
// connect高阶组件语法：connect(mapStateToProps, mapDispatchToProps)(UI)

// - mapStateToProps是一个函数参数，它的形参是store的state。作用是把store的数据映射到当前组件的props上。
// - mapDispatchToProps也是一个函数参数，它的形参是dispatch方法。作用是把dispatch派发信号的逻辑封装成方法，放在当前组件的props上。

const mapStateToProps = state => ({
  count: state.study.count,
  list: state.study.list
})

const mapDispatchToProps = dispatch => ({
  add (payload) {
    dispatch(addCount(payload))
  },
  sub: payload => dispatch(subCount(payload)),
  init: params => {
    // 在这里，dispatch派发是一个函数，不再是{type,payload}
    // 这个函数将被派发到store中去，redux-thunk会就拦截，如果是函数就调用它，并传递给它一个dispatch参数。
    dispatch(getList(params))
  }
})

// 要想使用装饰器语法，得安装支持装饰器语法的babel插件
@connect(mapStateToProps, mapDispatchToProps)
class StudyRedux extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  componentDidMount () {
    // 在这里直接调接口，行不行？肯定行。
    // 但是，我们想学习redux走流程。
    const { init } = this.props
    init({page:1,limit:5})
  }

  nextPage () {
    // 当点击下一页时，让page自增，自增完成后再调接口
    this.setState(state=>({page:state.page+1}))
  }

  componentDidUpdate (props, state) {
    // 这个生命周期，永远设置条件：只有当page变化时才调接口
    if (state.page !== this.state.page) {
      this.props.init({page:this.state.page,limit:5})
    }
  }

  render () {
    const { count, add, sub, list } = this.props

    return (
      <div style={{textAlign:'center'}}>
        <h1>学习Redux</h1>
        <h1>{ count }</h1>
        <button onClick={()=>add(2)}>自增</button>
        <button onClick={()=>sub(20)}>自减</button>
        <hr/>
        <div>
        { list.map(ele=>(
          <div key={ele.id}>{ ele.title }</div>
        ))}
        </div>
        <button onClick={()=>this.nextPage()}>下一页</button>
     </div>
    )
  }
}

export default StudyRedux
