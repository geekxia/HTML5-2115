// 学习目标：熟练掌握Hooks编程范式；深入理解Hooks API规范用法；能够自定义封装Hooks实现代码逻辑的复用；能够正确地使用别人封装的Hooks或第三方库中的Hooks。

// 1、什么Hooks？

// - 我们都知道函数式组件中没有this、没有生命周期、没有上下文、没有state、没有ref，但是函数式组件的运行性能相对较好，并且函数式组件语法简洁。自React(v16.8)后，官方发布了系列Hooks API，帮助我们在函数式组件模拟类组件的若干特性。

// - 官方提供的常用Hooks：useState、useEffect、useContext、useMemo、useCallback、useRef、useReducer、useLayoutEffect。

// 2、浅谈对Hooks的理解

// - Hooks只是在函数式组件中“模拟”类组件中的若干特性，它不等于类组件的特性。
// - Hooks定义的数据或功能，都保存在React底层，不在当前函数式组件的作用域中。
// - Hooks的每一个API，在使用时都必须严格遵守其运行特点，并且这些API都只能在函数式组件的顶层作用域作用。
// - Hooks只有在函数式组件中使用，不能在类组件中作用。

// 3、useState()

// - 语法：const [state, setState] = useState(初始值)
// - 作用：像类组件一样，定义一个声明式变量（保存在React底层），这种声明式变量的特点和类组件中的state一样。
// - 特点：当我们使用setState方法修改state时，这会触发当前整个函数式组件重新运行。
// - 详解：setState在合成事件中是异步的（在非合成事件中，仍然是同步的），因为这会触发函数式组件重新执行（即render阶段），要重新返回新JSX（异步地生成Fiber树）。虽然setState是异步的，但它没有第二个callback。
// - 为什么定义state时，要用const关键字和数组解构语法呢？const不存在变量提升，并且不允许我们直接修改变量；数组解构语法更灵活，不需要关注key名是什么。

// 4、useEffect()

// - 标准语法：useEffect(()=>{ return ()=>{}}, [依赖列表])
// - 便于记忆的写法：useEffect(function fn1() { return fn2}, [依赖列表])

// - 用自己的话描述useEffect的三种运行机制：
  // - 当useEffect没有第二个参数时：初始化，fn1先执行、fn2不执行；当有人setState时，fn2先执行、再执行fn1。
  // - 当useEffect的第二个参数是空数组时：初始化，fn1先执行、fn2不执行；当有人setState时，fn1和fn2都不执行。
  // - 当useEffect第二个参数有依赖时：初始化，fn1先执行、fn2不执行；当有人setState改变依赖数组中的声明式变量时，fn2先执行、fn1再执行。

// - 总结：无论上述三种情况，fn2都少执行了一次。当路由切换、真正销毁当前函数式组件时执行最后一次fn2。

// - useEffect的使用原则：
  // - useEffect是专门用于执行副作用的。什么副作用？在React中，比如DOM操作、BOM操作、调接口、定时器、长连接等等，都是副作用。用useEffect把副作用包裹起来，我们可以更好地控制这些浪费性能的副作用、按照我们希望的方式去运行。
  // - 意识：当我们在函数式组件中想执行一些副作用（功能）时，都要用useEffect包起来。
  // - 在一个函数式组件中，可以同时使用多个useEffect()。当我们在使用useEffect时，建议一个useEffect只执行一个副作用。
  // - 在使用useEffect时，如果fn2中没有什么需要做的，我们可以省略掉fn2（不 return fn2）。
  // - 在使用useEffect时，是否需要添加第二参数、如何设计第二个参数，是非常有技巧的。

// - useLayoutEffect()
  // - 它会比useEffect()更早执行，当layout布局结构(DOM结构已生成)就执行。
  // - 它的语法和useEffect()语法一样，只是执行时机更早一些。

// 5、useContext()

// - 语法：const ctx = useContext(上下文对象)
// - 作用：在函数式组件访问上下文数据。
// - 注意：useContext()中的参数，必须是上下文对象，不能是Provider或Consumer。

// 6、useMemo()

// - 语法：const state = useMemo(computedFn, [依赖数组])
// - 解释：computedFn是一个用于计算的函数，它得返回一个具体的值，这个值就是state；依赖数组的特点和useEffect的依赖数组，功能是一致的。
// - 作用：相当于vue中的计算属性。当我们一个运算比较复杂或耗费性能时，我们要用useMemo()来优化计算性能。
// - 特点：初始化时，computedFn第一次执行，把返回值赋值给state；当依赖数组中的声明变量发生变化时，computedFn将重新执行，返回新的值、再次赋值给state，这还会触发当前函数式组件重新渲染。
// - 注意：useMemo()的第二个参数，一般必须得有；如果没有第二个参数，那么这个useMemo将无法达到性能的作用，这就没有意义了。

// 7、useCallback()

// - 语法：const fn2 = useCallback(fn1, [依赖数组])
// - 解释：fn1是一个函数，用于赋值给fn2；当依赖数组中的声明式变量发生变化时，把最新的fn1赋值给fn2。
// - 注意：一般useCallback()的第二个参数都是空数组；如果fn1作用域用到了声明式变量或计算属性，根据业务需求可以添加上具体的依赖数组。
// - 提醒：事实上，useCallback很少用，但是你得知识。

