import React, { useState, useEffect, useCallback, useMemo } from 'react'

// 这是mobx-react提供的两个高阶组件
// inject('子store的命名空间')(UI) 用于把上下文中的store数据注入到当前组件的props上
// obsever(UI) 用于把当前组件变成“观察者”，每当store数据发生变化时，当前组件自动更新
// 注意：这两个高阶组件要配合使用，先observer再inject（先做人再做事）
// 写法：inject('count')(observer(StudyMobx))

import { inject, observer } from 'mobx-react'

// 在类组件中，使用mobx-react
// @inject('count')
// @observer
// class Test extends React.PureComponent {
//   render () {
//     const { count } = this.props
//     return (
//       <div>
//         <h1>学习Mobx</h1>
//         <h1>{ count.num }</h1>
//         <button onClick={()=>count.sub()}>自减</button>
//         <button onClick={()=>count.add()}>自增</button>
//       </div>
//     )
//   }
// }
// export default Test

// 封装的目的，除了复用外，还有利于代码维护！
const Pagination = (props) => {
  const { value, onChange } = props

  const pageArr = useMemo(()=>{
    return (value>3) ? [value-2, value-1, value, value+1, value+2] : [1,2,3,4,5]
  }, [value])

  return (
    <div className='pages'>
      <span onClick={()=>onChange(1)}>{'<<'}</span>
      { value > 3 && <span>{'...'}</span> }
      {
        pageArr.map(ele=>(
          <span
            key={ele}
            className={value===ele?'on':''}
            onClick={()=>onChange(ele)}
          >
            {ele}
          </span>
        ))
      }
      <span>{'...'}</span>
      <span onClick={()=>onChange(value+1)}>{'>>'}</span>
    </div>
  )
}

export default inject('count','cnode')(
  observer(
    props => {
      console.log('---study mobx props', props)
      const { count, cnode } = props

      const [page, setPage] = useState(1)

      useEffect(()=>{
        cnode.getList({ limit:5, page })
      }, [page])

      const renderList = useCallback(()=>{
        return cnode.list.map(ele=>(
          <div key={ele.id}>{ ele.title }</div>
        ))
      }, [cnode.list])

      return (
        <div>
          <h1>学习Mobx</h1>
          <h1>{ count.num }</h1>
          <button onClick={()=>count.sub()}>自减</button>
          <button onClick={()=>count.add()}>自增</button>
          <hr/>
          { renderList() }
          <Pagination value={page} onChange={page=>setPage(page)} />
        </div>
      )
    }
  )
)
