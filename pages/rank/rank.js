// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allSubjects: [
      // { title: '影院热映', url: 'v2/movie/in_theaters', movies: [] },
      { title: 'Top250', url: 'v2/movie/top250', movies: [] },
      { title: '口碑榜', url: 'v2/movie/weekly', movies: [] },
      { title: '新片榜', url: 'v2/movie/new_movies', movies: [] },
      { title: '北美票房榜', url: 'v2/movie/us_box', movies: [] },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.allSubjects.forEach(subject => {
      let obj = subject;
      obj.movies = wx.getStorageSync(obj.title).slice(0,3) || [];
      // obj.movies.slice(0, 3)
    });
    this.setData(this.data)
    console.log(this.data)
  },
})