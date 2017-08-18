// venueDetail.js
var common = require('../../utils/util.js');
Page({
  data: {
    venueList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this, 
        userinfo = common.checkLogin(true),
        params = { userid: userinfo.UserId, etpid: userinfo.EtpId }
    wx.showLoading({ title: '加载中' });
    common.MyPost('CUJU_Venue_GetMyStadium', params, function (data) {
      wx.hideLoading();
      if (data.Result > 0) {
        if (data.TotalCount > 0) {
          that.setData({ venueList: data.Data.table0 });
        } else common.alert_ok('没场馆');
      } else {
        common.alert_err(data.ErrorMessage);
      }
      //that.setData({ });
    });
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