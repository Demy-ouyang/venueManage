// user.js
var common = require('../../utils/util.js')
var app = getApp();
Page({
  data: {
    userinfo: {},
      ddd: ['场馆一', '场馆二', '场馆三', '场馆四'],
    orderList: [],
    tab: 0

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = common.checkLogin(true);
    this.onReachBottom(obj);
  },
  /**
   * 退出登录
   */
  Logout: function () {
    wx.setStorageSync('cuujuLoginState', undefined);
    common.checkLogin(true);
  },
  /** 切换列表类别 */
  switchTab: function (e) {
    this.setData({ tab: e.currentTarget.dataset.index });
    this.pindex = 0;
    this.count = 1; 
    this.onReachBottom();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  pindex: 0,
  psize: 5, // 页大小
  count: 1, // 总页数
  ing: false,
  onReachBottom: function (obj) {
    var that = this;
    if (that.ing || that.pindex >= that.count) return;
    wx.showLoading({ title: '加载中' }); that.ing = true;
    
    var params = { sid: '56a3e8e3-bc39-4b36-a32c-8d370e37e9ed', PageIndex: that.pindex+1, PageSize: that.psize, 
      type: that.data.tab == 0 ? 'all' : (that.data.tab == 1 ? 'online' : 'phonebook') }
    common.MyPost('CUJU_Order_GetSellerList', params, function (data) {
      wx.hideLoading(); that.ing = false;
      if (data.Result > 0 && data.TotalCount > 0) {
        that.pindex++;  // 页码自加1
        that.count = Math.ceil(data.TotalCount / that.psize);

        let set_params = obj && obj.UserId ? { userinfo: obj } : {};
        if (that.pindex == 1) {
          set_params.orderList = data.Data.table0;
        } else {
          // 微信每次setData不能超过1024k，不能setData整个列表
          for (let i = 0, ri = that.data.orderList.length; i < data.Data.table0.length; i++ , ri++) {
            set_params['orderList[' + ri + ']'] = data.Data.table0[i];
          }
        } 
        that.setData(set_params);
      } else {
        common.alert_err(data.ErrorMessage || '暂无订单');
      }
    });
  },
  /** 
   * 向详情页跳转，并在globaldata中夹带数据 
   */
  GoDetail: function (e) {
    app.globalData.pageData = this.data.orderList[e.currentTarget.dataset.index];
    wx.navigateTo({ url: '/pages/detail/detail' });
  }
})