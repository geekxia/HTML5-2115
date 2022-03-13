// 学习目标：深入学习JSX，非常熟练地使用JSX语法。

// 1、什么是JSX？它是React官方开源的一种JS语法糖（JavaScript XML），作用是方便我们编写React组件的视图结构。JSX要通过@babel/preset-react进行编译，才能得到浏览器支持的React代码。在React开发中，JSX不是必须的，但几乎是必用的，为什么呢？因为JSX语法特别爽。

// 2、不使用JSX，你必须使用React.createElement()来创建React视图（React元素），但这写起来很麻烦。为了更优雅地编写视图，官方推荐使用JSX语法。

// const sp = React.createElement('span', {title:'sp'}, 'Hello 2115')
// const h11 = React.createElement('h2', {id:'box',key:'1'}, sp)
// const h22 = React.createElement('h2', {key:'2'}, 'Hello 2116')
// const view = React.createElement('h1', {title:'qf'}, [h11, h22])

// 3、组件与元素。什么是组件？那些继承自Component的类，就是我们所说的React组件，所有组件的命名，其首字母必须大写。什么是元素？被实例化的React组件就是元素（React元素），即React.createElement()的返回值，或者JSX节点，就是React元素。

// 4、表达式。当我们要在JSX中使用变量时，要用 {} 包起来。那些被 {} 包起来的东西，我们称之为“表达式”。这个 {} 不是Vue中的文本插值，它就是JSX的一种语法，专门用于包裹表达式的。所以，在 {} 不要编写 JS语句。

// 5、JSX（React元素），是变量，是对象。还要特别强调，JSX还是“不可变对象”。怎么理解“JSX是不可变对象”，意思是JSX变量是只读的，不能手动修改。这是为什么呢？因为JSX代表的是视图结构（最终会渲染成真实的DOM结构），所以你不能直接操作JSX（这会“损伤”DOM的渲染），官方推荐使用“声明式”的方式来操作JSX。

// 6、JSX属性，在JSX元素上使用props。有三个新增属性：key、ref、dangerouslySetInnerHTML。还有三个发生了变化的属性：className、tabIndex、htmlFor。除上述三个新增的，还有三个变化的属性外，你们在HTML5学习的那些HTML属性都可以使用。

// - 动态className：你永远记住，className的值只要是合法的类名字符串即可。
// - 动态style：其语法只能是这样，<div style={ {css属性名:'css属性值'} } />，其中css属性名如果有多个单词组件，要用小驼峰命名法（即首字母小写，后面的单词首字母大写）。

// 7、自定义属性props。当我们自定义封装React时，还可以自定义属性，即props。在React中，props非常重要的。怎么理解props？它是父组件传递给子组件的数据。父组件能够向子组件传递哪些类型的数据呢？通常传递：字符串、数值、数组、对象、undefined、布尔值、null、函数、JSX等。

// - 当父组件向子组件传递函数时，我们约定：这个属性名必须以'on'开头，比如像这样 onHandle={ fn } 。
// - 当父组件向子组件传递布尔值时，如果为真，可以省略值，比如 <Child disabled /> 。
// - 在props上有一个非常特别的属性，是'props.children'，它代表的是当前组件内部所嵌套的JSX节点们。
// - 在JSX中，渲染 undefined、null、布尔值这三种数据，是看不见效果的。

// 8、ReactElement（元素）和 ReactNode（节点）：前者包括JSX元素、undefined、null；后者包括JSX元素、字符串、数值、undefined、null。

// 9、在自定义封装的组件中，除了可以嵌套JSX元素外，还要嵌套一个渲染函数。在自定义组件中，使用props.children可以访问它们。

// 10、在JSX中，默认是支持对数组的直接渲染的。需要注意的是，如果数组中有JSX元素，要加Key。


import React, { Component } from 'react'
import logo from '@/assets/logo.png'
import {
  withRouter,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch
} from 'react-router-dom'

