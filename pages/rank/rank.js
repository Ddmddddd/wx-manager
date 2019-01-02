// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    todayBeatPercent:0,
    todayRanking:0,
    todayScore:0,
    todayTopRankList:[],
    totalBeatPercent:0,
    totalRanking:0,
    totalScore:0,
    totalTopRankList:[],
  },
  swichNav: function (e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function (e) {
    this.setData({ currentTab: e.detail.current });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var patientId = wx.getStorageSync('patientid_token');
    wx.request({
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetRankingInfo',
      data: {
        patientId: patientId,
        topRanking: 10
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data);
        that.setData({
          todayBeatPercent: res.data.obj.todayBeatPercent,
          todayRanking: res.data.obj.todayRanking,
          todayScore: res.data.obj.todayScore,
          todayTopRankList: res.data.obj.todayTopRankList,
          totalBeatPercent: res.data.obj.totalBeatPercent,
          totalRanking: res.data.obj.totalRanking,
          totalScore: res.data.obj.totalScore,
          totalTopRankList: res.data.obj.totalTopRankList,
        })
      },
      fail: function (res) {
        console.log(res.data);
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