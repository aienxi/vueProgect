const state = {
  currentPage: 'recommend',
  direction: 'forward'

}
const mutations = {
  SET_CURRENT_PAGE: (state, pageName) => {
    state.currentPage = pageName
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  }
}
const actions = {
  setCurrentPage ({commit}, pageName) {
    commit('SET_CURRENT_PAGE', pageName)
  },
  updateDirection ({commit}, direction) {
    commit('UPDATE_DIRECTION', direction)
  }
}
export default{
  state,
  mutations,
  actions
}
