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

// axios的优化
// axios和vue没有关系，强行让axios和Vue有关系
// 把axios绑定到了vue的原型上，所有的vue实例（组件）都可以通过 this.axios访问到axios
import axios from 'axios'
Vue.prototype.$axios = axios
// 给axios配置默认的基础路径,axios在发请求的时候，把url的路径自动拼接上baseURL
axios.defaults.baseURL = 'http://localhost:3000'

//---------------vant-ui------------------------
//全局注册vant 缺点:大部分中组件用不到,最终项目打包就会变得比较大。
// import Vant from 'vant'
// import 'vant/lib/index.css'
// // 使用vant插件
// Vue.use(Vant)

//按需加载按钮(推荐)
import { Button } from 'vant'
Vue.use(Button)
//按需加载toast
import { Toast } from 'vant'
Vue.use(Toast)

//--------------------------------------------

//全局注册
import HmHeader from './components/HmHeader.vue'
Vue.component('hm-header', HmHeader)
import HmLogo from './components/HmLogo.vue'
Vue.component('hm-logo', HmLogo)
import HmButton from './components/HmButton.vue'
Vue.component('hm-button', HmButton)
import HmInput from './components/HmInput.vue'
Vue.component('hm-input', HmInput)
// 导入路由
import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
