//app.js
App({
  onLaunch: function () {
    wx.toast = {};
    wx.server = {};
    wx.server.url = (url) => {
      return `https://api.douban.com/${url}`
    }
    this.initToast();
    const systemInfo = wx.getSystemInfoSync();
    wx.server.statusBarHeight = systemInfo.statusBarHeight;
    if (systemInfo.platform == 'android') {
      wx.server.navBarHeight = 48;
    } else {
      wx.server.navBarHeight = 44;
    }
  },
  initToast: function () {
    const toastTypeNormal = 0; // 普通信息
    const toastTypeSuccess = 1;// 成功信息
    const toastTypeError = 2; // 错误信息
    let commonToast = (title, type, duration = 1500) => {
      let options = {
        title: title,
        icon: 'none',
        duration: duration,
      }
      if (type == toastTypeNormal) {
        options.icon = 'success'
      } else if (type == toastTypeError) {
        options.image = '/assets/imgs/upsdk_cancel_normal.png'
      }
      wx.showToast(options)
    }
    wx.toast.normal = (title, duration) => {
      commonToast(title, toastTypeNormal, duration)
    };
    wx.toast.success = (title, duration = 1500) => {
      commonToast(title, toastTypeSuccess, duration)
    };
    wx.toast.error = (title, duration = 1500) => {
      commonToast(title, toastTypeError, duration)
    };
  },
  globalData: {
    userInfo: null
  }
})