// 这个一个函数式组件，既然是组件，所以也要返回视图结构（JSX）
const PeiXuan = withRouter(
  (props) => {
    console.log('peixuan props', props)
    const { age, title, children, xx, yy, zz } = props
    return (
      <>
        <div>培玄</div>
        <div>{ age }</div>
        { title }
        { children }
        { xx } { yy } { zz }
      </>
    )
  }
)

const YingHai = props => {
  console.log('yinghai props', props)

  const history = useHistory()
  const location = useLocation()
  const params = useParams()
  const match = useRouteMatch('/jsx')
  console.log('使用Hooks路由', history, location, params, match)

  const { children } = props
  // console.log('children type', typeof children)
  let result = null
  if (typeof children === 'function') {
    result = children()
  } else {
    result = children
  }
  return result
}


// 封装一个React组件，继承自Component，得到父类的若干特性
// 作为一个组件最重要的是什么？视图结构。当组件被实例化时，render()调用返回视图结构。如何定义视图结构？要么使用JSX，要么不使用JSX。
class StudyJSX extends Component {
  render () {
    // do something

    console.log('study jsx props', this.props)

    const sp2 = <span title='sp'>Hello 2115</span>
    // const sp2 = React.createElement('span',{title:'sp'},'Hello 2117')

    const qf = 'qf'
    const tt = '刘放林'
    const ss = {
      background:'red',
      height: '40px',
      borderBottom: '2px solid #ccc',
      zIndex: 100
    }
    const fn = ()=>console.log('handle')

    const getFooter = text => (
      <>
        <hr/>
        <footer style={{padding:'20px'}}>{ text }</footer>
        <hr/>
      </>
    )

    // 点语法调用组件
    const Qf = {
      Button: props => (<button>{ props.text }</button>),
      Image: props => {
        return (
          <div style={{width:'150px',height:'150px',overflow:'hidden'}}>
            <img src={props.src} />
          </div>
        )
      }
    }

    const px = {
      aa: null,
      bb: undefined,
      cc: false,
      dd: 100,
      ee: [4,5,6],
      onFn: ()=>console.log('ff')
    }

    const items = [
      100,
      <div key='1'>你好</div>,
      'HelloWorld',
      true,
      undefined,
      null,
      <h3 key='2'>你不好</h3>
    ]

    const grid = num => {
      let result = []
      for (let i=0; i<num; i++) {
        let row = []
        for (let j=0; j<num; j++) {
          row.push(<span key={Math.random()} />)
        }
        result.push(<div className='row' key={Math.random()}>{ row }</div>)
      }
      return result
    }

    return (
      <div title={ tt }>
        <h2 id='box' className={ `${qf}2 bg` }>{ sp2 }</h2>
        <hr/>
        <div style={ ss }/>
        <div style={{padding:'10px'}}>动态内联样式</div>
        <h2>Hello 2116</h2>
        <hr/>

        {/*
          在JSX中写注释：使用培玄组件；
          { ...px } 是属性展开语法。
        */}
        <PeiXuan
          age={ 20 }
          mobile='120'
          xx={ null }
          yy={ undefined }
          list={ [1,2,3] }
          info={ {a:1, b: 2} }
          zz={ false }
          checked
          onHandle={ fn }
          title={ <header>头部</header> }
          { ...px }
        >
          <div>这是培玄的大儿子</div>
          <div>这是培玄的二儿子</div>
          <div>这是培玄的小儿子</div>
        </PeiXuan>

        { getFooter('网站底部') }
        <hr/>

        <Qf.Button text='点击' />
        <Qf.Image src={ logo } />
        <hr/>

        <YingHai>
        { ()=>(<h1>莹海同学1</h1>) }
        </YingHai>
        <hr/>

        <YingHai>
          <h1>莹海同学2</h1>
        </YingHai>
        <hr/>

        <div>{ items }</div>
        <hr/>

        { grid(5) }
        <hr/>
      </div>
    )
  }
}

export default StudyJSX
