<template>
  <div class="hello">
    <div v-for="(work, i) in workPatches" :key="i">
      <img :src="'https://res.cloudinary.com/dszcbwdrl/image/upload/' + work.workId">
      {{work.patches.length}}/100
      <hr>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['workPatches'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
img {
  max-width:300px;
  max-height: 300px;
}
</style>
