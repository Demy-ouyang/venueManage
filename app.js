//app.js
var common = require('/utils/util.js')
App({
  onLaunch: function (options) {
     
  },
  onShow: function () {
    //是否登录
    if (common.checkLogin() != null) { 
      console.info('已经登录');
      wx.reLaunch({
        url: '/pages/venueDetail/venueDetail'
      });
    }
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    pageData: [] // 用于页面间传值
  }
})
