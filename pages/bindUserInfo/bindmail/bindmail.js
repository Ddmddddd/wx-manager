// pages/bindUserInfo/bindmail/bindmail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    former_mail:"",
    new_mail:"",
  },
  bindInputMail:function(e){
    this.setData({
      new_mail: e.detail.value,
    })
  },
  validate:function(){
    var emailAddress = this.data.new_mail;
    if (emailAddress.length <= 0 ||!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i.test(emailAddress)){
      return false
    }
    else return true
  },
  change:function(){
    var patientId = wx.getStorageSync('patientid_token');
    var emailAddress = this.data.new_mail;
    if (patientId.length <= 0 || !this.validate()) {
      wx.showToast({
        title: '新邮箱地址错误',
        image: '../../../image/fail.png',
        duration: 2000
      })
    } else {
    wx.request({
      url: 'https://zjubiomedit.com/HypertensionService.svc/BoundEmailAddress',
      data: {
        patientId: patientId ,
        emailAddress: emailAddress,
      },
      method: 'POST',
      success: function (res) {
        if (res.data.flag == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2];
          prevPage.setData({
            email: emailAddress
          })
          wx.navigateBack()
        }
        else {
          wx.showToast({
            title: '修改失败',
            image: '../../../image/fail.png',
            duration: 2000
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
        console.log('is failed')
      }
    })}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var former_mail=options.mail;
    if (former_mail!=undefined){
    this.setData({
      former_mail: former_mail
    })}
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