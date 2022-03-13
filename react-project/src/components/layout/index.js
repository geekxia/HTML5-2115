import { useState } from 'react'
import { Layout } from 'antd'

import QfHeader from './QfHeader'
import QfSider from './QfSider'
import QfContent from './QfContent'

import './style.scss'

const { Header, Sider, Content } = Layout

export default () => {

  const [collapsed, setCollapsed] = useState(true)

  return (
    <Layout>
      <Sider
        width='160'
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <QfSider
          value={collapsed}
          onChange={()=>setCollapsed(!collapsed)}
        />
      </Sider>
      <Layout>
        <Header>
          <QfHeader />
        </Header>
        <Content>
          <QfContent />
        </Content>
      </Layout>
    </Layout>
  )
}
