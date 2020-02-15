const app = getApp()

//更新用户信息，是否分享用户
function setBusUserInfo(e) {
  var that = this;
  wx.request({
    url: app.globalData.apiurl + '/api/user/setWchatUser',
    method: 'POST',
    data: {
      'busUserInfo': JSON.parse(that.globalData.busUserInfo),
      'userInfo': JSON.parse(that.globalData.userInfo),
      'shareUserId': that.globalData.shareUserId,
    },
    success: function (res) {
      var d = res.data.data;
      console.log(d);
      result(d);

      // wx.redirectTo({
      //   url:'/pages/member/address'
      // })
      that.setData({
        kdUserInfo: res.data.data,

      })
      app.globalData.kdUserInfo = res.data.data
    }
  })
}

module.exports = {
  setBusUserInfo: setBusUserInfo
};