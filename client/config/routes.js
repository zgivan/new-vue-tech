// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  // 默认路由
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id',
    // props: (route) => ({ id: route.query.b }),
    props: true, // props,可以直接在todo里面申明props: ['id'],然后通过this.id获取到id的值
    component: () => import('../views/todo/todo.vue'), // 单个router-view的时候
    // 多个router-view的时候，设置name="a"
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'asdfsd'
    },
    beforeEnter (to, from, next) {
      console.log('app router before enter')
      next()
    }
    // 子路由，路由嵌套
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]
