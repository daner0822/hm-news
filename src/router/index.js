//导入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用路由
Vue.use(VueRouter)

// 解决NavigationDuplicated报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

//导入组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Test from '../pages/Test.vue'
import MyFollow from '../pages/MyFollow.vue'
import MyComments from '../pages/MyComments.vue'
import MyStar from '../pages/MyStar.vue'
import Home from '../pages/Home.vue'
import PostDetail from '../pages/PostDetail.vue'
import TabEdit from '../pages/TabEdit.vue'
import Search from '../pages/Search.vue'

//路由实例
const router = new VueRouter({
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/user', name: 'user', component: User },
    { path: '/edit', name: 'edit', component: Edit },
    { path: '/test', name: 'test', component: Test },
    { path: '/my-follow', name: 'my-follow', component: MyFollow },
    { path: '/my-comments', name: 'my-comments', component: MyComments },
    { path: '/my-star', name: 'my-star', component: MyStar },
    { path: '/post-detail/:id', name: 'my-post-detail', component: PostDetail },
    { path: '/tab-edit', name: 'tab-edit', component: TabEdit },
    { path: '/search', name: 'search', component: Search }
  ]
})

// 注册全局的导航守卫,拦截未登录的用户
// 只要路由发生了跳转，先经过导航守卫
// 参数to: 到哪儿去
// 参数from: 从哪儿来
// next: 函数   next()表示放行  next('/login') 去登录
// 需要授权的路径，需要登录才能访问的路径
const authUrl = ['/user', '/edit', '/my-follow', '/my-star', '/my-comments']
router.beforeEach(function(to, from, next) {
  // 判断是否有token,如果有token，说明就是登录的，如果没有token，那就是没有登录的
  const token = localStorage.getItem('token')
  //如果去个人中心,必须登录
  if (authUrl.includes(to.path)) {
    //有token
    if (token) {
      next()
    } else {
      //没有token去登陆,
      //如果没有登录,不推荐使用next('/login)
      // 使用 router.push('/login')
      router.push('/login')
    }
  } else {
    //放行
    next()
  }

  //简化
  //如果去user并且没有token
  // if (to.path === '/user' && !token) {
  //   next('/login')
  // } else {
  //   next()
  // }
})

//导出路由实例
export default router
