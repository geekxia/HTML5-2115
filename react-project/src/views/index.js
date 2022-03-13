
import loadable from "@loadable/component"

import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodForm = loadable(()=>import('./good/GoodForm'))
const StudyRedux = loadable(()=>import('./study/StudyRedux3'))

// 对同一个系统来讲，它的角色数量是一定的。比如，我们这个系统只有这三种角色：admin(系统管理员)、editor(文员)、shop(商家管理员)。
const routes = [
  {
    id: 10,
    title: '商品管理',
    icon: <PieChartOutlined />,
    children: [
      { id:1001, title:'商品列表', path:'/good/list', component:GoodList },
      { id:1002, title:'商品新增', path:'/good/add', component:GoodForm },
      { id:1003, title:'商品编辑', path:'/good/edit/:id', component:GoodForm, notMenu: true }
    ],
    roles: ['editor']
  },
  {
    id: 11,
    title: '状态管理',
    icon: <DesktopOutlined />,
    children: [
      { id:1101, title:'学习Redux', path:'/redux1', component:StudyRedux },
    ],
    roles: ['admin']
  }
]

export default routes
