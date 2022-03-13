import { useEffect } from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Layout, Login } from '@/components'

export default () => {
  // 拿到路由API
  const history = useHistory()
  const { pathname } = useLocation()
  // 拿到状态管理中的token
  const { token } = useSelector(state=>state.user)

  // 这个副作用，只需要在登录流程中执行。
  // 如果已经登录过，当刷新系统内部时，不要执行这个副作用。
  useEffect(()=>{
    if (pathname==='/login' && token) {
      history.replace('/')
    }
  }, [token])

  // 如果已经登录过，不能再访问登录页
  useEffect(()=>{
    if (token) {
      const url = (pathname==='/login' || pathname==='/') ? '/good/list' : pathname
      history.replace(url)
    } else {
      history.replace('/login')
    }
  }, [pathname])

  return (
    <Switch>
      <Route path='/login' component={Login} />
      {/* 这个 / 可以和任意url匹配 */}
      <Route path='/' component={Layout} />
    </Switch>
  )
}
