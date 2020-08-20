/* eslint-disable quotes */
const SERVER_URL = "https://api.xinyulib.com"
const SERVER_URL_TEST = "http://api.xinyulib.com:36500"
const ApiKey = "LB@*Z6W8&$l"
const IndexApiUrl = SERVER_URL + "/api/getlittleindexinfo"
const ClassListUrl = SERVER_URL + "/api/getlittleindexinfo"
const BookListUrl = SERVER_URL + "/api/getlittlebooklist"
const BookInfoUrl = SERVER_URL + "/api/getlittlebooInfo"
const AudioUrl = SERVER_URL + "/api/getlittleaudiourl"
const UntilUrl = SERVER_URL + "/api/getlittleunitlist"
const UserLoginUrl = SERVER_URL + "/api/userlogin"
const AddFavUrl = SERVER_URL + "/api/addlittlefav"
const AddHisUrl = SERVER_URL + "/api/addlittlehis"
const GetFavListUrl = SERVER_URL + "/api/getlittlefavlist"
const GetHisListUrl = SERVER_URL + "/api/getlittlehislist"
const AuthUserUrl = SERVER_URL + "/api/authlittleuser"
const getUserInfo = SERVER_URL + "/api/getUserInfo"
const updateUserInfo = SERVER_URL + "/api/updateUserInfo"
const getUserPlanList = SERVER_URL + "/api/getuserplanlist"
const getPlanInfo = SERVER_URL + "/api/getplaninfo"
const getAllPlan = SERVER_URL + "/api/getplanlist"
const addUserPlan = SERVER_URL + "/api/joinplan"
const deleteUserPlan = SERVER_URL + "/api/deleteplan"
const GetAudioUrl = "/api/getAudioUrl"
const updateUserPlan = SERVER_URL + "/api/updateuserplan"
const planPagerUrl = SERVER_URL + "/plan/user_aswner.jsp"
const wxLogin = SERVER_URL + "/api/wxLogin"
const tipLoading = "加载中..."
const tipNetErro = "网络连接失败，请检查网络"
const WeChatLogin = SERVER_URL + "/api/userlogin3"
const UpdateUserInfo = SERVER_URL + "/api/updateUserInfo"
const QueryUserInfo = SERVER_URL + "/api/queryuserinfo1"
const UpLearnTime = SERVER_URL + "/api/updateListenTimes"
const GetLearnTime = SERVER_URL + "/api/getListenTimes"
const DeleteCollect = SERVER_URL + "/api/delFav"
const GetLittleCueWords = SERVER_URL + "/api/getCueWords"
const GetLittleSuggestWords = SERVER_URL + "/api/getSuggestWords"
const getBookPlayCount = SERVER_URL + "/api/getBookPlayCount"
const getRankingList = SERVER_URL + "/api/getlisenernum"
const APPID = "wx9f6be3ac85d28531"
module.exports = {
  IndexApiUrl: IndexApiUrl,
  ApiKey: ApiKey,
  ClassListUrl: ClassListUrl,
  BookListUrl: BookListUrl,
  BookInfoUrl: BookInfoUrl,
  AudioUrl: AudioUrl,
  UntilUrl: UntilUrl,
  UserLoginUrl: UserLoginUrl,
  AddFavUrl: AddFavUrl,
  AddHisUrl: AddHisUrl,
  GetFavListUrl: GetFavListUrl,
  GetHisListUrl: GetHisListUrl,
  AuthUserUrl: AuthUserUrl,
  Secret_Key: ApiKey,
  tipLoading: tipLoading,
  tipNetErro: tipNetErro,
  getUserInfo: getUserInfo,
  updateUserInfo: updateUserInfo,
  getUserPlanList: getUserPlanList,
  getPlanInfo: getPlanInfo,
  addUserPlan: addUserPlan,
  deleteUserPlan: deleteUserPlan,
  getAllPlan: getAllPlan,
  updateUserPlan: updateUserPlan,
  planPagerUrl: planPagerUrl,
  wxLogin: wxLogin,
  GetAudioUrl: GetAudioUrl,
  WeChatLogin: WeChatLogin,
  UpdateUserInfo: UpdateUserInfo,
  QueryUserInfo: QueryUserInfo,
  UpLearnTime: UpLearnTime,
  GetLearnTime: GetLearnTime,
  DeleteCollect: DeleteCollect,
  GetLittleCueWords: GetLittleCueWords,
  GetLittleSuggestWords: GetLittleSuggestWords,
  getBookPlayCount: getBookPlayCount,
  getRankingList: getRankingList,
  APPID: APPID,
  SERVER_URL_TEST: SERVER_URL_TEST
}
