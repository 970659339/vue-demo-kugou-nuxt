// http proxy
const proxy = require('http-proxy-middleware')

module.exports = [{
  path: '/@m.kugou.com',
  handler: proxy({
    target: 'http://m.kugou.com',
    changeOrigin: true,
    pathRewrite: {
      '^/@m.kugou.com': ''
    }
  })
}, {
  path: '/@mobilecdn.kugou.com',
  handler: proxy({
    target: 'http://mobilecdn.kugou.com',
    changeOrigin: true,
    pathRewrite: {
      '^/@mobilecdn.kugou.com': ''
    }
  })
}, {
  path: '/@www.kugou.com',
  handler: proxy({
    target: 'http://www.kugou.com',
    changeOrigin: true,
    pathRewrite: {
      '^/@www.kugou.com': ''
    }
  })
}]
