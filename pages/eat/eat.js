// pages/eat/eat.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodtype: [],
    appetite: [],
    foods: [],
    date:[],
    patientId:"",
    currentTab: [],
    foodArr: app.globalData.foodArr,
    typeArr: ["早餐", "午餐", "晚餐", "其他"],
    eattype: [],
    hidden:0,

  },

  typestr2arr: function (food) {
    var that = this;
    var str = food.kinds;
    var arr = str.split(",");
    arr=arr.map(function(str){
      return +str;
    })
    return arr.map(function (id) {
      return that.data.foodArr[0][id].name;
    })
  },
  appetitestr2arr: function (food) {
    var str = food.appetite;
    return str.split(",");
  },
  gettype: function (food) {
    var that = this;
    var type0 = food.type;
    if (type0 == 0){
      that.setData({
        hidden:that.data.hidden+1
      });
      return that.data.typeArr[type0];
      }
    else if (type0 == 1){
      that.setData({
        hidden: that.data.hidden + 2
      });
      return that.data.typeArr[type0];
    }
    else if (type0 == 2) {
      that.setData({
        hidden: that.data.hidden + 4
      });
      return that.data.typeArr[type0];
    }
    else
      return that.data.typeArr[3];
  },

  refresh:function(){
    var that = this;
    var patientId = this.data.patientId;
    // 获取当日时间
    var end = util.formatTime2(new Date());
    wx.request({
      method: 'GET',
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetEatingRecords/' + patientId + '/' + end + '/' + end,
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            foods: res.data,
            hidden: 0
          })
          if (res.data.length != 0) {
          var date = res.data.map(function (item) {
            return item.measureTime.split(" ")
          })
          console.log(date)
          var foodtype = res.data.map(that.typestr2arr);
          var appetite = res.data.map(that.appetitestr2arr);
          var eattype = res.data.map(that.gettype);
          that.setData({
            foodtype: foodtype,
            appetite: appetite,
            eattype: eattype,
            date:date
          })
        }}

      },
      fail: function (res) {
        console.log(res);
        console.log('is failed')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      var patientId = wx.getStorageSync('patientid_token');
    } catch (e) { }
    this.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
      patientId: patientId,
    })

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
    this.refresh();
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
    this.refresh();
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