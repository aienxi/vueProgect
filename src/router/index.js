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
      path: '/classList/:classId',
      name: 'classList',
      component: () => import('@/pages/home/ClassList')
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
      path: '/mys/bookDetail/:bookid',
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
// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let isTouchStart = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']
addEventListener('touchend', () => {
  isTouchStart = false
  endTime = Date.now()
})
document.addEventListener('touchstart', () => {
  isTouchStart = true
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})
let tabbarPage = ['home', 'mys', 'recommend', 'user']

router.beforeEach((to, from, next) => {
  if (store.getters.fullScreen === true) {
    store.dispatch('setFullScreen', false)
  }
  store.dispatch('setCurrentPage', to.name)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  let direction

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      if (tabbarPage.indexOf(from.name) !== -1 && tabbarPage.indexOf(to.name) !== -1) {
        direction = ''
      } else {
        direction = 'forward'
      }
    } else {
      if (tabbarPage.indexOf(from.name) !== -1 && tabbarPage.indexOf(to.name) !== -1) {
        direction = ''
      } else {
        direction = 'reverse'
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    direction = 'forward'
  }

  // 判断是否是ios左滑返回 或者 右滑前进
  if (toIndex && toIndex !== '0' && !isPush && (((Date.now() - endTime) < 377) || isTouchStart)) {
    store.dispatch('updateDirection', '')
  } else {
    store.dispatch('updateDirection', direction)
  }
  isTouchStart = false

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})
export default router
