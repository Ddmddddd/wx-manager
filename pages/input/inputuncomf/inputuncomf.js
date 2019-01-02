// pages/input/inputuncomf/inputuncomf.js
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uncomfinfo: {
      "measureTime": "",
      "feature": 0,
      "id": 0,
      "note": "",
      "status": 0
    },
    date_uncomf: util.formatTime2(new Date()),
    time_uncomf: util.formatTime4(new Date()),
    id:0,
    feature: 0,
    comment_uncomf: "",
  },
  switch0: function (e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({
        feature: this.data.feature + 1
      })
    }
    else {
      this.setData({
        feature: this.data.feature - 1
      })
    }
  },
  switch1: function (e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({
        feature: this.data.feature +2
      })
    }
    else {
      this.setData({
        feature: this.data.feature -2
      })
    }
  },
  switch2: function (e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({
        feature: this.data.feature +4
      })
    }
    else {
      this.setData({
        feature: this.data.feature -4
      })
    }
  },
  switch3: function (e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({
        feature: this.data.feature +8
      })
    }
    else {
      this.setData({
        feature: this.data.feature -8
      })
    }
  },
  switch4: function (e) {
    console.log(e.detail.value)
    if (e.detail.value) {
      this.setData({
        feature: this.data.feature + 16
      })
    }
    else {
      this.setData({
        feature: this.data.feature - 16
      })
    }
  },
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      date_uncomf: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      time_uncomf: e.detail.value
    })
  },

  bindInputCom: function (e) {
    console.log(e.detail.value)
    this.setData({
      comment_uncomf: e.detail.value
    })
  },
  validate: function () {
    var feature = this.data.feature;
    if (feature <= 0) return false;
    else return true;
  },
  monitor: function () {
    var that = this;
    var uncomfstring = JSON.stringify(that.data.uncomfinfo);
    console.log(uncomfstring)
    try {
      var patientId = wx.getStorageSync('patientid_token');
      var managementId = wx.getStorageSync('managementid_token');
      if (patientId) { console.log("YY" + patientId) }
    } catch (e) { }
    wx.request({
      method: 'POST',
      url: 'https://zjubiomedit.com/HypertensionService.svc/CommitDiscomfortRecord',
      data: {
        "patientId": patientId,
        "managementId": managementId,
        "data": uncomfstring
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
    this.setData({
      uncomfinfo: {
        "measureTime": this.data.date_uncomf + " " + this.data.time_uncomf + ": 00",
        "feature": this.data.feature,
        "id": 0,
        "note": this.data.comment_uncomf,
        "status": 0
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
  UncomfformSubmit: function (e) {
    this.setData({
      uncomfinfo: {
        "measureTime": this.data.date_uncomf + " " + this.data.time_uncomf,
        "feature": this.data.feature,
        "id": this.data.id,
        "note": this.data.comment_uncomf,
        "status": 254
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
      uncomfinfo: {
        "measureTime": this.data.date_uncomf + " " + this.data.time_uncomf,
        "feature": this.data.feature,
        "id": this.data.id,
        "note": this.data.comment_uncomf,
        "status": 255
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
        date_med: date,
        time_med: time,
        comment_med: options.note,
        id: options.id,
        feature: parseInt(options.feature)
      })
    }
    else {
      this.setData({
        date_med: util.formatTime2(new Date()),
        time_med: util.formatTime4(new Date()),
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