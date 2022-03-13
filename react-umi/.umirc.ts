import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: { type: 'none' },

  fastRefresh: {},
  layout: {
    siderWidth: 170,
    name: '学员系统',
    logo: '/logo.png',
  },
  mfsu: {},
  webpack5: {},
  //（重启一下，public静态资源目录生效）
  favicon: '/favicon.ico',
  // 配置是否让生成的文件包含 hash 后缀，通常用于增量发布和避免浏览器加载缓存
  hash: true,
  // 配置路由模式：hash / browser
  history: { type: 'hash' },
  // 配置式路由（很少使用约定式路由）
  routes: [
    {
      path: '/',
      component: '@/pages/home/index',
      name: '首页大屏',
      icon: 'area-chart', // <AreaChartOutlined />
    },
    // 二级菜单
    {
      path: '/good',
      component: '@/layout/index',
      name: '商品管理',
      icon: 'alert', // <AlertOutlined />
      routes: [
        {
          path: 'list',
          component: '@/pages/good/List',
          name: '商品列表'
        },
        {
          path: 'form',
          component: '@/pages/good/Form',
          name: '商品新增'
        }
      ]
    }
  ],
  devServer: { port: 8080 },
  // 调接口配置代理
  proxy: {},
  // 配置dav(redux)支持immer深拷贝
  dva: { immer: true, hmr: true },

})
