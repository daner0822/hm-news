module.exports = {
  devServer: {
    open: true
  },
  // 配置px自动转rem的
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            // rem的单位， 因为使用了lib-flexible, lib-flexible会把所有的屏幕分成10份
            // 1rem 就应该配置为 设计图的  1/10   640
            remUnit: 37.5
          })
        ]
      }
    }
  },
  //按需加载
  configureWebpack: {
    externals: {
      // vue: 模块名字
      // 'Vue' 全局变量Vue
      // 告诉webpack  import Vue from 'vue'
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios',
      lodash: '_'
    }
  }
}
