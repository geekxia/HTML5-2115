
import { HashRouter, Route, Switch  } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import System from '@/system'
import store from '@/store'
import zhCN from 'antd/lib/locale/zh_CN'

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        {/* 在react-redux这个上下文组件，只能使用store属性注入数据 */}
        <Provider store={store}>
          <System />
        </Provider>
      </HashRouter>
    </ConfigProvider>
  )
}

export default App
