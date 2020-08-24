export default {
  // 检查当前是否有听书权限，无权限的话，将单位设置为游客单位
  // 获取用户信息
  getUserInfo,
  // 判断当前用户是否有听书权限
  isAuth,
  // 微信登录
  userWxLogin,
  setUserInfo
}
// 获取用户信息

function getUserInfo () {
  var userInfo = JSON.parse(localStorage.getItem('userInfo')) 
  if(!userInfo){
    userInfo ={
      uid:'22651',
      aid:'60',
      siteid:'70'
    }
  }
  return userInfo
} // 设置用户信息

function setUserInfo (userInfo) {
  localStorage.setItem('userInfo',JSON.stringify(userInfo));
} 

function isAuth () {
}

function userWxLogin (saveAuth, finish) {
}

function getIsNeedUpdateUserInfoWhenQuere () {
}
