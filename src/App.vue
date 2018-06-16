<template>
  <div id="app">
    <router-link to="/">home</router-link>
    <router-link to="/badmin">admin</router-link>
    <status/>

    <router-view/>

  </div>
</template>

<script>
import Status from './components/Status.vue'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'App',

  components: { Status },
  methods: {
    ...mapActions(['begin', 'reset'])
  },
  computed: {
    ...mapState(['account', 'locked', 'error'])
  },
  watch: {
    account() {
      console.log('account changed')
      this.reset()
    },
    locked() {
      console.log('locked changed')
      this.reset()
    }
  },
  mounted() {
    this.begin()
  }
}
</script>

<style>
body{
  padding:0;
  margin:0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: grey;
  margin-top: 60px;
}
</style>
