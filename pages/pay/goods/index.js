// pages/pay/goods/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    modalName:"",
    phone:"",
    msgModal:"",
    showName:"",
    exchangeInfo: [{
        id:"",
        url:"/images/good/hf2.png",
        showName:"2000豆兑换2元话费",
        name:2000,
      },
      {
        id: "",
        url: "/images/good/hf2.png",
        showName: "2000豆兑换2元话费",
        name: 2000,
      },
      {
        id: "",
        url: "/images/good/hf2.png",
        showName: "2000豆兑换2元话费",
        name: 2000,
      },
      {
        id: "",
        url: "/images/good/hf2.png",
        showName: "2000豆兑换2元话费",
        name: 2000,
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(232323435)
    var that = this
    wx.request({
      url: app.globalData.apiurl +'/api/goods/listInfo',
      data: {},
      method: 'POST',
      success: function (res) {
        console.log(2323)
        that.setData({
          exchangeInfo: res.data.data,
        })
      },
    })
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
    var that = this
    return {
      title: '签到记得礼金，拉新即得惊喜！',
      path: '/pages/index/index?id=' + app.globalData.busUserInfo.id
    }
  },
  phoneInput: function (e) {
    var phone = e.detail.value;
    this.setData({
      phone: phone
    })
   
  },
  showModal(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var item = that.data.exchangeInfo[index]
    that.setData({
      itemInfo: item,
      itemIndex:index,
      showName:item.showName,
      modalName: "true",
      showMsgInfo:"请输入正确的手机号~~~",
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  hideMsgModal(e){
    this.setData({
      msgModal: null
    })
  },
  commit: function(e){
    var that = this
    var phone = that.data.phone
    var itemInfo = that.data.itemInfo
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phone)) {
      this.setData({
        msgModal: "Modal",
      })
      return;
    }
    wx.request({
      url: app.globalData.apiurl + '/api/goods/exchange',
      data: {
        'busUserInfo': JSON.stringify(app.globalData.busUserInfo),
        'phone':phone,
        'itemInfo': JSON.stringify(itemInfo),
        'itemIndex': that.data.itemIndex,
      },
      method: 'POST',
      success: function(res) {
      
        console.log(res.data)
        if (res.data.code != 0){
          that.setData({
            modalName: null,
            msgModal: "Modal",
            showMsgInfo: res.data.msg,
          })
          return
        }
        that.setData({
          modalName: null,
          msgModal: "Modal",
          showMsgInfo: "恭喜🍾兑换成功,请等待客服紧急充值中~~~",
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})