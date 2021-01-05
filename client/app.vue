<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p>{{fullName}} {{counter}}</p>
    <!-- <p>{{textC}} {{textPlus}}</p> -->
    <router-link to="/app">App</router-link>
    <router-link to="/app">App2</router-link>
    <router-link to="/login">Login</router-link>
    <!-- <todo></todo> -->
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <Footer></Footer>
    <!-- <router-view name="a"></router-view> -->
  </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: 'ZG\'s Todo APP'
  },
  components: {
    Header,
    Footer
    // Todo
  },
  mounted () {
    // this.$route能获取到所有的参数信息this.$route.param
    // 若从页面带参数跳转过来path?a=123&b=456，则会在this.$route.query内显示出来
    console.log(this.$route)
    console.log(this.$store)
    // let i = 1
    this.updateCountAsync({
      num: 5,
      time: 2000
    })
    // this['a/updateText']('123')
    // this['a/add']()
    // this['b/testAction']()
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 2
    //   })
    // }, 1000)
  },
  computed: {
    // textA () {
    //   return this.$store.state.a.text
    // },
    ...mapState({
      counter: (state) => state.count
      // textA: state => state.a.text,
      // textC: state => state.c.text
    }),
    // count () {
    //   return this.$store.state.count
    // },
    ...mapGetters({
      'fullName': 'fullName'
      // textPlus: 'a/textPlus'
    })
    // fullName () {
    //   return this.$store.getters.fullName
    // }
  },
  methods: {
    ...mapActions(['updateCountAsync']),
    ...mapMutations(['updateCount'])
    // ...mapActions(['updateCountAsync', 'a/add', 'b/testAction']),
    // ...mapMutations(['updateCount', 'a/updateText'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #999
  opacity .9
  z-index -1
}
</style>
