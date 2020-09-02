const jsdom = require('jsdom')
const { JSDOM } = jsdom
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        // const reg = /<meta name="viewport".*user-scalable=no">/gi
        // const res = route.html.match(reg)
        route.html = route.html.replace('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">', '')

        // 1. 根据字符串创建一个网页
        const html = new JSDOM(route.html)
        // 2.从创建好的网页中拿到document对象
        const dom = html.window.document
        const loadingDel = dom.querySelector('.container')
        dom.body.removeChild(loadingDel)

        route.html = html.serialize()
        return route
      }
    }
  }
}
