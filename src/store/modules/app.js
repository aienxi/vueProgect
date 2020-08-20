const state = {
  currentPage: 'recommend'
}
const mutations = {
  SET_CURRENT_PAGE: (name) => {
    state.currentPage = name
  }
}
const actions = {
  setCurrentPage ({commit}, name) {
    commit('SET_CURRENT_PAGE', name)
  }
}
export default{
  state,
  mutations,
  actions
}
