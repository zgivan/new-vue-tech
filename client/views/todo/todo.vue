<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么"
      @keyup.enter="addTodo"
    >
    <item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    ></item>
    <tabs :filter="filter" :todos="filteredTodos" @toggle="toggleFilter" @clearAllCompleted="clearAllCompleted"></tabs>
    <!-- <router-view></router-view> -->
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0

export default {
  metaInfo: {
    title: 'The Todo App'
  },
  beforeRouteEnter (to, from, next) {
    console.log('todo before enter', this)
    next(vm => {
      console.log('after enter vm.id is ', vm.id)
    })
  },
  // 路由参数path: '/app:id'这里切换id的值时候回触发update
  beforeRouteUpdate (to, from, next) {
    console.log('todo update enter')
    next()
  },
  // 要路由跳转就要执行next()否则不跳转，可以控制路由跳转行为
  beforeRouteLeave (to, from, next) {
    console.log('todo leave enter')
    // 询问global.confirm
    // if (global.confirm('are you sure?')) {
    //   next()
    // }
    next()
  },
  props: ['id'],
  mounted () {
    console.log('todo mounted')
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  components: {
    Item,
    Tabs
  }
}
</script>

<style lang="stylus" scoped>
.real-app
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
.add-input
  position relative
  margin 0
  width 100%
  font-size 24px
  font-family inherit
  font-weight inherit
  line-height 1.4em
  border 0
  outline none
  color inherit
  padding 6px
  border 1px solid #999999
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
</style>
