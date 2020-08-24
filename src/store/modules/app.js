const state = {
  currentPage: 'recommend'
}
const mutations = {
  SET_CURRENT_PAGE: (state, pageName) => {
    state.currentPage = pageName
  }
}
const actions = {
  setCurrentPage ({commit}, pageName) {
    commit('SET_CURRENT_PAGE', pageName)
  }
}
export default{
  state,
  mutations,
  actions
}
