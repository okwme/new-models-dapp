// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { PortisProvider } from 'portis'
import Web3 from 'web3'
router.afterEach((to, from, next) => {
  if (ga) ga('send', 'pageview')
})

Vue.config.productionTip = false

if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  global.web3 = new Web3(web3.currentProvider)
} else {
  // Fallback - use Portis
  global.web3 = new Web3(
    new PortisProvider({
      apiKey: 'e1d5ea735b084b248c33c221873d08dc',
      network: 'rinkeby'
    })
  )
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
