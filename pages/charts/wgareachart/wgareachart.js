// pages/charts/wglinechart/wglinechart.js
var util = require('../../../utils/util.js');
var wxCharts = require('../../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var startPos = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wgs: [],
    winWidth: 0,
    winHeight: 0,
    enableScroll: false,
  },

  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }//点击显示详情
    });
  },

  createData: function () {
    var that = this;
    var categories = [];
    var wgdata = [];
    var wgs = (this.data.wgs).reverse();
    if (wgs.length > 20) {
      that.setData({
        enableScroll: true
      })
    }
    else {
      that.setData({
        enableScroll: false
      })
    }
    for (var i = 0; i < wgs.length; i++) {
      categories.push(wgs[i].measureTime);//测量时间
      wgdata.push(wgs[i].weight);//测量数据
    }
    return {
      categories: categories,
      wgdata: wgdata,
    }
  },

  drawlinechart: function (e) {

    var weekData = this.createData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: weekData.categories,
      animation: true,
      series: [{
        name: '体重',
        data: weekData.wgdata,

      }],
      yAxis: {
        title: 'Kg',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 25,
        // fontColor: '#83bff6',
        // gridColor: '#8085e9',
        // titleFontColor: '#f7a35c'
      },
      xAxis: {
        // fontColor: '#7cb5ec',
        // gridColor: '#7cb5ec'
      },
      extra: {
        // legendTextColor: '#cb2431'
      },
      width: this.data.windowWidth - 5,
      enableScroll: this.data.enableScroll,
      height: this.data.windowHeight - 100
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wgs: app.globalData.wgs,
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
    });
    if (this.data.wgs.length <= 0) {
      wx.showModal({
        title: '提示',
        content: '近三月暂无体重数据',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.navigateBack({
            })
          }
        }
      })
    }
    else {
      this.drawlinechart()
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