// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    obj: {}
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
    this.data.obj = app.globalData.pageData;
    this.data.obj.PAYMONEY = this.data.obj.PAYMONEY.toFixed(2);
    this.setData({ obj: this.data.obj });
    console.info(this.data.obj)
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
  
  }
})