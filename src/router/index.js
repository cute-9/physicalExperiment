import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import test from '../components/test.vue'
import test1 from '../components/test1.vue'
import test2 from '../components/test2.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: 'login' },
  {
    path: '/login',
    name:'login',
    component: login,
  },
  { path: '/test', component: test, name:'test' },
  { path: '/test1', component: test1, name:'test1' },
  { path: '/test2', component: test2, name:'test2' }


]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
