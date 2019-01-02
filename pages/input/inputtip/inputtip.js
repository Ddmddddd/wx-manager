// pages/input/inputtip/inputtip.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systolicPressure:182,
    diastolicPressure:120,
    heartRate:80,
    BPcolor:["bp0","bp1","bp2","bp3","bp4","bp5","bp6"],
    HRcolor:["hr0","hr1","hr2"],
    BPtag:["血压偏低","血压理想","血压正常","血压正常偏高","轻度高血压","中度高血压","重度高血压"],
    HRtag:["心率过缓","心率正常","心率过快"],
    BPstatus:4,
    HRstatus:2,
    BPInfo: "请立即卧床休息，二十分钟后再测量一下血压。如果您出现剧烈头痛、胸痛、恶心呕吐、四肢无力等不适症状，请及时联系专科医生或立即复诊。",
    HRInfo: "请持续监测一周，按医嘱服用药物。如果出现头晕头痛、耳鸣等不适症状，请立即复诊。",
    tip:"许多研究表明：配合减肥的降压治疗可以明显减少降压药的用量，而且肥胖跟许多疾病相关，会对全身健康造成负面影响。所以，肥胖的高血压患者可别忘了减肥。"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //get sp dp hr status
    var data = JSON.parse(options.data);
    this.setData({
      systolicPressure: options.sp,
      diastolicPressure: options.dp,
      heartRate: options.hr,
      BPstatus: data.BPStatus,
      HRstatus: data.HRStatus,
      BPInfo: data.BPInfo,
      HRInfo: data.HRInfo,
      tip: data.tip
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