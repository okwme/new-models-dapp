export default {
  addLog(state, log) {
    log = {
      time: Date.now(),
      title: typeof log === 'object' ? 'tx' : log,
      data: typeof log === 'object' && log
    }
    state.log.unshift(log)
  },
  setQuerying(state, bool) {
    state.querying = bool
  },
  setTryAgain(state, bool) {
    state.tryAgain = bool
  },
  setUnlocked(state, unlocked) {
    state.unlocked = unlocked
  },
  setAccount(state, account) {
    state.account = account
  },
  setStatus(state, status) {
    state.status = status
  },
  setError(state, error) {
    state.error = error
  },
  setContracts(state, { Patches, Controller }) {
    state.Patches = Patches
    state.Controller = Controller
  },
  setNetwork(state, networkId) {
    state.networkId = networkId
  },
  setAdmin(state, admin) {
    state.admin = admin
  },
  setBilly(state, billy) {
    state.billy = billy
  },
  setPatches(state, patches) {
    state.patches = patches
  },
  addPatch(state, patch) {
    // state.patches = { ...state.patches, [patch.patchId]: patch }
    state.patches.push(patch)
  },
  addWork(state, work) {
    let workIndex = state.works.findIndex(w => w.workId === work.workId)
    if (workIndex > -1) {
      state.works.splice(workIndex, 1, work)
    } else {
      state.works.push(work)
    }
  },
  markAllNotifications (state) {
    if (!state.notifications.length) return
    let opposite = !state.notifications[state.notifications.length - 1].seen
    state.notifications.forEach(n => { n.seen = opposite })
  },
  addNotification(state, notification) {
    if (state.notifications.length && notification.body === state.notifications[0].body) return
    let uid = (new Date()).getTime().toString(16)
    notification.id = uid
    notification.seen = false
    state.notifications.unshift(notification)
  },
  removeNotification(state, id) {
    let nIndex = state.notifications.findIndex(n => n.id === id)
    if (nIndex > -1) {
      let notification = state.notifications[nIndex]
      notification.seen = true
      state.notifications.splice(nIndex, 1, notification)
    }
  }
}
