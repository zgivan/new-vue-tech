// const docsLoader = require('./doc-loader')  // 官方文档上有，把文件添加到目录下

module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,
    cssModules: {
      loacalIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
    // hotReload: false  // 根据环境变量生成
    // 自定义模块
    // loaders: {
    //   'docs': docsLoader
    // }
    // 再config使用的loader之前。先用这里的loader进行解析
    // preLoader: {
    // },
    // 再config使用的loader之后。先用这里的loader进行解析
    // postLoader: {}
  }
}
