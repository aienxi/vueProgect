// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import api from './api' // 导入api接口
import App from './App'
import store from '@/store'

// ********************* vux *********************
import { BusPlugin, ToastPlugin, LoadingPlugin } from 'vux'

Vue.use(LoadingPlugin)
// 默认参数
Vue.use(ToastPlugin, {position: 'default', isShowMask: 'true'})
Vue.use(BusPlugin)

Vue.config.productionTip = false
// 网路请求
Vue.prototype.$api = api

FastClick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
