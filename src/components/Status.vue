<template>
    <div >
            <br>

      <button @click="show = !show">{{show ? 'hide' : 'status'}}</button>
      <br>
      <br>
      <div class="status" :class="showClass">
        <div>
        <dt>Status</dt>
        <dd>{{status}}</dd>

        <dt>Network</dt>
        <dd>{{network}}</dd>

        <dt>Account</dt>
        <dd>{{account}}</dd>

        <dt>Unlocked</dt>
        <dd>{{unlocked}}</dd>

        <dt>Errors</dt>
        <dd>{{error}}</dd>

        <dt>Log</dt>
        <dd>
            <div v-for="(l, i) in log" :key="i" >
              <hr v-if="i!==0">
              <div>{{l.title}}</div>
              <div>{{format(l.time)}}</div>
              <div v-if="l.data">{{l.data}}</div>
            </div>
        </dd>
      </div>
    </div>
    </div>
</template>

<script>
import moment from 'moment'
import {mapState} from 'vuex'
export default {
  name: 'Status',

  data() {
    return {
      show: false
    }
  },
  computed: {
    ...mapState(['account', 'unlocked', 'admin', 'status', 'error', 'networkId', 'log']),

    showClass() {
      return {
        show: this.show
      }
    },
    network () {
      switch (this.networkId) {
        case (1):
          return 'mainnet'
        case (4):
          return 'rinkeby'
        default:
          return this.networkId
      }
    }
  },
  methods: {
    format(time) {
      return moment(time).fromNow()
    }
  }
}
</script>

<style lang="css" scoped>
pre {
  text-align: left;
}

.status {
  text-align: left;
  max-height: 400px;
  overflow: auto;
  margin: auto;
  height:0;
  transition: height 500ms ease;
  display: block;
}
.status > div {
    padding:10px;

}

.show {
  height:400px;

  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
