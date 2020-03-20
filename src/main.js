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

//---------------vant-ui------------------------
//全局注册vant 缺点:大部分中组件用不到,最终项目打包就会变得比较大。
// import Vant from 'vant'
// import 'vant/lib/index.css'
// // 使用vant插件
// Vue.use(Vant)

//按需加载按钮(推荐)
import {
  Button,
  Toast,
  Dialog,
  field,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Uploader
} from 'vant'
Vue.use(Button)
Vue.use(Toast)
//弹出确认框
Vue.use(Dialog)
//输入框
Vue.use(field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
//---------------axios的优化-------------------
// axios和vue没有关系，强行让axios和Vue有关系
import axios from 'axios'
// 给axios配置默认的基础路径,axios在发请求的时候，把url的路径自动拼接上baseURL
axios.defaults.baseURL = 'http://localhost:3000'
// 配置axios的响应拦截器,所有的axios会先经过拦截器,,可以对响应做一些统一的处理
axios.interceptors.response.use(function(res) {
  // console.log('拦截到res', res)
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 说明token是验证失败的
    //跳转到登录页
    router.push('/login')
    //删除无效的token信息
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    //提示验证失败
    Toast.fail(message)
  }
  return res
})
//配置axios的请求拦截器
axios.interceptors.request.use(function(config) {
  // 统一的给请求添加token
  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  return config
})

// 把axios绑定到了vue的原型上，所有的vue实例（组件）都可以通过 this.axios访问到axios
Vue.prototype.$axios = axios

//--------------------------------------------

//全局注册组件
import HmHeader from './components/HmHeader.vue'
Vue.component('hm-header', HmHeader)
import HmLogo from './components/HmLogo.vue'
Vue.component('hm-logo', HmLogo)
import HmButton from './components/HmButton.vue'
Vue.component('hm-button', HmButton)
import HmInput from './components/HmInput.vue'
Vue.component('hm-input', HmInput)
import HmNavbar from './components/HmNavbar.vue'
Vue.component('hm-navbar', HmNavbar)

// 全局定义过滤器,过滤时间
import moment from 'moment'
Vue.filter('date', function(input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

// 导入路由
import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
