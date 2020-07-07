// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: {},
    title: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movie = JSON.parse(options.movie);
    wx.setNavigationBarTitle({
      title: movie.title
    });
    let totalsRating = 0;
    for (let index = 1; index <= 5; index++) {
      totalsRating += movie.rating.details[index]
    }
    let genresStr = '';
    movie.genres.forEach(item => {
      genresStr += item + '  '
    });

    let country = movie.pubdates[0].substring(movie.pubdates[0].indexOf('(') + 1, movie.pubdates[0].length - 1)
    genresStr += '/ ' + country + ' / 片长 ' + movie.durations[0]
    movie.rating.total = totalsRating
    movie.genresStr = genresStr
    // 刷新数据
    this.setData({
      movie: movie
    })
  },
})