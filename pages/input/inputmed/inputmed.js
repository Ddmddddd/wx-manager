// pages/input/inputmed/inputmed.js
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    medinfo: {
      "measureTime": "",
      "drugName": "",
      "dosage": "",
      "id": 0,
      "note": "",
      "status": 0,
      "type": 0
    },
    showModal:false,
    definename:"",
    definedosage:"",
    date_med: util.formatTime2(new Date()),
    time_med: util.formatTime4(new Date()),
    list_drugname: [],
    list_dosage: [],
    comment_med: "",
    objectMultiArray: [
      [{ id: 0, name: '贝那普利片(T) ' }, { id: 1, name: '硝苯地平控释片(T) ' }, { id: 2, name: '氢氯噻嗪片 ' }, { id: 3, name: '阿司匹林肠溶片(T) ' }, { id: 4, name: '依那普利片 ' }, { id: 5, name: '福辛普利钠片(T) ' }, { id: 6, name: '左旋氨氯地平片 ' }, { id: 7, name: '非洛地平缓释片 ' }, { id: 8, name: '苯磺酸氨氯地平片(T) ' }, { id: 9, name: '琥珀酸美托洛尔片(T) ' }, { id: 10, name: '酒石酸美托洛尔片 ' }, { id: 11, name: '阿托伐他汀钙片(T) ' }, { id: 12, name: '瑞舒伐他汀钙片(T) ' }, { id: 13, name: '富马酸比索洛尔片(T) ' }, { id: 14, name: '辛伐他汀片(T) ' }, { id: 15, name: '厄贝沙坦片(T) ' }, { id: 16, name: '坎地沙坦片(T) ' }, { id: 17, name: '氯沙坦钾片(T) ' }, { id: 18, name: '缬沙坦胶囊(T) ' }, { id: 19, name: '北京0号降压片 ' }, { id: 20, name: '螺内酯片 ' }, { id: 21, name: '降血压药物 ' }],
      [{ id: 0, name: '1.25mg' }, { id: 1, name: '2.5mg' }, { id: 2, name: '5mg' }, { id: 3, name: '10mg' }, { id: 4, name: '15mg' }, { id: 5, name: '20mg' }, { id: 6, name: '25mg' }, { id: 7, name: '30mg' }, { id: 8, name: '35mg' }, { id: 9, name: '40mg' }, { id: 10, name: '45mg' }, { id: 11, name: '50mg' }, { id: 12, name: '55mg' }, { id: 13, name: '60mg' }, { id: 14, name: '65mg' }, { id: 15, name: '70mg' }, { id: 16, name: '75mg' }, { id: 17, name: '80mg' }, { id: 18, name: '85mg' }, { id: 19, name: '90mg' }, { id: 20, name: '适量' }]
    ],
    id: 0,
    multiIndex2: [0, 0],
  },


  bindDateChange: function (e) {
    this.setData({
      date_med: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time_med: e.detail.value
    })
  },
  bindInputCom: function (e) {
    this.setData({
      comment_med: e.detail.value
    })
  },

  bindMultiPickerChange2: function (e) {//添加药物
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var multiIndex = e.detail.value;
    var objectMultiArray = this.data.objectMultiArray;
    this.setData({
      multiIndex2: e.detail.value,

      list_drugname: this.data.list_drugname.concat(objectMultiArray[0][multiIndex[0]].name),
      list_dosage: this.data.list_dosage.concat(objectMultiArray[1][multiIndex[1]].name),
    })
  },

  bindMultiPickerColumnChange2: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    if (!e.detail.column)
      data.multiIndex2[1] = 0;
    this.setData(data);
  },
  //删除
  remove: function (e) {
    var dataset = e.target.dataset;
    var Index = dataset.index; //拿到是第几个

    this.data.list_drugname.splice(Index, 1);
    this.data.list_dosage.splice(Index, 1);
    this.setData({
      list_drugname: this.data.list_drugname,
      list_dosage: this.data.list_dosage
    });
  },
  //自定义药物
  defineMed: function () {
    this.setData({
      showModal: true
    })
  },
  bindModalInputName: function (e) {
    this.setData({
      definename: e.detail.value
    })
  },
  bindModalInputValue: function (e) {
    this.setData({
      definedosage: e.detail.value+'mg'
    })
  },
  /**
 * 弹出框蒙层截断touchmove事件
 */
  preventTouchMove: function () {
  },
  /**
 * 隐藏模态对话框
 */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.setData({
      list_drugname: this.data.list_drugname.concat(this.data.definename),
      list_dosage: this.data.list_dosage.concat(this.data.definedosage),
    })
    this.hideModal();
  },
  validate: function () {
    var drugname = this.data.list_drugname;
    if (drugname.length <= 0) return false;
    else return true;
  },
  monitor: function () {
    var that = this;
    var medstring = JSON.stringify(that.data.medinfo);
    console.log(medstring)
    try {
      var patientId = wx.getStorageSync('patientid_token');
      var managementId = wx.getStorageSync('managementid_token');
    } catch (e) { }
    wx.request({
      method: 'POST',
      url: 'https://zjubiomedit.com/HypertensionService.svc/CommitMedicationRecord',
      data: {
        "patientId": patientId,
        "managementId": managementId,
        "data": medstring
      },
      success: function (res) {
        console.log(res);
        wx.navigateBack();
      },
      fail: function (res) {
        console.log(res);
        console.log('is failed')
      }
    })
  },
  finish: function () {
    this.setData({
      status: 0
    })
    this.setData({
      medinfo: {
        "measureTime": this.data.date_med + " " + this.data.time_med + ": 00",
        "drugName": this.data.list_drugname.toString(),
        "dosage": this.data.list_dosage.toString(),
        "id": 0,
        "note": this.data.comment_med,
        "status": 0,
        "type": 0
      },
    })
    if (!this.validate()) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
      this.monitor();
      app.globalData.medtask--;
    }
    
  },
  medformSubmit: function (e) {
    this.setData({
      medinfo: {
        "measureTime": this.data.date_med + " " + this.data.time_med,
        "drugName": this.data.list_drugname.toString(),
        "dosage": this.data.list_dosage.toString(),
        "id": this.data.id,
        "note": this.data.comment_med,
        "status": 254,
        "type": 0
      },
    })
    if (!this.validate()) {
      wx.showToast({
        title: '数据不能为空',
        image: '../../../image/fail.png',
        duration: 1000
      })
    }
    else {
      this.monitor();
    }
  },

  formReset: function (e) {
    this.setData({
      medinfo: {
        "measureTime": this.data.date_med + " " + this.data.time_med,
        "drugName": this.data.list_drugname.toString(),
        "dosage": this.data.list_dosage.toString(),
        "id": this.data.id,
        "note": this.data.comment_med,
        "status": 255,
        "type": 0
      },
    })
    this.monitor();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var datetime = options.time, date, time;
    if (options.id != 0) {
      date = datetime.split(" ")[0];
      time = datetime.split(" ")[1];
      var dosage = options.dosage.split(","), drugName = options.drugName.split(",");
      this.setData({
        date_med: date,
        time_med: time,
        comment_med: options.note,
        id: options.id,
        list_drugname: drugName,
        list_dosage: dosage,
      })
    }
    else {
      this.setData({
        date_med: util.formatTime2(new Date()),
        time_med: util.formatTime4(new Date()),
        comment_med: "",
        id: options.id,
        list_drugname: [],
        list_dosage: [],
      })
    }
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