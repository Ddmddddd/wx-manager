var util = require('../../../utils/util.js');
var app = getApp()
Page({

  data: {
    sportinfo: {
      "durationTime": 0,
      "id": 0,
      "intensity": 0,
      "measureTime": "",
      "note": "",
      "sportsType": 0,
      "status": 0,
      "stepCount": 0
    },
    date_sport: util.formatTime2(new Date()),
    time_sport: util.formatTime4(new Date()),
    sportsType: 0,
    sportsname:"",
    durationTime:null,
    intensity:0,
    id:0,
    intensityname:"",
    comment_sport: "",
    step:0,
    sportstypeArr: app.globalData.sportstypeArr,
    intensityArr: app.globalData.intensityArr,
  },
 
  bindDateChange: function (e) {
    this.setData({
      date_sport: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time_sport: e.detail.value
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      sportsType: e.detail.value,
      sportsname: this.data.sportstypeArr[e.detail.value].name
    })
  },

  bindInputdurationTime: function(e) {
    this.setData({
      durationTime: e.detail.value
    })
  },

  bindintensityChange: function (e) {
    this.setData({
      intensity: e.detail.value,
      intensityname: this.data.intensityArr[e.detail.value].name
    })
  },
  bindInputCom: function (e) {
    this.setData({
      comment_sport: e.detail.value
    })
  },
  validate: function () {
    var sportsname = this.data.sportsname, intensityname = this.data.intensityname, durationTime = this.data.durationTime;
    if (sportsname.length <= 0 || intensityname.length <= 0 || durationTime == null || durationTime.length<=0) return false;
    else return true;
  },
  monitor: function () {
    var that = this;
    var sportstring = JSON.stringify(that.data.sportinfo);
    console.log(sportstring)
    try {
      var patientId = wx.getStorageSync('patientid_token');
      var managementId = wx.getStorageSync('managementid_token');
      if (patientId) { console.log("YY" + patientId) }
    } catch (e) { }
    wx.request({
      method: 'POST',
      url: 'https://zjubiomedit.com/HypertensionService.svc/CommitSportsRecord',
      data: {
        "patientId": patientId,
        "managementId": managementId,
        "data": sportstring
      },
      success: function (res) {
        console.log(res);
        wx.navigateBack();
      },
      fail: function (res) {
        console.log(res);
        console.log('is failed')
      }
    })

  },
  finish: function () {
    var step = wx.getStorageSync('step');
    this.setData({
      sportinfo: {
        "measureTime": this.data.date_sport + " " + this.data.time_sport + ": 00",
        "feature": this.data.feature,
        "id": 0,
        "note": this.data.comment_sport,
        "durationTime": this.data.durationTime,
        "intensity": this.data.intensity,
        "sportsType": this.data.sportsType,
        "status": 0,
        "stepCount": step
      },
    })
    if (!this.validate()) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
    this.monitor();
    }
  },

  sportformSubmit: function (e) {
 
    this.setData({
      sportinfo: {
        "measureTime": this.data.date_sport + " " + this.data.time_sport,
        "feature": this.data.feature,
        "id": this.data.id,
        "note": this.data.comment_sport,
        "durationTime": this.data.durationTime,
        "intensity": this.data.intensity,
        "sportsType": this.data.sportsType,
        "status": 254,
        "stepCount": this.data.step
      },
    })
    if (!this.validate()) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
    this.monitor();
    }
  },
  formReset: function (e) {

    this.setData({
      sportinfo: {
        "measureTime": this.data.date_sport + " " + this.data.time_sport,
        "feature": this.data.feature,
        "id": this.data.id,
        "note": this.data.comment_sport,
        "durationTime": this.data.durationTime,
        "intensity": this.data.intensity,
        "sportsType": this.data.sportsType,
        "status": 255,
        "stepCount": this.data.step
      },
    })
    this.monitor();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var datetime = options.time, date, time;
    if (options.id != 0) {
      date = datetime.split(" ")[0];
      time = datetime.split(" ")[1];
      this.setData({
        date_sport: date,
        time_sport: time,
        comment_sport: options.note,
        id: options.id,
        sportsType: options.sportsType,
        sportsname: this.data.sportstypeArr[options.sportsType].name,
        durationTime: options.dur,
        intensity: options.int,
        intensityname: this.data.intensityArr[options.int].name,
        step:options.step
      })
    }
    else {
      this.setData({
        date_sport: util.formatTime2(new Date()),
        time_sport: util.formatTime4(new Date()),
        comment_sport: "",
        id: options.id,
        sportsType: 0,
        sportsname:"",
        durationTime: null,
        intensity: 0,
        intensityname:"",
      })
    }
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