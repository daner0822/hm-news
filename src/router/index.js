//导入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用路由
Vue.use(VueRouter)

//导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

//路由实例
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})

//导出路由实例
export default router
