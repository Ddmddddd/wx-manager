// pages/input/inputbp/inputbp.js
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bpinfo: {
      "measureTime": "",
      "systolicPressure": "",
      "diastolicPressure": "",
      "heartRate": "",
      "id": 0,
      "note": "",
      "status": 0,
      "type": 0
    },
    date_bp: util.formatTime2(new Date()),
    time_bp: util.formatTime4(new Date()),
    hbp_bp: "",
    lbp_bp: "",
    hr_bp: "",
    comment_bp: "",
    id: 0,
    status: 0,
  },

  //page func
  bindDateChange: function (e) {
    this.setData({
      date_bp: e.detail.value,

    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time_bp: e.detail.value,

    })
  },
  bindInputHbp: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {
      this.setData({
        hbp_bp: e.detail.value
      })
    }
  },
  bindInputLbp: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {
      this.setData({
        lbp_bp: e.detail.value
      })
    }
  },
  bindInputHr: function (e) {
    var n = e.detail.value;
    if (!isNaN(n)) {
      this.setData({
        hr_bp: e.detail.value
      })
    }
  },
  bindInputCom: function (e) {
    this.setData({
      comment_bp: e.detail.value
    })
  },
  validate: function () {
    var sp = this.data.hbp_bp, dp = this.data.lbp_bp, hr = this.data.hr_bp;
    console.log(dp)
    Math.round//取整，四舍六入五成双
    if (sp.length <= 0 || dp.length <= 0 || hr.length <= 0) return 0;
    else {
      sp = Math.round(sp);
      dp = Math.round(dp);
      hr = Math.round(hr);
      if (sp < 60 || sp > 200) return 1;//对应数据不合理需要进行报错
      else if (dp < 40 || dp > sp) return 2;
      else if (hr < 30 || hr > 200) return 3;
      else return -1;
    }
  },
  monitor: function () {//监测数据是否为空
    var that = this;
    var validate = this.validate();
    console.log(validate)
    if (validate == 0) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if (validate == 1) {
      wx.showToast({
        title: '请检查收缩压',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if (validate == 2) {
      wx.showToast({
        title: '请检查舒张压',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else if (validate == 3) {
      wx.showToast({
        title: '请检查心率',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
      var bpstring = JSON.stringify(that.data.bpinfo);//将对象的类型转换为字符串类型
      console.log(bpstring)
      try {
        var patientId = wx.getStorageSync('patientid_token');
        var managementId = wx.getStorageSync('managementid_token');
        if (patientId) { console.log("YY" + patientId) }
      } catch (e) { }
      wx.request({
        method: 'POST',
        // url: 'http://cdmis-test.vico-lab.com:19610/drools_service/monitor',
        url: 'https://zjubiomedit.com/drools_service/monitor',//调用接口
        data: {
          "patientId": patientId,
          "managementId": managementId,
          "data": bpstring
        },
        success: function (res) {
          console.log(res);
          //wx.navigateBack();
          var data = JSON.stringify(res.data)
          wx.redirectTo({
            url: '../inputtip/inputtip?data=' + data + '&sp=' + that.data.hbp_bp + '&dp=' + that.data.lbp_bp + '&hr=' + that.data.hr_bp,//关闭当前界面，跳转到应用内的某个界面
          })
        },
        fail: function (res) {
          console.log(res);
          console.log('is failed')
        }
      })
    }
  },
  finish: function () {//完成录入
    this.setData({
      status: 0
    })
    this.setData({
      bpinfo: {
        "systolicPressure": this.data.hbp_bp,
        "diastolicPressure": this.data.lbp_bp,
        "heartRate": this.data.hr_bp,
        "measureTime": this.data.date_bp + " " + this.data.time_bp + ":00",
        "id": this.data.id,
        "note": this.data.comment_bp,
        "status": this.data.status,
        "type": 0
      },
    })
    this.monitor();
    app.globalData.bptask--;
  },
  formReset: function () {
    this.setData({
      status: 255
    })
    var that = this;
    this.setData({
      bpinfo: {
        "systolicPressure": this.data.hbp_bp,
        "diastolicPressure": this.data.lbp_bp,
        "heartRate": this.data.hr_bp,
        "measureTime": this.data.date_bp + " " + this.data.time_bp,
        "id": this.data.id,
        "note": this.data.comment_bp,
        "status": this.data.status,
        "type": 0
      },
    })
    var bpstring = JSON.stringify(that.data.bpinfo);
    console.log(bpstring)
    try {
      var patientId = wx.getStorageSync('patientid_token');
      var managementId = wx.getStorageSync('managementid_token');
      if (patientId) { console.log("YY" + patientId) }
    } catch (e) { }
    wx.request({
      method: 'POST',
      url: 'https://zjubiomedit.com/drools_service/monitor',
      data: {
        "patientId": patientId,
        "managementId": managementId,
        "data": bpstring
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
  bpformSubmit: function (e) {
    this.setData({
      status: 254
    })
    this.setData({
      bpinfo: {
        "systolicPressure": this.data.hbp_bp,
        "diastolicPressure": this.data.lbp_bp,
        "heartRate": this.data.hr_bp,
        "measureTime": this.data.date_bp + " " + this.data.time_bp,
        "id": this.data.id,
        "note": this.data.comment_bp,
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
        date_bp: date,
        time_bp: time,
        hbp_bp: options.sp,
        lbp_bp: options.dp,
        hr_bp: options.hr,
        comment_bp: options.c,
        id: options.id
      })
    }
    else {
      this.setData({
        date_bp: util.formatTime2(new Date()),
        time_bp: util.formatTime4(new Date()),
        hbp_bp: "",
        lbp_bp: "",
        hr_bp: "",
        comment_bp: "",
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