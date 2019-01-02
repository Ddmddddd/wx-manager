// pages/input/inputwg/inputwg.js
var util = require('../../../utils/util.js');  
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wginfo: {
      "measureTime": "",
      "weight": "",
      "id": 0,
      "note": "",
      "status": 0,
      "type": 0
    },
    date_wg: util.formatTime2(new Date()),
    time_wg: util.formatTime4(new Date()),
    weight: "",
    comment_wg: "",
    id:0,
    status: 0,
  },

  bindDateChange: function (e) {
    this.setData({
      date_wg: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time_wg: e.detail.value
    })
  },
  bindInputWeight: function (e) {

      this.setData({
        weight: e.detail.value
      })
    
  },
  bindInputCom: function (e) {
    this.setData({
      comment_wg: e.detail.value
    })
  },
  validate: function () {
    var weight = this.data.weight;
    if (weight.length <= 0) return 0;
    else{
      weight = Math.abs(weight);
      if(weight<20 || weight> 200) return 1;
      else return -1;
    }
  },
  monitor:function(){
    var that = this;
    var patientId = wx.getStorageSync('patientid_token');
    var managementId = wx.getStorageSync('managementid_token');
    var wgstring = JSON.stringify(that.data.wginfo);
    console.log(wgstring)
    wx.request({
      method: 'POST',
      url: 'https://zjubiomedit.com/HypertensionService.svc/CommitWeightRecord',
      data: {
        "patientId": patientId,
        "managementId": managementId,
        "data": wgstring
      },
      success: function (res) {
        wx.navigateBack();
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
        console.log('is failed')
      }
    })
  },
  finish:function(){
    this.setData({
      status: 0
    })
    this.setData({
      wginfo: {
        "weight": this.data.weight,
        "measureTime": this.data.date_wg + " " + this.data.time_wg+":00",
        "id": this.data.id,
        "note": this.data.comment_wg,
        "status": this.data.status,
        "type": 0
      },
    })
    var validate = this.validate();
    if (validate==0) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if(validate==1){
      wx.showToast({
        title: '请检查体重',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
    this.monitor();
    app.globalData.weighttask--;
    }

  },
  wgformSubmit: function (e) {
    this.setData({
      status: 254
    })
    this.setData({
      wginfo: {
        "weight": this.data.weight,
        "measureTime": this.data.date_wg + " " + this.data.time_wg,
        "id": this.data.id,
        "note": this.data.comment_wg,
        "status": this.data.status,
        "type": 0
      },
    })
    var validate = this.validate();
    if (validate == 0) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if (validate == 1) {
      wx.showToast({
        title: '请检查体重',
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
      status: 255
    })
    this.setData({
      wginfo: {
        "weight": this.data.weight,
        "measureTime": this.data.date_wg + " " + this.data.time_wg,
        "id": this.data.id,
        "note": this.data.comment_wg,
        "status": this.data.status,
        "type": 0
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
        date_wg: date,
        time_wg: time,
        weight:options.weight,
        comment_wg: options.note,
        id: options.id
      })
    }
    else {
      this.setData({
        date_wg: util.formatTime2(new Date()),
        time_wg: util.formatTime4(new Date()),
        weight: "",
        comment_wg: "",
        id: options.id
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