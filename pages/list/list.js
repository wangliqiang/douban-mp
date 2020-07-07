// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title,
    });
   wx.getStorage({
     key: options.title,
     success: (result) => {
        this.setData({
          movies: result.data
        });
     },
   });
     
  },
})