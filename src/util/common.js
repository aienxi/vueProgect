module.exports = {
  judjeShowLogin: judjeShowLogin,
  judjeShowLoginAlert: judjeShowLoginAlert
};

function judjeShowLogin() {
  wx.showModal({
    title: '提示',
    content: '播放此章节需要用新语听书卡或者图书馆借书证登录',
    showCancel: true,
    cancelText: '暂不登录',
    cancelColor: '#000000	',
    confirmText: '前往登录',
    confirmColor: '#000000	',

    success(res) {
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/my/login/login'
        });
      } else if (res.cancel) {}
    }

  });
}

function judjeShowLoginAlert() {
  wx.showModal({
    title: '提示',
    content: '请先登录',
    showCancel: true,
    cancelText: '暂不登录',
    cancelColor: '#000000	',
    confirmText: '前往登录',
    confirmColor: '#000000	',

    success(res) {
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/my/login/login'
        });
      } else if (res.cancel) {}
    }

  });
}