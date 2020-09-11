const state = {
  currentPage: 'recommend',
  direction: 'forward',
  scrollTop: 0

}
const mutations = {

  SET_CURRENT_PAGE: (state, pageName) => {
    state.currentPage = pageName
  },
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  SET_SCROLL_TOP: (state, top) => {
    state.scrollTop = top
  }
}
const actions = {
  setCurrentPage ({commit}, pageName) {
    commit('SET_CURRENT_PAGE', pageName)
  },
  updateDirection ({commit}, direction) {
    commit('UPDATE_DIRECTION', direction)
  },
  setScrollTop ({commit}, top) {
    commit('SET_SCROLL_TOP', top)
  }
}
export default{
  state,
  mutations,
  actions
}
