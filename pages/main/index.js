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
    elements: [{
        title: '11202',
        name: '1秒前',
        color: '20',
        cuIcon: 'newsfill'
      },
      {
        title: '11202',
        name: '23秒前',
        color: '20',
        cuIcon: 'colorlens'
      },
      {
        title: '11202',
        name: '23秒前',
        color: '20',
        cuIcon: 'font'
      },
      {
        title: '11202',
        name: '20-01-01 99:21',
        color: '20',
        cuIcon: 'cuIcon'
      },
      {
        title: '11202',
        name: '23秒前',
        color: '20',
        cuIcon: 'btn'
      },
      {
        title: '11202',
        name: '20-01-01 99:21',
        color: '20',
        cuIcon: 'tagfill'
      },
      {
        title: '11202',
        name: '20-01-01 99:21',
        color: '20',
        cuIcon: 'myfill'
      },
      {
        title: '11202',
        name: '20-01-01 99:21',
        color: '20',
        cuIcon: 'icloading'
      },
      {
        title: '11202',
        name: '20-01-01 99:21',
        color: '20',
        cuIcon: 'copy'
      },
      {
        title: '11202',
        name: '20-01-01 99:21',
        color: '20',
        cuIcon: 'loading2'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      common.setBusUserInfo()
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
    return {
      title: '邀请好友得福利币',
      path: '/pages/main/index?id=123'
    }
  },
  getUserInfo: function(e) {
    console.log(4)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})