import base from './base'
import networkEngine from '@/util/networkEngine'
import userInfoEngine from '@/util/userInfoEngine'
import util from '@/util/util'
import md5 from '@/util/md5'

// import qs from 'qs' // 根据需求是否导入qs模块

export default {
  // 获取书籍详情
  getBookInfo (bookId) {
    var userInfo = userInfoEngine.getUserInfo()
    var enc = md5.hex_md5(userInfo.aid + userInfo.uid + userInfo.siteid + bookId + util.getHourDate() + base.API_KEY)
    var url = `${base.SERVER_URL}/api/getlittlebooInfo?aid=${userInfo.aid}&uid=${userInfo.uid}&siteid=${userInfo.siteid}&bookid=${bookId}&enc=${enc}&ischapter=true`
    return networkEngine.get(url)
  },
  getAudioUrl (bookId, chapterId) {
    var userInfo = userInfoEngine.getUserInfo()
    var enc = md5.hex_md5(userInfo.aid + userInfo.uid + userInfo.siteid + bookId + chapterId + util.getHourDate() + base.API_KEY)
    var url = `${base.SERVER_URL}/api/getlittleaudiourl?aid=${userInfo.aid}&uid=${userInfo.uid}&siteid=${userInfo.siteid}&bookid=${bookId}&cid=${chapterId}&enc=${enc}&ischapter=true`
    return networkEngine.get(url)
  }
}
