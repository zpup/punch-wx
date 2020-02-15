const app = getApp()

//更新用户信息，是否分享用户
function setBusUserInfo(result) {
  var that = this;
  wx.request({
    url: app.globalData.apiurl + '/api/user/setWchatUser',
    method: 'POST',
    data: {
      'busUserInfo': JSON.stringify(app.globalData.busUserInfo),
      'userInfo': JSON.stringify(app.globalData.userInfo),
      'shareUserId': app.globalData.shareUserId,
    },
    success: function (res) {
      var d = res.data.data;
      console.log(d);
      app.globalData.busUserInfo = d.busUser
      app.globalData.beans = d.beans

    }
  })
}

module.exports = {
  setBusUserInfo: setBusUserInfo
};