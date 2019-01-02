var app = getApp()

Page({
  data: {
    userName: '',
    userPassword: '',
    patientid_token: '',//方便存在本地的locakStorage
    managementid_token: '',
    response: '',//存取返回数据
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    showPsw:false
  },

  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput: function (e) {
    this.setData({
      userPassword: e.detail.value
    })
  },
  switchShowPassword:function(){
    this.setData({
      showPsw: !this.data.showPsw
    })
  },
  logIn: function () {
    var that = this;
    var account = this.data.userName;
    var password = this.data.userPassword;
    if (account.length <= 0) {
      wx.showToast({
        title: '请输入信息',
        image: '../../image/fail.png',
        duration: 2000
      })
    } else {
      wx.request({
        
        url: 'https://zjubiomedit.com/HypertensionService.svc/WapLogin',
       
        data: {
          account: account,
          password: password,
        },
        method: 'POST',
        success: function (res) {
          // 判断服务器返回状态，辅助debug
          const { statusCode } = res
          if ( statusCode > 400 && statusCode < 500 ) {
            wx.showToast({
              title: '端口请求错啦',
              image: '../../image/fail.png',
              duration: 1500 
            })
            return
          } else if ( statusCode > 500 ) {
            wx.showToast({
              title: '服务器请求失败',
              image: '../../image/fail.png',
              duration: 1500
            })
            return
          }
          // 请求成功，检验登录信息
          if(res.data.flag==0){
            app.globalData.loginUserInfo = res.data.loginUserInfo;
            app.globalData.managementPlan = res.data.managementPlan;
            app.globalData.todayRecords = res.data.todayRecords;
            wx.setStorageSync('patientid_token', res.data.loginUserInfo.patientID);
            wx.setStorageSync('password_token', that.data.userPassword);
            wx.setStorageSync('managementid_token', res.data.managementPlan.managementID);
            wx.setStorageSync('nickname', res.data.loginUserInfo.nickname || res.data.loginUserInfo.patientName);
          
            wx.switchTab({
              url: '../homepage/homepage'
            })
          }
          else{
            wx.showToast({
              title: '账号或密码错误',
              image: '../../image/fail.png',
              duration: 1500
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '网络错误',
            image: '../../image/fail.png',
            duration: 1000
          })
        }
      })
    }

  },
  onLoad: function (options) {
    /* 获取系统信息*/
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        app.globalData.windowWidth = res.windowWidth;
        app.globalData.windowHeight = res.windowHeight;
        that.setData({
          windowWidth: res. windowWidth,
          windowHeight: res.windowHeight,
        })
      }
    });
    var patientId = wx.getStorageSync('patientid_token');
    var password = wx.getStorageSync('password_token');
    if (patientId.length>0){
      that.setData({
        userName: patientId,
        userPassword: password
      })
      that.logIn();
    }
    else{

    }
  },

  register: function () {
    wx.navigateTo({
      url: '../register/register'
    })
  },
})
