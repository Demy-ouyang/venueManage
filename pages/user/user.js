// user.js
var common = require('../../utils/util.js')
Page({
  data: {
    userinfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = common.checkLogin(true);
    this.setData({ userinfo: obj });
  },
  /**
   * 退出登录
   */
  Logout: function () {
    wx.setStorageSync('cuujuLoginState', undefined);
    common.checkLogin(true);
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