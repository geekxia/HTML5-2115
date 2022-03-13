// 当前组件是函数式组件，我们有两种办法使用store数据
// 1、使用react-redux提供的connect高阶组件（也得会）
// 2、使用react-redux提供的Hooks API（这是主流）

import { useSelector, useDispatch } from 'react-redux'
// - useSelector 用于访问store中的数据
// - useDispatch  用于得到dispatch方法，dispatch方法可以向store派发一个action信号

export default props => {

  // console.log('study redux 1 ---props', props)
  const count = useSelector(state=>state.study.count)
  // console.log('store state count', count)

  const dispatch = useDispatch()

  const add = () => {
    // 需求是自增。但count在store中，我们又不能直接修改count。
    // 我们已经知识，只有reducer才能修改count，并且reducer可以接收信号。
    // 思路：在组件中，使用dispatch方法，向store/reducer发一个自增信号。
    const action = { type:'study/add', payload:5 }
    // 你可把action想象成一封邮件，type是邮件标题，payload是邮件内容
    dispatch(action)
  }

  const sub = () => {
    dispatch({ type:'study/sub', payload:10 })
  }

  return (
    <div style={{textAlign:'center'}}>
      <h1>学习Redux</h1>
      <h1>{ count }</h1>
      <button onClick={add}>自增</button>
      <button onClick={sub}>自减</button>
    </div>
  )
}