// 8、useRef()

// - 语法：const rr = useRef(初始值)
// - 作用：用于快速访问DOM对象、React组件实例、缓存一个变量的引用。
// - 用法：我们使用 rr.current 可以访问那些被引用的变量（DOM对象、组件实例、变量的引用）

// 9、自定义Hooks

// - 使用React官方提供的Hooks或者第三方Hooks库，来封装可以复用代码逻辑的功能。
// - 解释：自定义Hooks是一种比较好用的一种逻辑复用技巧。（高阶组件也是一种逻辑复用，但是相对自定义Hooks，使用得越来越少了）

// - 自定义Hooks，本质上也就是函数，但函数名必须以 use* 开头。
// - 当我们在同一个函数组件作用域中，复用同一个Hooks时，彼此是相对独立的。
// - 自定义Hooks，也是只能函数式组件顶层作用域中使用。

// 10、使用第三方Hooks库

// - 工作中尽可能不要重复造轮子，在React开发中，我们极力推荐这两个Hooks库。
// - react-use：https://github.com/streamich/react-use
// - ahooks：https://ahooks.js.org/

import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback, useRef } from 'react'
import { useTheme, useLang, useTitle } from '@/hooks'
import { useFullscreen, useToggle } from 'react-use'

// 慢慢会发现：有了Hooks以后，props的使用场景越来越少。
const TodoList = () => {
  const [task, setTask] = useState('')
  const [list, setList] = useState([])

  const change = ev => setTask(ev.target.value)
  const confirm = ev => {
    if (ev.keyCode === 13) {
      console.log('添加任务', task)
      setList([...list, {id:Date.now(),task}])
      setTask('')
    }
  }
  const remove = row => {
    const newList = list.filter(ele=>ele.id!==row.id)
    setList(newList)
  }
  return (
    <div>
      TodoList：
      <input type="text" value={task} onChange={change} onKeyUp={confirm} />
      <br/>
      {
        list.map((ele,idx)=>(
          <div key={ele.id} style={{lineHeight:'40px',textAlign:'center'}}>
            { idx } - { ele.task }
            <span
              style={{padding:'0 10px',cursor:'pointer'}}
              onClick={()=>remove(ele)}>
              删除
            </span>
          </div>
        ))
      }
    </div>
  )
}

// 在这里学习了useState、useEffect
const Counter = () => {
  console.log('----start')

  const [count, setCount] = useState(0)


  const change = () => {
    console.log('----1', count)
    setCount(count+1)
    console.log('----2', count)
  }

  useEffect(()=>{
    document.title = '高薪就业'
    console.log('---title')
  }, [])

  // 演示标准语法
  useEffect(()=>{
    // 相当于类组件中的componentDidMount()
    // fn1 = componentDidMount
    // do something
    // 所以在这里，可以DOM操作、调接口、开定时器等（副作用）
    console.log('---effect fn1')
    return () => {
      // 相当于类组件中的componentWillUnmount()
      // fn2 = componentWillUnmount
      // do something
      // 所以在这里，可以关闭定时器、清除缓存等（性能优化）
      console.log('---effect fn2')
    }
  }, [])
  // [依赖数组] 相当于类组件中的componentDidUpdate()，这怎么理解呢？
  // 当依赖数组中的声明式变量更新完成时，触发当前useEffect再执行
  // this.setState({count},callback) 这个callback一般会用componentDidUpdate代替
  // 在componentDidUpdate中设置各种不同条件，这将导致当前组件不同的运行机制


  useLayoutEffect(()=>{
    console.log('---layout effect')
  }, [])

  console.log('----end')

  return (
    <>
      <h1>{ count }</h1>
      <button onClick={change}>自增</button>
    </>
  )
}

// 函数式组件
export default props => {
  const theme = useTheme()
  const { msg, tip } = useLang()
  useTitle()

  const rr = useRef(null)  // dom.current
  const [num, setNum] = useState(100)


  const ref = useRef(null)
  // const [show, toggleShow] = useToggle(false)
  const [full, setFull] = useState(false)
  useFullscreen(ref, full, {onClose: () => setFull(false)})

  // 想象成，这是一个非常复杂或耗费性能的计算
  const result = useMemo(()=>{
    // do something
    console.log('----发生计算')

    return num * 100 / 15 + 34.9
  }, [num])
  console.log('---重新执行了')

  const renderResult = useCallback(
    () => {
      return <h1>{ result }</h1>
    },
    [num]
  )

  useEffect(()=>{
    rr.current.style.color = 'red'
  }, [])

  return (
    <div ref={ref} style={{textAlign:'center', ...theme}}>
      <h1>学习Hooks API</h1>
      <h1>{ tip }</h1>
      <h1>{ msg }</h1>
      <hr/>
      <h1 ref={rr}>{ result }</h1>
      { renderResult() }
      <button onClick={()=>setNum(num+1)}>变化</button>
      <hr/>
      <button onClick={()=>setFull(true)}>全屏</button>
    </div>
  )
}
