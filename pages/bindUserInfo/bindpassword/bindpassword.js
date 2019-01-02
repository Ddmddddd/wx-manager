// pages/bindUserInfo/bindpassword/bindpassword.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    former_password:"",
    new_password:""
  },
  bindInputOldPassword:function(e){
    this.setData({
      former_password: e.detail.value,
    })
  },
  bindInputNewPassword: function (e) { 
    this.setData({
      new_password: e.detail.value,
    })
  },

  change: function () {
    var patientId = wx.getStorageSync('patientid_token');
    var oldPassword = this.data.former_password;
    var newPassword = this.data.new_password;
    if (patientId.length <= 0 || oldPassword.length < 6 || newPassword.length < 6) {
      wx.showToast({
        title: '密码输入错误',
        image: '../../../image/fail.png',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://zjubiomedit.com/HypertensionService.svc/ModifyPassword',
        data: {
          patientId: patientId,
          oldPassword: oldPassword,
          newPassword: newPassword
        },
        method: 'POST',
        success: function (res) {
          if (res.data.flag == 0) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
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
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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