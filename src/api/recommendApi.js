import base from './base'
import networkEngine from '@/util/networkEngine'
import userInfoEngine from '@/util/userInfoEngine'
import util from '@/util/util'
import md5 from '@/util/md5'

// import qs from 'qs' // 根据需求是否导入qs模块

export default {
  // 获取首页信息
  getHistory () {
    var userInfo = userInfoEngine.getUserInfo()
    var enc = md5.hex_md5(userInfo.aid + userInfo.uid + userInfo.siteid + util.getHourDate() + base.API_KEY)
    var url = `${base.SERVER_URL}/api/getlittleindexinfo?aid=${userInfo.aid}&uid=${userInfo.uid}&siteid=${userInfo.siteid}&enc=${enc}`
    return networkEngine.get(url)
  }
}
