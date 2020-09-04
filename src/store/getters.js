const getters = {
  currentPage: state => state.app.currentPage,
  fullScreen: state => state.player.fullScreen,
  playStatus: state => state.player.playStatus,
  currentBookInfo: state => state.player.currentBookInfo,
  showTabbar: (state) => {
    var arrNavPage = ['home', 'mys', 'recommend', 'user']

    if (state.player.fullScreen) {
      return false
    } else if (arrNavPage.indexOf(state.app.currentPage) !== -1) {
      return true
    } else {
      return false
    }
  }

}
export default getters
