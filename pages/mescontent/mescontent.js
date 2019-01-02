const wxParser = require('../../wxParser/index');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPage: false,
    id: 0,
    url: "https://zjubiomedit.com/health-knowledge/getKnoContent.jsp?kno_id=",
    link: '',
    name: '',
    time: '',
    readtime: 3,
    img: [{
      name: 'img',
      attrs: {
        src: "http://120.27.141.50:8080/health-knowledge/upload/drug-54.jpg",
        width: "100%",
      },
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    var that = this;
    var id = options.id;
    this.setData({
      id: id
    })
    wx.request({
      url: this.data.url + this.data.id,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {

      },
      success: function (res) {
        console.log(res.data.result)
        that.setData({
          link: res.data.result.kno_link,
          name: res.data.result.kno_name,
          time: res.data.result.kno_time,
          readtime: res.data.result.read_time,
          'img[0].attrs.src': res.data.result.kno_link,
        })
        wxParser.parse({
          bind: 'richText',
          html: res.data.result.kno_content,
          target: that,
          enablePreviewImage: false, // 禁用图片预览功能
          tapLink: (url) => { // 点击超链接时的回调函数
            // url 就是 HTML 富文本中 a 标签的 href 属性值
            // 这里可以自定义点击事件逻辑，比如页面跳转
          }
        });
        that.setData({
          showPage: true
        });
        wx.hideLoading();

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