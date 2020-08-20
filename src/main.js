// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './style/my-mint.scss'
import router from './router'
import api from './api' // 导入api接口
import toast from './util/toast'
import store from '@/store'
Vue.config.productionTip = false
Vue.use(MintUI)

// 网路请求
Vue.prototype.$api = api
// 提示框
Vue.prototype.$toast = toast

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})
