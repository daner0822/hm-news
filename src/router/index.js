//导入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用路由
Vue.use(VueRouter)

//导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'

//路由实例
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/user', name: 'user', component: User }
  ]
})

//导出路由实例
export default router
