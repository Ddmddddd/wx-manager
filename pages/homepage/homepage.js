// pages/homepage/homepage.js
var util = require('../../utils/util.js');
import { request } from "../../utils/Request";
import { eduTodayLoginApi } from "../../utils/config";
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: "",
    registDate: "",
    diastolicPressureGoal: "",
    systolicPressureGoal: "",
    returnVisitDate: "",
    todayRecords: "",
    registTime: 0,
    patientId: '',
    bptask: 0,
    weighttask: 0,
    medtask: 0,
    classtask:0
  },

  todayStudyList: function() {
    var that = this;
    var patientId = wx.getStorageSync("patientid_token");
    var url = eduTodayLoginApi + patientId;
    request({ url }).then(res => {
      const { data } = res
      if (data.success) {
        app.globalData.classtask = data.result ? data.result.length : 0
        that.setData({
          classtask: app.globalData.classtask
        })
      }
    });
  },
  calregistTime: function (registDate) {
    var d1 = new Date(registDate);
    var d2 = new Date();
    var day = Math.floor(parseInt(d2.getTime() - d1.getTime()) / (24 * 3600 * 1000));
    this.setData({
      registTime: day
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    var nickname = wx.getStorageSync('nickname');
    var bptask = app.globalData.managementPlan.bpTaskList.length - app.globalData.todayRecords.bpRecordList.length;
    var weighttask = app.globalData.managementPlan.weightTaskList.length - app.globalData.todayRecords.weightRecordList.length;
    var medtask = app.globalData.managementPlan.medicationTaskList.length - app.globalData.todayRecords.medicationRecordList.length
    this.setData({
      nickname: nickname || "未知用户",
      todayRecords: app.globalData.todayRecords || [],
      registDate: app.globalData.loginUserInfo.registDate || "2016/6/23 18:18:53",
      diastolicPressureGoal: app.globalData.managementPlan.diastolicPressureGoal || 80,
      systolicPressureGoal: app.globalData.managementPlan.systolicPressureGoal || 120,
      returnVisitDate: app.globalData.managementPlan.returnVisitDate || "",
      bptask: bptask,
      weighttask: weighttask,
      medtask: medtask,
      // nickname:"未知用户",
      // todayRecords:[],
      // registDate:"2016/6/23 18:18:53",
      // diastolicPressureGoal: 80,
      // systolicPressureGoal:120,
      // returnVisitDate: "2019-6-23",
    })
    // console.log(this.data.todayRecords.bpRecordList.length)
    this.todayStudyList()
    app.globalData.bptask = bptask;
    app.globalData.weighttask = weighttask;
    app.globalData.medtask = medtask;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var date = util.formatTime2(new Date());
    var time = util.formatTime4(new Date());
    this.setData({
      xcxinfo: {
        "os": "小程序",
        "appVersion": "1.1.0",
        "eventName": "e_Main_Xcxlogin",
        "eventTime": date + " " +time + ":00"
      },
    })
    var xcxinfostring = JSON.stringify(this.data.xcxinfo);
    var patientId = wx.getStorageSync('patientid_token');
    // console.log(xcxinfostring)
    // console.log(patientId)
    wx.request({
      url: 'https://zjubiomedit.com/AuxiliaryService.svc/CommitUsabilityInfo',
      data: {
        "appId": "hypertension",
        "userId": patientId,
        "data": xcxinfostring,
        "dataType": 2
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        if (res.data.flag == 0) {
          console.log(res.data);
        }
        else {

        }
      },
      fail: function (res) {
        console.log(res.data);
        console.log('is failed')
      }
    })
    wx.hideLoading();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.calregistTime(this.data.registDate);
    this.setData({
      bptask: app.globalData.bptask,
      weighttask: app.globalData.weighttask,
      medtask: app.globalData.medtask,
      classtask:app.globalData.classtask
    })
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

  },

})