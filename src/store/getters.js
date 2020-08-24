const getters = {
  currentPage: state => state.app.currentPage,
  fullScreen: state => state.player.fullScreen,
  playStatus: state => state.player.playStatus,
  currentBookInfo: state => state.player.currentBookInfo

}
export default getters
