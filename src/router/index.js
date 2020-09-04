import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/Home'),
      meta: { keepAlive: true }
    },
    {
      path: '/mys',
      name: 'mys',
      component: () => import('@/pages/mys/Mys'),
      meta: { keepAlive: true }
    },
    {
      path: '/mys/History',
      name: 'history',
      component: () => import('@/pages/mys/History')
    },
    {
      path: '/mys/bookDetail',
      name: 'bookDetail',
      component: () => import('@/pages/mys/BookDetail')
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/pages/recommend/Recommend'),
      meta: { keepAlive: true }

    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/user/User'),
      meta: { keepAlive: true }

    }
  ]
})
router.beforeEach((to, from, next) => {
  if (store.getters.fullScreen === true) {
    store.dispatch('setFullScreen', false)
  }
  store.dispatch('setCurrentPage', to.name)
  next()
})
export default router
