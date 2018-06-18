import { Patches, Controller } from 'new-models-contracts'
import utils from 'web3-utils'
import {workIdFromTokenId, getNetwork} from '../assets/utils'

export default {
  async begin({ commit, dispatch }) {
    console.log('begin')
    commit('addLog', 'begin')
    try {
      dispatch('poll')
    } catch (error) {
      console.log('begin failed')
      console.error(error)
      console.log(error.message)
      // dispatch('createNotification', {
      //   type: 'error',
      //   title: 'Initialization Error',
      //   subtitle: "We're having trouble connecting to the Ethereum Network."
      // })
      commit('setError', 'Initialization Error')
    }
  },
  async reset({ state, commit, dispatch }) {
    if (state.querying) {
      commit('setTryAgain', true)
      return
    }
    console.log('reset')
    commit('setQuerying', true)
    try {
      await dispatch('getContracts')
      dispatch('getAdmin')
      dispatch('queryPatches')
      dispatch('queryWorks')
      commit('setQuerying', false)
      if (state.tryAgain) {
        commit('setTryAgain', false)
        dispatch('reset')
      }
    } catch (error) {
      let title, body, link
      switch (error.message) {
        case ('wrong-network'):

          title = 'Error Connecting To The Network'
          body = 'Looks like you have web3 available, but are connected to the wrong network. You are currently on <b>' + getNetwork(state.networkId) + '</b>, but need to be on <b>' + getNetwork(state.correctNetwork) + '</b>.<br><br>For help connecting please check out our help section.'
          link = {
            to: '/faq#connecting',
            text: 'Help'
          }

          break
        default:
          title = 'Error Connecting To The Network'
      }
      commit('addNotification', {
        type: 'error',
        title,
        body,
        link
      })
      console.error(error)
    }
  },
  async poll({state, commit, dispatch}) {
    try {
      let networkId = state.networkId + 0
      await dispatch('getNetwork')
      if (networkId !== state.networkId) dispatch('reset')
      await dispatch('getAccount')
      setTimeout(() => {
        dispatch('poll')
      }, 3000)
    } catch (error) {
      let title, body
      let link = {
        to: '/faq#wallets',
        text: 'Help'
      }
      let poll = true
      switch (error.message) {
        case ('User denied transaction signature.'):
          title = 'Error Connecting To The Network'
          body = "Looks like you aren't connected to the Ethereum Network. The popup you just dismissed is a free wallet service called <a target='_blank' href='https://portis.io/'>Portis</a> that you can use by refreshing the page. If you'd like to hear about other wallet options including <a target='_blank' href='https://metamask.io/'>Metamask</a> and <a target='_blank' href='https://www.uport.me/'>uPort</a> please check out our help section."
          poll = false
          break
        case ('account-locked'):
          title = 'Wallet is Locked'
          body = "Looks like your wallet is locked. Please unlock it if you'd like to interact with the contracts. If you'd like more information about this error, please see out help page."
          break
        default:
          title = 'Error Connecting To The Network'
          body = error.message
      }
      commit('addNotification', {
        type: 'error',
        title,
        body,
        link
      })
      if (poll) {
        setTimeout(() => {
          dispatch('poll')
        }, 3000)
      } else {
        //       global.web3 = new Web3(
        //   new PortisProvider({
        //     apiKey: 'e1d5ea735b084b248c33c221873d08dc',
        //     network: 'rinkeby'
        //   })
        // )
      }
      console.log(error.message)
      console.error(error)
    }
  },
  async getNetwork({ commit, state }) {
    const networkId = await global.web3.eth.net.getId()
    if (state.networkId !== networkId) {
      commit('addLog', 'setNetwork ' + networkId)
      commit('setNetwork', networkId)
    }
  },
  async getAccount({ commit, state }) {
    let accounts = await global.web3.eth.getAccounts()
    if (accounts.length && state.account !== accounts[0]) {
      commit('setUnlocked', true)
      commit('setAccount', accounts[0])
      commit('addLog', 'setAccount ' + accounts[0])
    } else if (!accounts.length && (state.account || state.unlocked)) {
      commit('setUnlocked', false)
      commit('setAccount', null)
      commit('addLog', 'setAccount ' + null)
      return new Error('account-locked')
    }
  },
  async getContracts({ state, commit }) {
    if (Patches.networks[state.networkId]) {
      const _Patches = new global.web3.eth.Contract(
        Patches.abi,
        Patches.networks[state.networkId].address
      )
      const _Controller = new global.web3.eth.Contract(
        Controller.abi,
        Controller.networks[state.networkId].address
      )
      commit('setContracts', { Patches: _Patches, Controller: _Controller })
      commit('addLog', 'setContracts')
    } else {
      throw new Error('wrong-network')
    }
  },
  async getAdmin({ commit, state }) {
    let admin = await state.Patches.methods.getWallet().call()
    let billy = await state.Patches.methods.getBilly().call()
    commit('setAdmin', admin)
    commit('setBilly', billy)
    commit('addLog', 'setAdmin ' + admin)
    commit('addLog', 'setBilly ' + billy)
  },
  async queryPatches({ commit, state, dispatch }) {
    let balanceOf = await state.Patches.methods.totalSupply().call()
    if (parseInt(balanceOf) !== state.patches.length) {
      commit('setPatches', [])
      dispatch('queryPatch', { key: 0, balanceOf }).then(() => {
        console.log('queried all patches')
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  queryPatch({ state, dispatch, commit }, { key, balanceOf }) {
    return new Promise(async (resolve, reject) => {
      if (key >= balanceOf) {
        resolve()
      } else {
        let patchId = await state.Patches.methods
          .tokenByIndex(key + '')
          .call()
        let owner = await state.Patches.methods.ownerOf(patchId).call()
        let workId = workIdFromTokenId(patchId)
        let patch = {
          workId,
          patchId,
          owner
        }
        commit('addPatch', patch)
        dispatch('queryPatch', { key: key + 1, balanceOf })
          .then(resolve)
          .catch(reject)
      }
    })
  },
  async queryWorks({ state, commit, dispatch }, workId = 1) {
    let workExists = await state.Patches.methods.workExists(workId).call()
    if (workExists) {
      let workHash = await state.Patches.methods.workHash(workId).call()
      let work = {
        workId,
        workHash
      }
      commit('addWork', work)
      workId++
      dispatch('queryWorks', workId)
    }
  },
  async reserved({ state, commit, dispatch }, workId) {
    try {
      console.log(state.Controller)
      let tx = await state.Controller.methods
        .reserved(workId)
        .send({ from: state.account })
        .on('transactionHash', hash => {
          commit('setStatus', {
            title: 'Waiting for tx ',
            type: 'etherscan',
            data: hash}
          )
        })
      commit('addLog', tx)
      dispatch('queryWorks')
      commit('setStatus', {
        title: 'Tx Completed',
        type: 'etherscan',
        data: tx.blockHash}
      )
    } catch (error) {
      commit('setError', error.message)
    }
  },
  async addWork({ state, commit, dispatch }, { workId, artist, hash }) {
    try {
      if (!utils.checkAddressChecksum(artist)) {
        commit('setError', 'Invalid artist address')
        return
      }
      console.log(state.Patches)
      if (await state.Patches.methods.workExists(workId).call()) {
        console.log(workId)
        commit('setError', 'Series number already exists')
        return
      }
      console.log('here')
      if ((await state.Patches.methods.owner().call()) !== state.account) {
        console.log(await state.Patches.methods.owner().call())
        console.log(state.account)
        commit('setError', 'Only Owner is allowed to call this function')
        return
      }
      console.log(workId, artist, hash)
      let tx = await state.Patches.methods
        .addWork(workId, artist, hash)
        .send({ from: state.account })
        .on('transactionHash', hash => {
          console.log('hash', hash)
          commit('setStatus', {
            title: 'Waiting for tx ',
            type: 'etherscan',
            data: hash}
          )
        })
      commit('addLog', tx)
      commit('setStatus', {
        title: 'Tx Completed',
        type: 'etherscan',
        data: tx.blockHash}
      )
      dispatch('queryWorks')
    } catch (error) {
      console.log(error)
      commit('setError', error.message)
    }
  }
}
