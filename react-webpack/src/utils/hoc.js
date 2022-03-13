import React, { PureComponent } from 'react'
import { Consumer } from './theme'


// const footer = WrappedComponent => {
//   return class extends PureComponent {
//     render () {
//       return (
//         <WrappedComponent />
//       )
//     }
//   }
// }

const footer = C => props => (
  <>
    <C
      {...props}
      x='ff'
      y={[1,2,3]}
      z={<span />}
      msg='footer'
      url='http://baidu.com'
    />
    <footer style={{
      lineHeight:'100px',
      textAlign:'center'
    }}>
      这是网站的底部
    </footer>
  </>
)

const connect = (fn1, fn2) => C => props => {
  let p1 = {}
  let p2 = {}
  if (typeof fn1 === 'function') p1=fn1()
  if (typeof fn2 === 'function') p2=fn2()
  const fetch = () => console.log('埋点方法')
  return (
    <C
      {...props}
      {...p1}
      {...p2}
      msg='connect'
      onFetch={fetch}
    />
  )
}

const NotAuth = () => (
  <>
    <h2>你没有权限访问，请联系管理员</h2>
    <button>回到首页</button>
  </>
)

const auth = role => W => {
  const roleArr = ['admin', 'editor']
  const hasAuth = roleArr.includes(role)
  return props => (
    hasAuth ? <W {...props} /> : <NotAuth />
  )
}

const theme = W => props => (
  <Consumer>
  {
    ctx => (
      <div style={{...ctx}}>
        <W {...props} />
      </div>
    )
  }
  </Consumer>
)

export {
  footer,
  connect,
  auth,
  theme
}
