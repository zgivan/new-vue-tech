import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store.js'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

store.registerModule('c', {
  state: {
    text: 3
  }
})

// 解锁一个module
// store.unregisterModule('c')

// store watch方法
store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched:', newCount)
})

store.subscribe((mutation, state) => {
  console.log(mutation.type)
  console.log(mutation.payload)
})

store.subscribeAction((action, state) => {
  console.log(action.type)
  console.log(action.payload)
})

// 导航钩子,全局钩子，路由守卫

router.beforeEach((to, from, next) => {
  // 有些操作是需要登录以后才能进行的就可以把方法放在beforeEach里面去操作。
  console.log('before each invoked')
  // if (to.fullPath === '/app') {
  //   next({ path: '/login' }) // 没有登录就跳转到login页面
  // } else {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

// 已经跳转，不需要next
router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
