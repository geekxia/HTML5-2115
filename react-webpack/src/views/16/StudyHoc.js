// 学习目标：要能够熟练地识别并使用高阶组件；如果在一些特殊场景下，还要有能力自已封装高阶组件来解决问题。

// 1、什么高阶组件？（Higher Order Component）

// - 作用：高阶组件在React中，是一种代码逻辑复用的技巧，是一种开发经验。
// - 本质上是一个纯函数，它接收一个视图组件作为入参，经过若干的修饰和处理，返回一个新的React高阶。
// - 因为高阶组件本质上是纯函数，所以我们也称之为“高阶函数”。
// - 对高阶组件(高阶函数)来讲，其入参是视图组件，这个视图组件，我们称之为“UI组件”；高阶组件具有修饰功能，所以我们也称之为“容器组件”。
// - 什么是纯函数？在函数体内不会直接修改入参；相同的入参，永远能够得到相同的返回值。
// - 结论：高阶组件 = 高阶函数 = 容器组件

// 2、如何定义高阶组件呢？

// - 语法1：const hoc1 = UI => NewUI
// - 语法2：const hoc2 = arg => (UI => NewUI)
// 【结论】：在这里 hoc1、hoc2都叫做高阶组件（容器组件），UI叫做入参（UI组件）
// 【注意】我们在封装高阶组件时，一定要记得“属性继承”，避免被容器组件修饰后props丢失。

// 3、如何使用高阶组件呢？

// - 在类组件上，有两种语法可选：一种装饰器语法，一种是直接调用hoc(UI)
// - 在函数式组件上，只能使用调用的方式 hoc(props=>())

// 4、高阶组件有哪些妙用呢？

// - 使用高阶组件给UI组件添加可复用的公共属性或方法（props）
// - 使用高阶组件，从上下文中取出数据，交给UI组件
// - 一些公共交互方法（弹框、提示框），通过高阶组件添加到UI组件上
// - 一些表单验证的方法，通过高阶组件添加到UI组件上
// - 使用高阶组件来设计管理系统的权限（比较复杂，事实上也很少用）
// - 使用高阶组件，交给UI组件添加公共的视图结构

// 5、是不是高阶组件很常用呢？

// - 你可以这样理解，高阶组件是类组件编程中的代码复用的主要解决方案；但是随着Hooks编程越来越普及，我们更倾向于封装Hooks来实现代码逻辑的复用。

import React, { PureComponent } from 'react'
import { footer, connect, auth, theme } from '@/utils/hoc'

// 【语法一】在类组件上使用高阶组件
// class StudyHoc extends PureComponent {
//   render () {
//     return <h1>学习高阶组件</h1>
//   }
// }
// export default footer(connect(()=>({}),()=>({}))(StudyHoc))


// 【语法二】在类组件上使用高阶组件
const mapState = ()=>({a:1,b:2})
const mapDispatch = ()=>({onRun: ()=>console.log('running')})

@theme
@footer
@connect(mapState, mapDispatch)
@auth('admin')
class StudyHoc extends PureComponent {
  render () {
    console.log('---props', this.props)
    return <h1>学习高阶组件</h1>
  }
}
export default StudyHoc

// 【语法三】在函数式组件上使用高阶组件（不能再用装饰器语法）
// 温馨提示：在真实工作中，也很少套这么多层高阶组件，为什么呢？因为在函数式组件成为主流后，Hooks兴起了，自定义Hooks也可以实现代码逻辑的复用，呈现的结果是：我们更偏爱Hooks编程，而逐渐减少了对高阶组件的使用。

// export default connect(
//   ()=>({a:1,b:2}),
//   ()=>({onEat:()=>console.log('eating')})
// )(
//   auth('admin')(
//     footer(
//       theme(
//         props => {
//           console.log('---props', props)
//           const { onEat } = props
//           return (
//             <>
//             <h1>学习高阶组件</h1>
//             <button onClick={onEat}>开始吃饭</button>
//             </>
//           )
//         }
//       )
//     )
//   )
// )
