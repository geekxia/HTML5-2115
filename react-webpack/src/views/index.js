import React from 'react'

// 这个loadable相当于React.lazy()和<Suspense>的结合体
// <Suspense>，是React的一个内置组件，专门用于制作loading交互效果的
// 用loadable好处，是兼容性更优，也是React所推荐的。
import loadable from '@loadable/component'

// 自定义封装一个用于加载页面的交互提示
const Loading = () => (
  <div style={{textAlign:'center',fontSize:'30px'}}>loading...</div>
)

// 使用动态导入语法，让Webpack知道，我们分割代码
const StudyJSX = loadable(()=>import('./12/StudyJSX'), {
  fallback: <Loading />
})

const StudyRender = loadable(()=>import('./12/StudyRender'), {
  fallback: <Loading />
})

const StudyHooks = loadable(()=>import('./16/StudyHooks'), {
  fallback: <Loading />
})

const StudyMobx = loadable(()=>import('./16/StudyMobx'), {
  fallback: <Loading />
})

import StudyEvent from './12/StudyEvent'
import StudyState from './12/StudyState'
import StudyLife from './12/StudyLife'
import StudyList from './12/StudyList'
import StudyForm from './12/StudyForm'
import StudyLift from './14/StudyLift'
import StudyCombine from './14/StudyCombine'
import StudyContext from './16/StudyContext'
import StudyHoc from './16/StudyHoc'

// 在React路由设计，如何构造这个routes非常有讲究
export default [
  {
    id: 10,
    text: '学习JSX',
    path: '/jsx',
    component: StudyJSX
  },
  {
    id: 11,
    text: '渲染流程',
    path: '/render',
    component: StudyRender
  },
  {
    id: 21,
    text: 'Hooks',
    path: '/hooks',
    component: StudyHooks
  },
  {
    id: 22,
    text: 'Mobx',
    path: '/mobx',
    component: StudyMobx
  }
]
