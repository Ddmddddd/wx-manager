// pages/medicine/medicine.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    patientId: "",
    medname: [],
    medvalue: [],
    medicines: [],
    date: [],
    draft: false,
    currentTab: [],
  },

  gettab: function (med) {
    var tabname = med.drugName;
    return tabname.split(",");
  },
  getvalue: function (med) {
    var value = med.dosage;
    return value.split(",");
  },

  refresh: function () {
    var that = this;
    var patientId = this.data.patientId;
    // 获取当日时间
    var end = util.formatTime2(new Date());
    wx.request({
      method: 'GET',
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetMedicationRecords/' + patientId + '/' + end + '/' + end,
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            medicines: res.data,
          })
          console.log(res)
          if (res.data.length != 0) {
            var date = res.data.map(function (item) {
              return item.measureTime.split(" ")
            })
            var medname = res.data.map(that.gettab);
            var medvalue = res.data.map(that.getvalue);
            that.setData({
              medname: medname,
              medvalue: medvalue,
              date: date
            })
          }
        }

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