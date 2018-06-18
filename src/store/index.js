import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
const debug = false

const state = {
  unlocked: false,
  querying: false,
  tryAgain: false,
  account: null,
  admin: null,
  billy: null,
  status: null,
  error: null,
  networkId: null,
  correctNetwork: 4,
  Patches: null,
  Controller: null,
  patches: [],
  works: [],
  log: [],
  notifications: []
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: false, // debug,
  plugins: debug ? [createLogger()] : []
})
