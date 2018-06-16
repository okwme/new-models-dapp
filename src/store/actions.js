import { Patches, Controller } from 'new-models-contracts'
import utils from 'web3-utils'
import {workIdFromTokenId} from '../assets/utils'

export default {
  async begin({ commit, dispatch }) {
    commit('addLog', 'begin')
    try {
      await dispatch('getNetwork')
      await dispatch('getAccount')
      await dispatch('getContracts')
      dispatch('beginPolling')
    } catch (error) {
      console.error(error)
      commit('setError', 'Initialization Error')
    }
  },
  async reset({ commit, dispatch }) {
    commit('addLog', 'reset')
    await dispatch('getNetwork')
    await dispatch('getAccount')
    await dispatch('getContracts')
    dispatch('getAdmin')
    dispatch('queryPatches')
    dispatch('queryWorks')
  },
  beginPolling({ dispatch }) {
    setInterval(async () => {
      await dispatch('getNetwork')
      await dispatch('getAccount')
    }, 3000)
  },
  async getNetwork({ commit, state }) {
    try {
      // global.web3.eth.net.getId((err, resp) => {
      //   console.log(err, resp)
      // })
      const networkId = await global.web3.eth.net.getId()
      if (state.networkId !== networkId) {
        commit('addLog', 'setNetwork ' + networkId)
        commit('setNetwork', networkId)
      }
    } catch (error) {
      commit('setError', 'Network Error')
    }
  },
  async getAccount({ commit, state }) {
    try {
      let accounts = await global.web3.eth.getAccounts()
      if (accounts.length && state.account !== accounts[0]) {
        commit('setUnlocked', true)
        commit('setAccount', accounts[0])
        commit('addLog', 'setAccount ' + accounts[0])
      } else if (!accounts.length && (state.account || state.unlocked)) {
        commit('setUnlocked', false)
        commit('setAccount', null)
        commit('addLog', 'setAccount ' + null)
      }
    } catch (error) {
      console.error(error)
      commit('setError', 'Account Error')
    }
  },
  async getContracts({ state, commit }) {
    try {
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
    } catch (error) {
      console.error(error)
      commit('setError', 'Contract Error')
    }
  },
  async getAdmin({ commit, state }) {
    try {
      let admin = await state.Patches.methods.getWallet().call()
      let billy = await state.Patches.methods.getBilly().call()
      commit('setAdmin', admin)
      commit('setBilly', billy)
      commit('addLog', 'setAdmin ' + admin)
      commit('addLog', 'setBilly ' + billy)
    } catch (error) {
      commit('setError', error.message)
    }
  },
  async queryPatches({ commit, state, dispatch }) {
    try {
      let balanceOf = await state.Patches.methods.totalSupply().call()
      if (parseInt(balanceOf) !== state.patches.length) {
        console.log(balanceOf)
        commit('setPatches', [])
        dispatch('queryPatch', { key: 0, balanceOf })
      }
    } catch (error) {
      console.error(error)
      commit('setError', 'Error retrieving Patch count')
    }
  },
  queryPatch({ state, dispatch, commit }, { key, balanceOf }) {
    return new Promise(async (resolve, reject) => {
      if (key >= balanceOf || !state.account) {
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
    try {
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
    } catch (error) {
      console.log(error)
      commit('setError', error.message)
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
