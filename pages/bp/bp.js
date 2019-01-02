// pages/bp/bp.js
var util = require('../../utils/util.js');
import * as echarts from '../../components/ec-canvas/echarts.min';
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad: true
    },
    bps: [],
    visiblebps: [],
    date:[],
    visibleDate: "",
    windowWidth: 0,
    windowHeight: 0,
    patientId:"",
    currentTab: [],
  },
  NavChart:function(){
    wx.navigateTo({
      url: '../charts/bplinechart/bplinechart',
    })
  },
  createData: function () {//数据处理
    var that = this
    var average = [];
    var bps = this.data.bps;
    var n = bps.length;
    bps.sort(function (a, b) {
      if (a.measureTime < b.measureTime) {
        return 1;
      } else if (a.measureTime > b.measureTime) {
        return -1;
      } else {
        return 0;
      }
    });//排序

    var visiblebps = bps.filter(function (item) {
      return (item.measureTime) >= (that.data.visibleDate)
    })//filter:返回符合条件的元素的数组 
    var date = visiblebps.map(function (item) {
      return item.measureTime.split(" ")
    })//map:通过指定函数处理后返回对应元素  split：分割字符串
    this.setData({
      bps: bps,
      date: date,
      visiblebps: visiblebps
    })
    average = bps.map(function (item) {
      var sp = parseInt(item.systolicPressure);
      var dp = parseInt(item.diastolicPressure);
      return Math.round((sp + 2 * dp) / 3)
    })
    return average
  },

  setOption: function (chart) {//画图

    var dataAxis = [];
    var data = (this.createData()).reverse();//reverse:翻转数组元素顺序
    var yMax = 200;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);//用yMax填满数组背景最大值
    }
    var option = {
      title: {
        text: '平均血压趋势',
        padding: [20, 20, 0, 20],
        textStyle: {
          color: '#188df0',
          fontWeight: 'bold',
          fontSize: 20
        },
      },
      xAxis: {
        data: dataAxis,//x轴无数字
        axisLabel: {

        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10//画布上的优先级，z值小的会被大的覆盖
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      },
      series: [
        { // For shadow
          type: 'bar',//柱状图
          itemStyle: {
            normal: { color: 'rgba(0,0,0,0.05)' }
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false
        },
        {//填入具体数据
          type: 'bar',
          itemStyle: {
            color: '#83bff6' 
           },
          data: data
        }
      ]
    };
    chart.setOption(option);
  },
  init: function () {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(chart);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      this.setData({
        isLoaded: true,
        isDisposed: false
      });

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
 /**
   * 刷新数据函数
   */
  refresh:function(){
    var patientId=this.data.patientId;
    var that=this;
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    // 获取当日时间
    var now = new Date();
    var end = util.formatTime2(now);
   // var start = util.formatTime3(now);
    var start = util.formatTime2(new Date(now - 90 * 24 * 3600 * 1000));
    var visibleDate = util.formatTime2(new Date(now - 7 * 24 * 3600 * 1000));
    console.log(start)
    wx.request({
      method: 'GET',
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetBloodPressureRecords/' + patientId + '/' + start + '/' + end,
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            bps: res.data,
            visibleDate: visibleDate + " 00:00:00"
          })
          app.globalData.bps = res.data;
          that.init();
         
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
    var that = this;
    var patientId="";
    if (options.patientId){
      patientId = options.patientId;
    }
    else{
      try {
        var patientId = wx.getStorageSync('patientid_token');
      } catch (e) { }
    }
    this.setData({
      windowWidth: app.globalData.windowWidth,
      windowHeight: app.globalData.windowHeight,
      patientId: patientId
    })
    wx.showShareMenu({
      withShareTicket: true,
    })
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    var that = this
    this.refresh();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    this.refresh();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },



  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      isLoaded: false,
      isDisposed: false
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
    return {
      title: '这里是撞墙扭到脖子的盛夏',
      path: '/pages/bp/bp?patientid=' + this.data.patientId,
      success: function (res) {
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
        
      },
      fail: function (res) {
        // 分享失败
        console.log(res)
      }
    }
  },

})