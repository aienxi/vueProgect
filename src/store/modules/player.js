const state = {
  fullScreen: false,
  playStatus: 0,
  currentBookInfo: {}
}
const mutations = {
  SET_FULL_SCREEN: (state, isFullScreen) => {
    state.fullScreen = isFullScreen
  },
  SET_PLAT_STATUS: (state, status) => {
    state.playStatus = status
  },
  SET_CURRENT_BOOK_INFO: (state, bookInfo) => {
    state.currentBookInfo = bookInfo
  }

}
const actions = {
  setFullScreen ({commit}, isFullScreen) {
    commit('SET_FULL_SCREEN', isFullScreen)
  },
  setPlayStatus ({commit}, playStatus) {
    commit('SET_PLAT_STATUS', playStatus)
  },
  setCurrentBookInfo ({commit}, bookInfo) {
    commit('SET_CURRENT_BOOK_INFO', bookInfo)
  }
}
export default{
  state,
  mutations,
  actions
}
