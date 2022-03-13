import { Switch, Route, Redirect } from 'react-router-dom'
import routes from '@/views'

export default () => {

  const renderRoutes = () => {
    let result = []
    routes.map(e1=>{
      if (e1.children) {
        e1.children.map(e2=>{
          result.push(
            <Route
              key={e2.id}
              path={e2.path}
              component={e2.component}
            />
          )
        })
      }
    })
    return result
  }

  return (
    <div className="qf-content">
      <Switch>
        { renderRoutes() }
        <Redirect from='/*' to='/good/list' />
      </Switch>
    </div>
  )
}
