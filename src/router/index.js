//导入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用路由
Vue.use(VueRouter)

//导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'

//路由实例
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/user', name: 'user', component: User },
    { path: '/edit', name: 'edit', component: Edit }
  ]
})

// 注册全局的导航守卫,拦截未登录的用户
// 只要路由发生了跳转，先经过导航守卫
// 参数to: 到哪儿去
// 参数from: 从哪儿来
// next: 函数   next()表示放行  next('/login') 去登录
router.beforeEach(function(to, from, next) {
  // 判断是否有token,如果有token，说明就是登录的，如果没有token，那就是没有登录的
  const token = localStorage.getItem('token')
  //如果去个人中心,必须登录
  // if(to.path==='/user'){
  //   //有token
  //   if(token){
  //     next()
  //   }else{
  //     //没有token去登陆
  //     next('/login')
  //   }
  // }else{
  //   //放行
  //   next()
  // }

  //简化
  //如果去user并且没有token
  if (to.path === '/user' && !token) {
    next('/login')
  } else {
    next()
  }
})

//导出路由实例
export default router
