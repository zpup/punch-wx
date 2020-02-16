// pages/main/index.js
var common = require("../../js/common.js");

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    punchNum: 400,
    punchList: [],
    loadModal: false,
    showBeans: false,
    beans: 0,
    showMsg: "签到不易，且行且珍惜~~",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    app.globalData.shareId = options
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })

    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.request({
      url: app.globalData.apiurl + '/api/punch/getPunchInfo',
      method: 'POST',
      data: {},
      success: function(res) {
        var d = res.data.data;
        that.setData({
          punchList: JSON.parse(d.punchList),
          punchNum: d.punchNum,
        })
        console.log("init punch info")
      }
    })
    if (app.globalData.isUpdate == 0) {
      common.setBusUserInfo()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onloadPunchInfo()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var that = this
    console.log(app.globalData.busUserInfo.id)
    return {
      title: '签到记得礼金，拉新即得惊喜！',
      path: '/pages/index/index?id=' + app.globalData.busUserInfo.id
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onloadPunchInfo: function(e){
    var that = this;
    wx.request({
      url: app.globalData.apiurl + '/api/punch/getPunchInfo',
      method: 'POST',
      data: {},
      success: function (res) {
        var d = res.data.data;
        that.setData({
          punchList: JSON.parse(d.punchList),
          punchNum: d.punchNum,
        })
        console.log("init punch info")
      }
    })
  },
  punch: function(e) {
    var that = this
    that.setData({
      loadModal: true
    })
    wx.request({
      url: app.globalData.apiurl + '/api/punch/punch',
      method: 'POST',
      data: {
        'busUserInfo': JSON.stringify(app.globalData.busUserInfo),
      },
      success: function(res) {
        if (res.data.code == 0) {
          var d = res.data.data;
          that.setData({
            beans: d.beans,
            showMsg: d.showMsg,
          })
        } else {
          that.setData({
            showMsg: res.data.msg,
          })
        }
        that.onloadPunchInfo()
      },
      error: function(res) {
        that.setData({
          showMsg: "签到失败，请稍后重试~",
        })
      }
    })
    setTimeout(() => {
      this.setData({
        loadModal: false,
        showBeans: true
      })
    }, 6000)
  },
  hideModal(e) {
    this.setData({
      showBeans: false,
    })
  },
})