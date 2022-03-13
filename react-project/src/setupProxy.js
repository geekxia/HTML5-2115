
// 文档：https://create-react-app.dev/docs/proxying-api-requests-in-development
// 这是一个node中间件，专用用于HTTP代理
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  // 代理Cnode接口
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cnodejs.org',
      changeOrigin: true,
    })
  )

  // 代理我们自己的node接口
  app.use(
    '/apix',
    createProxyMiddleware({
      target: 'http://localhost:9999',
      changeOrigin: true,
    })
  )
}
