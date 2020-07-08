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
    wx.setNavigationBarTitle({
      title: options.title
    });
    this.loadData(options.id)
  },
  loadData(id){
    wx.request({
      url: wx.server.url(`v2/movie/subject/${ id }`),
      data: {
        apikey: '0df993c66c0c636e29ecbb5344252a4a'
      },
      header: { 'content-type': 'json' },
      success: (result) => {
        let movie = result.data
        this.updateMovieStar(movie)
        this.updataMovieDesc(movie)

        this.setData({
          movie: movie
        })
      },
      fail: () => {},
      complete: () => {}
    });
  },
  updateMovieStar: function (movie) {
    let stars = parseInt(movie.rating.stars);
    movie.stars = {};

    let on = Math.floor(stars / 10);
    let half = stars % 10 ? 1 : 0;
    let off = 5 - on - half

    movie.stars.on = on;
    movie.stars.half = half
    movie.stars.off = off;
  },
  updataMovieDesc:function(movie){
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
  }
})