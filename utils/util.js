// md5
var mymd5 = require('md5.js');

// ajax请求封闭
var MyAjax = {
  // 启用调试
  debug: true,    
  // 不验证登录状态的请求
  nocheckList: 'CUJU_ETP_Login',
  // 接口地址
  baseUrl: 'https://feedback.cuuju.com/wxws/FM_Mobile_WBS.asmx/CUUJU_MOBILE_SYSTEM',
  Post: function (funcName, params, callback) { 
    if (MyAjax.debug) console.info(params);
    // 方法名不可为空
    if (!funcName) return;
    // 检查登录状态
    if (MyAjax.nocheckList.indexOf(funcName) < 0) MyAjax.checkLogin(true);
    params = { CUJU_HEAD: { Version: "0.2" }, CUJU_LIST: params };
    wx.request({
      url: MyAjax.baseUrl, 
      method: 'POST',
      data: {
        sFunc: funcName,
        sPara: JSON.stringify(params)
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (MyAjax.debug) console.info('MyAjax.Post.' + funcName, res.data.d);
        if (callback) callback(JSON.parse(res.data.d), res.statusCode, res.header);
      }
    })
  },
  /**
   * 检查登录状态（没有登录是否跳转去登录）
   */
  checkLogin: function (is_goto_login) {
    var cuujuLoginState = wx.getStorageSync('cuujuLoginState') || [];
    if (cuujuLoginState.UserId) {
      return cuujuLoginState;
    } else {
      if (is_goto_login == true) wx.reLaunch({ url: '/pages/login/login' });
      return null;
    }
  }
}
 

module.exports = {
  alert_ok: function (msg, callback) {
    if (msg) wx.showToast({ title: msg, success: callback });
  },
  alert_err: function (msg, callback) {
    //wx.showToast({ title: msg, image: '/pages/images/icon_error.png', duration: 3500 });
    if (!msg) return;
    wx.showModal({
      content: msg, showCancel: false, // confirmColor: '#1AAD19',      
      success: function (res) {
        if (res.confirm && callback) callback();
      }
    })
  },
  confirm: function (msg, callback) {
    wx.showModal({
      //title: title, 
      content: msg, 
      showCancel: false,
      success: function (res) {
        if (res.confirm && callback) callback();
      }
    })
  },
  /**
   * ajax请求
   */
  MyPost: MyAjax.Post,
  /**
   * md5加密
   */
  md5: mymd5.task,
  /**
   * 检查登录状态,返回用户登录信息（参数：bool 没有登录是否跳转去登录）
   */
  checkLogin: MyAjax.checkLogin
}