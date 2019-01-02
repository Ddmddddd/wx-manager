// pages/input/inputevaluate/inputevaluate.js
Page({


  
  /**
   * 页面的初始数据
   */
  data: {
    showdrink:false,
    showsmoke:false,
    showdiabetes:false,
    showtbc:false,
    showHdlc:false,
    showBheight:false,
    showBweight:false,
  },
  tbc:function(){
    this.setData({
      showtbc:true
    })
  },
  drink: function () {
    this.setData({
      showdrink: true,
    })
  },
  smoke: function () {
    this.setData({
      showsmoke: true,
    })
  },
  diabetes:function(){
    this.setData({
      showdiabetes:true,
    })
  },
  Hdlc:function(){
    this.setData({
      showHdlc:true,
    })
  },
  Bheight: function () {
    this.setData({
      showBheight: true,
    })
  },
  Bweight: function () {
    this.setData({
      showBweight: true,
    })
  },
  preventTouchMove: function () {
  },
  hideModal: function () {
    this.setData({
      showdrink: false,
      showsmoke:false,
      showdiabetes:false,
      showtbc:false,
      showHdlc:false,
      showBheight:false,
      showBweight:false,
    });
  },
  onCancel: function () {
    this.hideModal();
  },

  finishevaluate:function(){
    wx.navigateTo({
      url: '/pages/result/result',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})