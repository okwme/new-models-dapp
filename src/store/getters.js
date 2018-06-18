
export default {
  workPatches: state => {
    return state.works.map((work) => {
      return {
        ...work,
        patches: state.patches.filter((p) => p.workId === work.workId)
      }
    })
  }
}
