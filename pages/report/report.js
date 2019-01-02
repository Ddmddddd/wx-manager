// pages/report/report.js
var util = require('../../utils/util.js');
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    BMIstatus:"",
    //part1
    monthlyScore:0,
    bpRealTimes:28,
    bpGoalTimes:30,
    weightRealTimes:4,
    weightGoalTimes:5,
    drugReallTimes:4,
    drugGoalTimes:30,
    //part2
    currentBP: "188/152",
    goalBP: "120/90",
    currentBPLevel:6,
    bpStandardTimes: 0,
    bpHigherTimes: 0,
    bpLowerTimes: 0,
    sbpAVG: 138,
    sbpLine: [],
    sbpMax: 188,
    sbpMax_Time: "2018-02-28 10:33",
    sbpMin: 111,
    sbpMin_Time: "2018-02-27 21:56",
    dbpAVG: 97,
    dbpLine: [],
    dbpMax: 152,
    dbpMax_Time: "2018-02-28 10:33",
    dbpMin: 65,
    dbpMin_Time: "2018-02-27 21:56",
    bpDifAVG: 41,
    bpDifMax: 46,
    bpDifMax_Time: "2018-02-27 21:56",
    bpDifMin: 36,
    bpDifMin_Time: "2018-02-28 10:33",
    //part3
    hrAVG: 75,
    hrHigherTimes: 0,
    hrStandardTimes: 3,
    hrLowerTimes: 0,
    hrMax: 84,
    hrMax_Time: "2018-02-09 16:09",
    hrMin: 61,
    hrMin_Time: "2018-02-07 11:44",
    hrRealTimes: 3,
    hrLine: [],
    //part4
    currentWeight:72,
    goalWeight: 0,
    currentBMI: 0,
    goalBMI: 24,
    //part5
    currentRanking: 6,
    defeatNum: 1572,
    goUpNum: 0,
    predictNextRanking: 5,
    //part6
    bpStar: "00972851",
    scoreStar: "05472450",
    persistenceStar: "05472450",
    bestBP: "101/67",
    bestDays: "821",
    bestScore: "69763",
    //part7
    bpstapercent:0,
    bphighpercent:0,
    bplowpercent:0,
    hrstapercent:0,
    hrhighpercent:0,
    hrlowpercent:0,
  },


  drawmonthlyScore:function(){
    var cxt_arc = wx.createCanvasContext('canvasCircle1');
    cxt_arc.setLineWidth(8);
    cxt_arc.setStrokeStyle('#eaeaea');
    cxt_arc.setLineCap('round');
    cxt_arc.beginPath();
    cxt_arc.arc(60, 60, 53, 0, 2 * Math.PI, false);
    cxt_arc.stroke();
    cxt_arc.draw();
    var monthlyScore = this.data.monthlyScore;
    var ctx = wx.createCanvasContext('canvasArcCir');
    var startAngle = 1.5 * Math.PI, endAngle = monthlyScore * 2 * Math.PI / 100 + 1.5 * Math.PI;
    ctx.setFillStyle('white');
    ctx.clearRect(0, 0, 120, 120);
    ctx.draw();
    var x = 60, y = 60, radius = 53;
    ctx.setLineWidth(7);
    ctx.setStrokeStyle('#1e90ff');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.stroke()
    ctx.draw()
  },
  drawbpTimes:function(){
    var bpStandardTimes = this.data.bpStandardTimes, bpHigherTimes = this.data.bpHigherTimes, bpLowerTimes = this.data.bpLowerTimes;
    var totalTimes = this.data.bpRealTimes;
    var startAngle = 1.5 * Math.PI, lowAngle = bpLowerTimes * 2 * Math.PI / totalTimes + 1.5 * Math.PI, staAngle = bpStandardTimes * 2 * Math.PI / totalTimes, highAngle = bpHigherTimes * 2 * Math.PI / totalTimes;
    var cxt_arc = wx.createCanvasContext('canvasCircle2');
    cxt_arc.setLineWidth(8);
    cxt_arc.setStrokeStyle('#1e90ff');
    cxt_arc.beginPath();
    cxt_arc.arc(60, 60, 53, startAngle, lowAngle, false);
    cxt_arc.stroke();
    cxt_arc.setStrokeStyle('#32cd32');
    cxt_arc.beginPath();
    cxt_arc.arc(60, 60, 53, lowAngle, lowAngle + staAngle, false);
    cxt_arc.stroke();
    cxt_arc.setStrokeStyle('#ff4500');
    cxt_arc.beginPath();
    cxt_arc.arc(60, 60, 53, lowAngle + staAngle, lowAngle + staAngle + highAngle, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  drawhrTimes: function () {
    var hrStandardTimes = this.data.hrStandardTimes, hrHigherTimes = this.data.hrHigherTimes, hrLowerTimes = this.data.hrLowerTimes;
    var totalTimes = this.data.hrRealTimes;
    var startAngle = 1.5 * Math.PI, lowAngle = hrLowerTimes * 2 * Math.PI / totalTimes + 1.5 * Math.PI, staAngle = hrStandardTimes * 2 * Math.PI / totalTimes, highAngle = hrHigherTimes * 2 * Math.PI / totalTimes;
    var cxt_arc = wx.createCanvasContext('canvasCircle3');
    cxt_arc.setLineWidth(8);
    cxt_arc.setStrokeStyle('#1e90ff');
    cxt_arc.beginPath();
    cxt_arc.arc(60, 60, 53, startAngle, lowAngle, false);
    cxt_arc.stroke();
    cxt_arc.setStrokeStyle('#32cd32');
    cxt_arc.beginPath();
    cxt_arc.arc(60, 60, 53, lowAngle, lowAngle + staAngle, false);
    cxt_arc.stroke();
    cxt_arc.setStrokeStyle('#ff4500');
    cxt_arc.beginPath();
    cxt_arc.arc(60, 60, 53, lowAngle + staAngle, lowAngle + staAngle + highAngle, false);
    cxt_arc.stroke();
    cxt_arc.draw();
  },
  getBMIstatus:function(){
    var currentBMI = this.data.currentBMI;
    if (currentBMI < 18.5) {this.setData({ BMIstatus:"bmi0"  });}
    else if (currentBMI >= 18.5 && currentBMI < 25) { this.setData({ BMIstatus: "bmi1" }); }
    else if (currentBMI >= 25 && currentBMI < 28) { this.setData({ BMIstatus: "bmi2" }); }
    else if (currentBMI >= 28 && currentBMI < 32) { this.setData({ BMIstatus: "bmi3" }); }
    else if (currentBMI >= 32) { this.setData({ BMIstatus: "bmi4" }); }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var patientId = wx.getStorageSync('patientid_token');
    var now = new Date();
    var yearMonth = util.formatTime5(now);
    console.log(yearMonth);
    wx.request({
      method: 'POST',
      // url: 'http://cdmis-test.vico-lab.com:19611/HypertensionService.svc/DownloadMonthlyReport',
      //只有月报替换了URL
      url:'https://zjubiomedit.com/HypertensionService.svc/DownloadMonthlyReport',
      data: {
        patientId: patientId,
        yearMonth: yearMonth
      },
      success: function (res) {
        console.log(res);
        if (res.data.flag == 0) {
          var obj=res.data.obj;
          that.setData({
            //part1
            monthlyScore: obj.monthlyScore,
            bpRealTimes: obj.bpRealTimes,
            bpGoalTimes: obj.bpGoalTimes,
            weightRealTimes: obj.weightRealTimes,
            weightGoalTimes: obj.weightGoalTimes,
            drugReallTimes: obj.drugReallTimes,
            drugGoalTimes: obj.drugGoalTimes,
            //part2
            currentBP: obj.currentBP,
            goalBP: obj.goalBP,
            currentBPLevel: obj.currentBPLevel,
            bpStandardTimes: obj.bpStandardTimes,
            bpHigherTimes: obj.bpHigherTimes,
            bpLowerTimes: obj.bpLowerTimes,
            sbpAVG: obj.sbpAVG,
            sbpLine: obj.sbpLine,
            sbpMax: obj.sbpMax,
            sbpMax_Time: obj.sbpMax_Time,
            sbpMin: obj.sbpMin,
            sbpMin_Time: obj.sbpMin_Time,
            dbpAVG: obj.dbpAVG,
            dbpLine: obj.dbpLine,
            dbpMax: obj.dbpMax,
            dbpMax_Time: obj.dbpMax_Time,
            dbpMin: obj.dbpMin,
            dbpMin_Time: obj.dbpMin_Time,
            bpDifAVG: obj.bpDifAVG,
            bpDifMax: obj.bpDifMax,
            bpDifMax_Time: obj.bpDifMax_Time,
            bpDifMin: obj.bpDifMin,
            bpDifMin_Time: obj.bpDifMin_Time,
            //part3
            hrAVG: obj.hrAVG,
            hrHigherTimes: obj.hrHigherTimes,
            hrStandardTimes: obj.hrStandardTimes,
            hrLowerTimes: obj.hrLowerTimes,
            hrMax: obj.hrMax,
            hrMax_Time: obj.hrMax_Time,
            hrMin: obj.hrMin,
            hrMin_Time: obj.hrMin_Time,
            hrRealTimes: obj.hrRealTimes,
            hrLine: obj.hrLine,
            //part4
            currentWeight: obj.currentWeight,
            goalWeight: obj.goalWeight,
            currentBMI: obj.currentBMI,
            goalBMI: obj.goalBMI,
            //part5
            currentRanking: obj.currentRanking,
            defeatNum: obj.defeatNum,
            goUpNum: obj.goUpNum,
            predictNextRanking: obj.predictNextRanking,
            //part6
            bpStar: obj.bpStar,
            scoreStar: obj.scoreStar,
            persistenceStar: obj.persistenceStar,
            bestBP: obj.bestBP,
            bestDays: obj.bestDays,
            bestScore: obj.bestScore,
            bpstapercent: Math.floor(obj.bpStandardTimes*100/obj.bpRealTimes),
            bphighpercent: Math.floor(obj.bpHigherTimes * 100 / obj.bpRealTimes),
            bplowpercent: Math.floor(obj.bpLowerTimes * 100/ obj.bpRealTimes),
            hrstapercent: Math.floor(obj.hrStandardTimes * 100/ obj.hrRealTimes),
            hrhighpercent: Math.floor(obj.hrHigherTimes * 100/ obj.hrRealTimes),
            hrlowpercent: Math.floor(obj.hrLowerTimes * 100/ obj.hrRealTimes),
          })
          that.drawmonthlyScore();
          that.drawbpTimes();
          that.drawhrTimes();
          that.getBMIstatus();
     
        }
        else{
          wx.showModal({
            title: '提示',
            content: '暂时无法获取月报数据',
            showCancel:false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateBack({
                  
                })
              } 
            }
          })
        }
      },
      fail: function (res) {
        console.log(res);
        console.log('is failed')
      }
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