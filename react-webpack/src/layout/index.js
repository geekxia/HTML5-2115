import React, { useState, useCallback } from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

import { Provider } from '@/utils/theme'
// import { ToggleTheme } from '@/components'
import routes from '@/views'
import './style.scss'

export default () => {
  const [theme, setTheme] = useState({color:'#000000',background:'#ffffff'})

  const renderNavs = useCallback(()=>{
    return routes.map(ele=>(
      <NavLink
        key={ele.id}
        to={ele.path}
        activeClassName='on'>
        { ele.text }
      </NavLink>
    ))
  }, [])

  const renderRoutes = useCallback(()=>{
    return routes.map(ele=>(
      <Route key={ele.id} path={ele.path} component={ele.component} />
    ))
  }, [])

  return (
    <Provider value={theme}>
      <div className='navs'>
        <div>
          {/* 菜单 <router-link/> */}
          { renderNavs() }
        </div>
      </div>

      <div className='routes'>
        {/* 路由规则 <router-view/> */}
        <Switch>
          { renderRoutes() }
          {/* 重定向规则，一般写在路由规则的最后面 */}
          {/* 这个 to 属性必须指定一个已经定义的路由 */}
          <Redirect from='/*' to='/jsx' />
        </Switch>
      </div>
    </Provider>
  )
}
