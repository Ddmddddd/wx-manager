// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knowledge: [],
    count: 6,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var count = this.data.count;
    wx.request({
      method: 'GET',
      url: 'https://zjubiomedit.com/health-knowledge/GetTopNKno.jsp?count=' + count,
      success: function (res) {
        var knowledge1 = res.data.result.knowledge.map(function(item){
          var arr=item.kno_time.split(" ");
          item.kno_time=arr[0];
         return item
        })
        that.setData({
          knowledge: knowledge1
        })
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
    this.setData({
      count: this.data.count*2
    })
    var that = this;
    var count = that.data.count;
    wx.request({
      method: 'GET',
      url: 'https://zjubiomedit.com/health-knowledge/GetTopNKno.jsp?count=' + count,
      success: function (res) {
        var knowledge1 = res.data.result.knowledge.map(function (item) {
          var arr = item.kno_time.split(" ");
          item.kno_time = arr[0];
          return item
        })
        that.setData({
          knowledge: knowledge1
        })
      },
      fail: function (res) {
        console.log(res);
        console.log('is failed')
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})