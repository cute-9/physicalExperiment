import Vue from 'vue'
import App from './App.vue'
import router from './router'
import'./assets/all.css'
// 手动配置element ui
// import ElementUI from 'element-ui'
// import { Message } from 'element-ui'
// //前面的$massage是自己命名的，后面的Massage是组件名字
// Vue.prototype.$massage=Message
// import 'element-ui/lib/theme-chalk/index.css'
// Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://120.55.71.155/'
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('data')
  return config
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
