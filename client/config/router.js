import Router from 'vue-router'

import routes from './routes'

console.log(routes)

export default () => {
  return new Router({
    routes,
    mode: 'history',
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    // 保存滚动条所在的位置。只要之前打开过地方。如果没有则定位在{ x: 0, y: 0 }
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
    // parseQuery (query) {

    // },
    // stringifyQuery (obj) {

    // }
    // 自动处理 ，false会发送到服务器在返回
    // fallback: true
    // base: '/base/' // 设置的路由所有的path都会加上base路劲，基础路径
  })
}
