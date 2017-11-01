const proxyTable = require('./nuxt.config/proxy')
const head = require('./nuxt.config/head')
const css = require('./nuxt.config/css')

module.exports = {
  srcDir: 'client/',
  css: css,
  head: head,
  loading: {color: '#ff9900'},
  modules: [
    '@nuxtjs/axios'
  ],
  plugins: [
    {src: '~/plugins/index'}
  ],
  serverMiddleware: [...proxyTable],
  axios: {
    baseURL: 'http://localhost:3000'
  }
}
