
export default {
  workPatches: state => {
    return state.works.map((work) => {
      return state.patches.filter((p) => p.workId === work.workId)
    })
  }
}
