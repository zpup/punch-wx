//app.js
App({
  onLaunch: function() {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res);
        wx.request({
          url: that.globalData.apiurl + '/api/wechat/getUserInfo',
          method: 'POST',
          data: {
            'code': res.code,
            'shareId': that.globalData.shareId,
          },
          success: function (res) {
            var d = res.data.data;
            that.globalData.busUserInfo = d
            console.log("update bususer");
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log("update wxuser");              
            }
          })
        }
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log("update wxuser");              
            }
          })
        }
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
        
      }
    })
    setTimeout(() => {
      that.setBusUserInfo();
    }, 3000)
    
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setBusUserInfo: function(result) {
    console.log(1)
    var that = this;
    wx.request({
      url: that.globalData.apiurl + '/api/user/setWchatUser',
      method: 'POST',
      data: {
        'busUserInfo': JSON.stringify(that.globalData.busUserInfo),
        'userInfo': JSON.stringify(that.globalData.userInfo),
        'shareUserId': that.globalData.shareUserId,
      },
      success: function(res) {
        var d = res.data.data;
        console.log(d);
        that.globalData.busUserInfo = d.busUser
        that.globalData.beans = d.beans

      }
    })
  },
  globalData: {
    isUpdateUser:0,
    beans: 0,
    shareUserId: 0,
    isNewUser: 0,
     apiurl: "http://192.168.0.106",
    // apiurl: "https://wc.zpccf.com",
    userInfo: null,
    busUserInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  }
})