import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 引入通用样式base.less文件
import './styles/base.less'
// 引入字体图标文件
import './styles/iconfont.css'
// 导入lib-flexible模块，会自动适配所有的屏幕
// 他会给每一个屏幕设置一个html的大小  会把屏幕的大小/10 = 1rem
import 'lib-flexible'

//全局注册
import HmHeader from './components/HmHeader.vue'
Vue.component('hm-header', HmHeader)
import HmLogo from './components/HmLogo.vue'
Vue.component('hm-logo', HmLogo)
import HmButton from './components/HmButton.vue'
Vue.component('hm-button', HmButton)

// 导入路由
import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
