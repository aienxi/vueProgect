import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import { Tabbar, TabItem } from 'mint-ui'

Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
