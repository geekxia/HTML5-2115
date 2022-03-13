// 当前组件是函数式组件，我们有两种办法使用store数据
// 1、使用react-redux提供的connect高阶组件（也得会）
// 2、使用react-redux提供的Hooks API（这是主流）

import { connect } from 'react-redux'
// connect高阶组件语法：connect(mapStateToProps, mapDispatchToProps)(UI)

// - mapStateToProps是一个函数参数，它的形参是store的state。作用是把store的数据映射到当前组件的props上。
// - mapDispatchToProps也是一个函数参数，它的形参是dispatch方法。作用是把dispatch派发信号的逻辑封装成方法，放在当前组件的props上。

const mapStateToProps = (state) => {
  // do something
  return {
    count: state.study.count
  }
}

const mapDispatchToProps = (dispatch) => {
  // do something
  return {
    add () {
      dispatch({ type:'study/add', payload:5 })
    },
    sub: () => dispatch({ type:'study/sub', payload:10 })
  }
}

export default connect(
  state => ({
    count: state.study.count
  }),
  dispatch => ({
    add (payload) {
      dispatch({ type:'study/add', payload })
    },
    sub: payload => dispatch({ type:'study/sub', payload })
  })
)(
  props => {
    console.log('----props', props)
    const { count, add, sub } = props
     return (
       <div style={{textAlign:'center'}}>
         <h1>学习Redux</h1>
         <h1>{ count }</h1>
         <button onClick={()=>add(2)}>自增</button>
         <button onClick={()=>sub(20)}>自减</button>
      </div>
    )
  }
)
