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
      component: () => import('@/pages/home/home'),
      meta: { keepAlive: true }
    },
    {
      path: '/mys',
      name: 'mys',
      component: () => import('@/pages/mys/mys'),
      meta: { keepAlive: true },
      children: [
        {
          path: '/bookDetail',
          name: 'bookDetail',
          component: () => import('@/pages/mys/bookDetail')

        }
      ]

    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/pages/recommend/recommend'),
      meta: { keepAlive: true }

    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/pages/user/user'),
      meta: { keepAlive: true }

    }
  ]
})
router.beforeEach((to, from, next) => {
  store.dispatch('setCurrentPage', to.name)
  next()
})
export default router
