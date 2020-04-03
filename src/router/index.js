//导入vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

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
// import Login from '../pages/Login.vue' 同步组件
//异步组件 懒加载   首屏按虚、需加载
const Login = () => import(/* webpackChunkName: "user" */ '../pages/Login.vue')
const Register = () =>
  import(/* webpackChunkName: "user" */ '../pages/Register.vue')
const User = () => import(/* webpackChunkName: "user" */ '../pages/User.vue')
const Edit = () => import(/* webpackChunkName: "user" */ '../pages/Edit.vue')
const Test = () => import(/* webpackChunkName: "user" */ '../pages/Test.vue')
const MyFollow = () =>
  import(/* webpackChunkName: "user" */ '../pages/MyFollow.vue')
const MyComments = () =>
  import(/* webpackChunkName: "user" */ '../pages/MyComments.vue')
const MyStar = () =>
  import(/* webpackChunkName: "user" */ '../pages/MyStar.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../pages/Home.vue')

const PostDetail = () =>
  import(/* webpackChunkName: "home" */ '../pages/PostDetail.vue')
const TabEdit = () =>
  import(/* webpackChunkName: "home" */ '../pages/TabEdit.vue')
const Search = () =>
  import(/* webpackChunkName: "home" */ '../pages/Search.vue')

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
  // 在导航守卫中, 判断是否是进入home组件，如果进入的是home组件，我们就把home组件缓存起来。
  // console.log(to)

  if (to.name === 'home') {
    console.log('需要缓存home组件')
    store.commit('cache', 'home')
  }
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
