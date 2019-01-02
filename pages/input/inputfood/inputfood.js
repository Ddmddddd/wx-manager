// pages/input/inputfood/inputfood.js
var util = require('../../../utils/util.js'); 
var app = getApp();
var foodArr= app.globalData.foodArr;//调用全局变量
Page({

  data: {
    foodinfo: {
      "measureTime": "",
      "kinds": "",
      "appetite": "",
      "feature":0,
      "id": 0,
      "note": "",
      "status": 0,
      "type": 0
    },
    date_food: util.formatTime2(new Date()),
    time_food: util.formatTime4(new Date()),
    list_food: [],
    list_kinds: [],
    list_appetite: [],
    id:0,
    comment_food: "",
    foodArr: foodArr,
    multiIndex2: [0, 0],
    mealtype:0,
  },

  bindMultiPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var multiIndex=e.detail.value;
    var foodArr= this.data.foodArr;
    var newarray = [{
      name: foodArr[0][multiIndex[0]].name,
      value: foodArr[1][multiIndex[1]].name,
    }];

    this.setData({
      multiIndex2: e.detail.value,
      list_food: this.data.list_food.concat(newarray),//用于连接两个或多个数组，返回连接好的数组而不改变原有数组
      list_kinds: this.data.list_kinds.concat(foodArr[0][multiIndex[0]].id),
      list_appetite: this.data.list_appetite.concat((foodArr[1][multiIndex[1]].name).slice(0,-1)),
      //slice：返回一个新的数组，包含（0，-1）的元素，0与-1表示位置
    })
  },

  bindMultiPickerColumnChange2: function (e) {
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      foodArr: this.data.foodArr,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    if(!e.detail.column)  
        data.multiIndex2[1] = 0;
    this.setData(data);
  },


  bindDateChange: function (e) {
    this.setData({
      date_food: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time_food: e.detail.value
    })
  },

  bindInputCom: function (e) {
    this.setData({
      comment_food: e.detail.value
    })
  },

  //删除
  remove: function (e) {
    var dataset = e.target.dataset;
    var Index = dataset.index; //拿到是第几个
    this.data.list_food.splice(Index, 1);//splice（a,b,c）:从a位置删除b个元素，c（可选，向数组添加）
    this.data.list_kinds.splice(Index, 1);
    this.data.list_appetite.splice(Index, 1);
    this.setData({
      list_food: this.data.list_food,
      list_kinds: this.data.list_kinds,
      list_appetite: this.data.list_appetite
    });
  },
  validate: function () {
    var kinds = this.data.list_kinds;
    if (kinds.length <= 0 ) return false;
    else return true;
  },
  monitor: function () {
    var that = this;
    var foodstring = JSON.stringify(that.data.foodinfo);
    console.log(foodstring)
    try {
      var patientId = wx.getStorageSync('patientid_token');
      var managementId = wx.getStorageSync('managementid_token');
    } catch (e) { }
    wx.request({
      method: 'POST',
      url: 'https://zjubiomedit.com/HypertensionService.svc/CommitEatingRecord',
      data: {
        "patientId": patientId,
        "managementId": managementId,
        "data": foodstring
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
      foodinfo: {
        "measureTime": this.data.date_food + " " + this.data.time_food + ": 00",
        "kinds": this.data.list_kinds.toString(),
        "appetite": this.data.list_appetite.toString(),
        "feature": 0,//未使用
        "id": 0,
        "note": this.data.comment_food,
        "status": 0,
        "type": this.data.mealtype
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
  foodformSubmit: function (e) {
    this.setData({
      foodinfo: {
        "measureTime": this.data.date_food + " " + this.data.time_food,
        "kinds": this.data.list_kinds.toString(),
        "appetite": this.data.list_appetite.toString(),
        "feature": 0,//未使用
        "id": this.data.id,
        "note": this.data.comment_food,
        "status": 254,
        "type": this.data.mealtype
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
      foodinfo: {
        "measureTime": this.data.date_food + " " + this.data.time_food,
        "kinds": this.data.list_kinds.toString(),
        "appetite": this.data.list_appetite.toString(),
        "feature": 0,//未使用
        "id": this.data.id,
        "note": this.data.comment_food,
        "status": 255,
        "type": this.data.mealtype
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
      var kinds = options.kinds.split(","), appetite = options.appetite.split(",");
      this.setData({
        date_food: date,
        time_food: time,
        comment_food: options.note,
        id: options.id,
        list_kinds:kinds,
        list_appetite: appetite,
        mealtype: options.type
      })
    }
    else {
      this.setData({
        date_food: util.formatTime2(new Date()),
        time_food: util.formatTime4(new Date()),
        comment_food: "",
        id: options.id,
        list_kinds: [],
        list_appetite: [],
        mealtype: options.type
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