import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'

import logo from '@/assets/logo.png'
import routes from '@/views'

const { SubMenu } = Menu

const Logo = ({ value }) => {
  const size = value ? '30px' : '60px'
  return (
    <div className='logo'>
      <img
        src={logo}
        alt="qf"
        style={{
          width: size,
          height: size
        }}
      />
    </div>
  )
}

const Toggle = props => {
  const { value, onChange } = props
  return (
    <div className='toggle' onClick={onChange}>
      { value ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
    </div>
  )
}

// 如何解决页面刷新Menu样式丢失的问题？
// 参考连接：https://zhuanlan.zhihu.com/p/474384399

export default (props) => {

  return (
    <div className="qf-sider">
      <Logo {...props} />
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
      {
        routes.map(e1=>(
          <SubMenu key={e1.id} icon={e1.icon} title={e1.title}>
          {
            e1.children.map(e2=>(
              !e2.notMenu &&
              <Menu.Item key={e2.id}>
                <Link to={e2.path}>{ e2.title }</Link>
              </Menu.Item>
            ))
          }
          </SubMenu>
        ))
      }
      </Menu>
      <Toggle {...props} />
    </div>
  )
}
