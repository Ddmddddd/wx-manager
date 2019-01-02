// pages/register/register.js
import { request, validateRequest, registWithInfo, personInfoVali } from "../../utils/Request";
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    validate: 1,
    windowHeight: app.globalData.windowHeight,
    windowWidth: app.globalData.windowWidth,
    patientName: "",
    patientId: "",
    nickname: "",
    password: "",
    passwordcheck: "",
    identityCardNumber: "",
    phoneNumber: "",
    education: "",
    profession: "",
    birthDate: "",
    sex: "",
    height: "",
    weight: "",
    region: "",
    hospital: "",
    manager: "",
    educationArr: ["小学", "初中", "中专", "高中", "大专", "本科", "硕士", "博士"],
    professionArr: ["工人", "农民", "科技", "行政", "教师", "金融", "商业", "医疗", "学生", "军人", "家务", "个体", "其他"],
    sexArr: ["男", "女"],
    regionArr: [],
    hospitalArr: [],
    managerArr: [],
    multiIndex: [0, 0, 0],
  },
  patientNameInput: function (e) {
    this.setData({
      patientName: e.detail.value
    })
  },
  patientIdInput: function (e) {
    this.setData({
      patientId: e.detail.value
    })
  },
  nickNameInput: function (e) {
    this.setData({
      nickname: e.detail.value
    })
  },
  passWordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  passWordCheckInput: function (e) {
    this.setData({
      passwordcheck: e.detail.value
    })
  },
  idcardNumberInput: function (e) {
    this.setData({
      identityCardNumber: e.detail.value
    })
  },
  bindbirthDateChange: function (e) {
    this.setData({
      birthDate: e.detail.value
    })
  },
  phoneNumberInput: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  bindeducationChange: function (e) {
    this.setData({
      education: this.data.educationArr[e.detail.value]
    })
  },
  bindprofessionChange: function (e) {
    this.setData({
      profession: this.data.professionArr[e.detail.value]
    })
  },
  bindsexChange: function (e) {
    this.setData({
      sex: this.data.sexArr[e.detail.value]
    })
  },


  bindRegionChange: function (e) {
    var that = this
    var region = this.data.regionArr[e.detail.value]
    this.setData({
      region: region
    })
    wx.request({
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetHospitalInfoListByProvince',
      data: {
        "provinceCode": region.code
      },
      method: 'POST',
      success: function (res) {
        if (res.data.flag == 0) {
          // console.log(res.data);
          that.setData({
            hospitalArr: res.data.obj,
            hospital: '',
            manager: '',
            managerArr: [],
          })
        }
        // console.log(that.data.regionArr);
      },
      fail: function (res) {
        console.log('is failed')
      }
    })
  },
  bindHospitalChange: function (e) {
    var that = this
    var hospital = this.data.hospitalArr[e.detail.value]
    this.setData({
      hospital: hospital,
      managerArr: hospital.managerList,
      manager: ''
    })
  },
  bindManagerChange: function (e) {
    var manager = this.data.managerArr[e.detail.value]
    this.setData({
      manager: manager,
    })
  },
  heightInput: function (e) {
    this.setData({
      height: e.detail.value
    })
  },
  weightInput: function (e) {
    this.setData({
      weight: e.detail.value
    })
  },
  validate: function () {
    var that = this
    let patientId = this.data.patientId
    let patientName = this.data.patientName
    let toast = ''
    if (!patientId) {
      toast = toast.concat('病历号，')
    }
    if (!patientName) {
      toast = toast.concat('姓名，')
    }
    if (toast) {
      wx.showToast({
        title: '请输入' + toast.slice(0, -1),
        icon: 'none',
        duration: 1500
      })
      return
    }
    validateRequest(patientId, patientName).then((res) => {
      console.log(res)
      this.setData({
        validate: 2
      })
    })
  },

  nextstep: function () {
    let nickname = this.data.nickname
    let id = this.data.identityCardNumber
    let phone = this.data.phoneNumber
    let edu = this.data.education
    let pro = this.data.profession
    let toast = ''
    //各项数据 除了密码,昵称 是否填写    
    if (!id) {
      toast = toast.concat('身份证号，')
    }
    if (!phone) {
      toast = toast.concat('手机号，')
    }
    if (!edu){
      toast = toast.concat('学历，')
    }
    if (!pro){
      toast = toast.concat('职业，')
    }
    if (toast) {
      wx.showToast({
        title: '请输入' + toast.slice(0, -1),
        icon: 'none',
        duration: 1500
      })
      return
    }
    //身份证检验 自动生成生日
    //手机号检验 
    personInfoVali(id, phone).then(res => {
      console.log(res)
      this.setData({
        'birthDate': res
      })
      //若有密码，检查两次是否一致
      let pw = this.data.password
      if (pw) {
        if (pw !== this.data.passwordcheck) {
          wx.showToast({
            title: '两次密码输入不一致',
            icon: 'none'
          })
          return
        }
      }
      this.setData({
        validate: 3
      })
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      })
    }).catch(err => { })
  },

  register: function () {

    let sex = this.data.sex
    let height = this.data.height
    let weight = this.data.weight
    let birthDate = this.data.birthDate
    let province = this.data.region
    let hospital = this.data.hospital
    let manager = this.data.manager
    let toast = ''
    //各项数据是否填写
    if (!sex) {
      toast = toast.concat('性别，')
    }
    if (!height){
      toast = toast.concat('身高，')
    }
    if (!weight){
      toast = toast.concat('体重，')
    }
    if (!birthDate){
      toast = toast.concat('出生日期，')
    }
    if (!province){
      toast = toast.concat('地区，')
    }
    if (!hospital){
      toast = toast.concat('医院，')
    }
    if (!manager){
      toast = toast.concat('医师，')
    }
    if (toast){
      wx.showToast({
        title: '请输入' + toast.slice(0,-1),
        icon: 'none',
        duration: 1500
      })
      return
    }
    let patientId = this.data.patientId
    var patientinfo = {
      "patientId": patientId,
      "patientName": this.data.patientName,
      "identityCardNumber": this.data.identityCardNumber,
      "birthDate": this.data.birthDate,
      "sex": this.data.sex,
      "height": this.data.height,
      "weight": this.data.weight,
      "education": this.data.education,
      "profession": this.data.profession,
      "phoneNumber": this.data.phoneNumber,
      "region": this.data.region.name,
      "province": this.data.region.code,
      "hospital": this.data.hospital.code,
      "manager": this.data.manager.id,
      "bpFrequency": 1,
      "bpSchedule": "0",
      "weightFrequency": 1,
      "weightSchedule": "0",
      "medicationFrequency": 1,
      "medicationSchedule": "0",
      "nickname": this.data.nickname,
      "password": this.data.password
    }

    var dataSring = JSON.stringify(patientinfo);
    registWithInfo(patientId,dataSring).then(res => {
      request({
        url:'https://zjubiomedit.com/backup/record/register',
        data: {
          "record": JSON.stringify(patientinfo)
        },
        method: 'POST'
      }).then(res=>{

      })
      wx.showLoading({
        title:'立刻登陆吧'
      })
      setTimeout(() => {
        wx.navigateBack()
    }, 2000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://zjubiomedit.com/HypertensionService.svc/GetProvinceInfoList',
      method: 'POST',
      success: function (res) {
        if (res.data.flag == 0) {
          // console.log(res.data);
          that.setData({
            regionArr: res.data.obj
          })
        }
        // console.log(that.data.regionArr);
      },
      fail: function (res) {
        // console.log('is failed')
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