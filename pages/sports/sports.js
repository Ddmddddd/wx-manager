// pages/sports/sports.js
// var WXBizDataCrypt = require('../../utils/WXBizDataCrypt')
var app = getApp()
var ctx = wx.createCanvasContext('canvasArcCir');
var util = require('../../utils/util.js');
Page({

  data: {
    //步数请求
    appId: 'wx11204114336f3083',
    session_key: "",
    openId: "",
    targetstep: 9000,
    timestamp: 0,
    step: 0,
    //运动记录
    sports: [],
    patientId: "",
    currentTab: [],
    sportstypeArr: app.globalData.sportstypeArr,
    intensityArr: app.globalData.intensityArr,
    sporttype: [],
    intensity: [],
    date:[],
  },

  getsporttype: function (sport) {
    var type0 = sport.sportsType;
    var walk='走步';
    if(type0==6){
      return walk;
    }
    else{
      return this.data.sportstypeArr[type0].name;
    }

  },
  getintensity: function (sport) {
    var type1 = sport.intensity;
    return this.data.intensityArr[type1].name;
  },
 
  //获取encryptedData（没有解密的步数）和iv（加密算法的初始向量）
  getData: function (appId, session_key, that) {
    var that = that;
    wx.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.werun']) {
          wx.authorize({
            scope: 'scope.werun',
            success: function (res) {
              //授权
            },
            fail: function (res) {//未授权
              wx.showModal({
                title: '提示',
                content: '获取微信运动授权失败',
                showCancel: false,
                confirmText: '知道了'
              })
            }
          })
        }

        wx.getWeRunData({
          success: function (res) {
            //  console.log(res);
            // console.log("appid:" + appId + "session_key:" + session_key + "encryptedData:" + res.encryptedData + "iv:" + res.iv);
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            var pc = new WXBizDataCrypt(appId, session_key);
            var data = pc.decryptData(encryptedData, iv)
            // console.log(data.stepInfoList[30]);
            that.setData({
              timestamp: data.stepInfoList[30].timestamp,
              step: data.stepInfoList[30].step,
            })
            that.drawCircle(that.data.step, that.data.targetstep);
            wx.setStorageSync('step', that.data.step);
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '开发者未开通微信运动，请关注“微信运动”公众号后重试',
              showCancel: false,
              confirmText: '知道了'
            })
          }
        })
      }
    })
  },

  drawCircle: function (step, targetstep) {
    var startAngle = 1.5 * Math.PI, endAngle = step * 2.0 * Math.PI / targetstep + 1.5 * Math.PI;
    // console.log(startAngle + "end" + endAngle)
    ctx.setFillStyle('white');
    ctx.clearRect(0, 0, 180, 180);
    ctx.draw();
    var x = 90, y = 90, radius = 86;
    ctx.setLineWidth(5);
    ctx.setStrokeStyle('#d81e06');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.stroke()
    ctx.draw()

  },

  refresh: function () {
    var that = this
    var patientId = this.data.patientId;
    // 获取当日时间
    var end = util.formatTime2(new Date());
    wx.request({
      method: 'GET',
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetSportsRecords/' + patientId + '/' + end + '/' + end,
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            sports: res.data
          })
          console.log(res.data.length)
          if(res.data.length!=0){
            var date = res.data.map(function (item) {
              return item.measureTime.split(" ")
            })
            var sporttype = res.data.map(that.getsporttype);
            var intensity = res.data.map(that.getintensity);
            that.setData({
              sporttype: sporttype,
              intensity: intensity,
              date: date
            })
          }
        }
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
    var that = this;
    try {
      var patientId = wx.getStorageSync('patientid_token');
    } catch (e) { }
    this.setData({
      patientId: patientId,
    })
    // wx.login({
    //   //获取code
    //   success: function (res) {
    //     var code = res.code; //返回code
    //     // console.log(code);
    //     var appId = that.data.appId;
    //     var secret = '9532280f44ed25acec5e360c5b501b6d';
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
    //       data: {},
    //       header: {
    //         'content-type': 'json'
    //       },
    //       success: function (res) {
    //         var openid = res.data.openid //返回openid
    //         var session_key = res.data.session_key;
    //         // console.log(session_key);
    //         // console.log('openid为' + openid);
    //         that.setData({
    //           session_key: session_key,
    //           openId: openid,
    //         })
    //         that.getData(appId, session_key, that);
    //       }
    //     })
    //   }
    // })

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //创建并返回绘图上下文context对象。
    // var cxt_arc = wx.createCanvasContext('canvasCircle');
    // cxt_arc.setLineWidth(6);
    // cxt_arc.setStrokeStyle('#eaeaea');
    // cxt_arc.setLineCap('round');
    // cxt_arc.beginPath();
    // cxt_arc.arc(90, 90, 86, 0, 2 * Math.PI, false);
    // cxt_arc.stroke();
    // cxt_arc.draw();
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
    // app.globalData.patient_data.todayRecords.sportsRecordList = this.data.sports;
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