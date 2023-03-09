import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home/Home-vue'
import User from '@/views/User/User-vue'
Vue.use(VueRouter)

const routes = [
  // 重定向路由
  { path: '/', redirect: '/home' },
  // 路由规则
  { path: '/home', component: Home },
  { path: '/user', component: User }
]

const router = new VueRouter({
  routes
})

export default router
