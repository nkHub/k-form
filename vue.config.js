const path = require('path')
const isProd = process.env.NODE_ENV === 'production'
const cdn = {
  externals: {
    "ant-design-vue": 'ant'
  },
  js: ['https://cdnjs.cloudflare.com/ajax/libs/ant-design-vue/1.7.8/antd.min.js'],
  css: []
}
module.exports = {
  devServer: {
    port: 3000,
  },
  transpileDependencies: [],
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  configureWebpack: (config) => {
    if (isProd) config.externals = cdn.externals
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'))

    if (isProd && process.env.VUE_CLI_BUILD_TARGET !== 'lib') {
      // 多入口需要设定入口
      config.plugin('html-index').tap(args => {
        args[0].cdn = cdn
        return args
      })
    }
    // 打包分析
    if (process.env.use_analyzer) {
      config.plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
}
