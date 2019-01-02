// pages/bindUserInfo/bindid/bindid.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    new_id: "",
  },
  bindInputId: function (e) {
    this.setData({
      new_id: e.detail.value,
    })
  },
  validateID: function (code) {
    var that = this;
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;
    if (!city[code.substr(0, 2)]) {
      tip = "地址编码错误";
      pass = false;
    }
    //18
    if (code.length == 18) {
      var birthday = code.substr(6, 4) + '/' + Number(code.substr(10, 2)) + '/' + Number(code.substr(12, 2));
      var d = new Date(birthday);
      var currentTime = new Date().getTime();
      var time = d.getTime();
      if (!code || !/^[1-9]\d{5}((1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[\dxX]$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
      }
      else if (time >= currentTime) {
        tip = "非法生日";
        pass = false;
      }
      else {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17].toUpperCase()) {
          tip = "校验位错误";
          pass = false;
        }
      }
    }
    else if (code.length == 15) {
      if (!code || !/^[1-9]\d{5}(\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/i.test(code)) {
        tip = "身份证号格式错误";
        pass = false;
      }
    }
    else {
      pass = false;
    }
    if (!pass) console.log(tip);

    return pass

  },
  change: function () {
    var patientId = wx.getStorageSync('patientid_token');
    var identityCardNumber = this.data.new_id;
    if (patientId.length <= 0 || !this.validateID(identityCardNumber)) {
      wx.showToast({
        title: '身份证错误',
        image: '../../../image/fail.png',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://zjubiomedit.com/HypertensionService.svc/BoundIdentityCardNumber',
        data: {
          patientId: patientId,
          identityCardNumber: identityCardNumber,
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          if (res.data.flag == 0) {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              identityCardNumber: identityCardNumber
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