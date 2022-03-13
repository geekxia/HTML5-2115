
// 1、拆分子store
// 做法：在redux中，所谓拆分子store，本质上就是把reducer函数拆分成多个子reducer函数。
// 合并：使用 combineReducers() 把多个子reducer函数合并成一个根reducer函数。

// 2、深拷贝方案
// 做法：一般在redux中很少使用JSON.parse/JSON.stringify来实现深拷贝，我们推荐使用immer 这个库来实现深拷贝。

// 3、在reducer中建议使用switch语句代替if语句，别忘记了break。

// 4、关于action={type,payload}，一般约定：为了避免子reducer在接收信号冲突，我们建议在设计type时，遵从 type='命名空间/功能' 格式。


// reducer是一个函数，并且要求是纯函数。
// 什么纯函数？在逻辑代码中不修改入参；相同入参总会得到相同的返回值。
// reducer只有一个作用，用于修改“只读的”store
// 如何定义reducer？它有两个参数，state是可被组件共享的数据，action是信号({type,payload})
// reducer是如何工作呢？当有action信号来时，reducer开始工作：先对state深复制、然后修改state，再返回修改后的新state.

import produce from 'immer'
// produce语法：produce(oldState, (newState)=>{ do something })
// oldState，是你需要深拷贝的那个对象（拷贝之前的那个对象）
// newState，是produce方法深拷贝成功后的那个对象，拷贝成功后你就可以任意操作了
// produce() 整个的返回值，是你对newState任意操作之后的结果

const initState = {
  count: 0,
  list: []
}
export default (state=initState, {type,payload}) => {
  // console.log('信号来了', {type,payload})
  // const newState = JSON.parse(JSON.stringify(state))
  // 收到邮件后，听话照做
  return produce(state, newState=>{
    // do something
    // 对拷贝成功的那个state进行任意操作
    // 用switch语句代替if语句
    switch (type) {
      case 'study/add':
        newState.count += payload
        break
      case 'study/sub':
        newState.count -= payload
        break
      case 'study/list':
        newState.list = payload
        break
      default:
    }
  })
}
