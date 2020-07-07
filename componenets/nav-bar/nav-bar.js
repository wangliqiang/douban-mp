// componenets/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    statusBarColor:{
      type:String,
      value:'#fff'
    },
    navBarColor:{
      type:String,
      value:'#fff'
    },
    titleColor:{
      type:String,
      value:'#000'
    },
    back:{
      type:String,
      value:'true'
    },
    home:{
      type:String,
      value:'true'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarStyle: '',// 状态栏样式
    navBarStyle: '',// 导航栏样式
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goBack(){
      wx.navigateBack({
        delta: 1
      });
    },
    goHome(){
      wx.navigateBack({
        delta: 11
      });
    }
  },
  lifetimes: {
    attached: function () {
      const statusBarStyle = `
        height:${ wx.server.statusBarHeight }px;
        background-color:${ this.data.statusBarColor };
        `
      const navBarStyle = `
        height:${ wx.server.navBarHeight }px;
        background-color:${ this.data.navBarColor };
        color:${ this.data.titleColor };
        `
      this.setData({
        statusBarStyle: statusBarStyle,
        navBarStyle: navBarStyle
      })
    }
  }
})
