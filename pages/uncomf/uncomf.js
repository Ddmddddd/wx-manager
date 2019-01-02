// pages/uncomf/uncomf.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uncomfname: [],
    uncomfs: [],
    date: [],
    patientId: "",
    currentTab: [],
    uncomfArr: ['剧烈头痛', '恶心呕吐', '胸痛', '四肢麻木无力', '语言不清']

  },
  getuncomfname: function (uncomf) {
    var that=this;
    var feature = uncomf.feature;
    var uncomfid=[];
    if (feature & 1) uncomfid=uncomfid.concat(0);
    if (feature & 2) uncomfid=uncomfid.concat(1);
    if (feature & 4) uncomfid=uncomfid.concat(2);
    if (feature & 8) uncomfid=uncomfid.concat(3);
    if (feature & 16) uncomfid=uncomfid.concat(4);
    console.log(feature & 4 )
    console.log( uncomfid) 
    return uncomfid.map(function(id){
      return that.data.uncomfArr[id]
    })

  },
 
  refresh: function () {
    var that = this;
    var patientId = this.data.patientId;
    // 获取当日时间
    var end = util.formatTime2(new Date());
    wx.request({
      method: 'GET',
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetDiscomfortRecords/' + patientId + '/' + end + '/' + end,
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            uncomfs: res.data
          })
          if (res.data.length != 0) {
          var date = res.data.map(function (item) {
            return item.measureTime.split(" ")
          })
          var uncomfname = res.data.map(that.getuncomfname);
          that.setData({
            uncomfname: uncomfname,
            date: date
          })
        }}
        console.log(res);
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