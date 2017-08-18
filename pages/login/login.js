// pages/login/login.js 
var common = require('../../utils/util.js')
Page({
  data: {
    usernameFocus: true,  // 账户框焦点
    passwordFocus: false, // 密码框焦点
    isSubmiting: false    // 按钮
  }, 
  // 登录
  formLogin: function (e) {
    // 小程序form提交不认id认name
    var that = this;
    var params = { LoginName: e.detail.value.username, LoginPwd: e.detail.value.password, Long: "", Lati: "" };
    if (params.LoginName == '') {
      that.setData({ usernameFocus: true });
      return ;
    }
    if (params.LoginPwd == '') {
      that.setData({ passwordFocus: true });
      return;
    }
    that.setData({ isSubmiting: true });
    params.LoginPwd = common.md5(params.LoginPwd);  // 密码md5加密
    // 发送请求
    common.MyPost('CUJU_ETP_Login', params, function (data) {
      if (data.Result > 0) {
        data = data.Data.table0[0];
        data.loginname = params.LoginName;
        wx.setStorageSync('cuujuLoginState', data);  // 保存登录状态，在本地缓存
        common.alert_ok('登录成功');
        wx.reLaunch({
          url: '/pages/venueDetail/venueDetail'
        });
      } else {
        common.alert_err(data.ErrorMessage);
        that.setData({ isSubmiting: false });
      } 
    })
  }
})