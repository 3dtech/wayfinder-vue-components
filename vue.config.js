const path = require('path');

module.exports = {
    chainWebpack: config => {
      config.module
      .rule('wfjs')
      .test(/\.js$/)
      .include
      .add(path.resolve(__dirname, 'node_modules', '@3dwayfinder', 'sdk', '2d'))
      .end()
      .use('raw-loader')
      .loader("raw-loader")
      .tap(options => {
        // modify the options...
        console.log('tap', options)
        return options
      })
    }
  }