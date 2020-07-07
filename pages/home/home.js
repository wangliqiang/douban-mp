// pages/home/home.js
Page({
  data: {
    allSubjects: [
      { title: '影院热映', url: 'v2/movie/in_theaters', movies: [] },
      { title: '新片榜', url: 'v2/movie/new_movies', movies: [] },
      { title: '口碑榜', url: 'v2/movie/weekly', movies: [] },
      { title: '北美票房榜', url: 'v2/movie/us_box', movies: [] },
      { title: 'Top250', url: 'v2/movie/top250', movies: [] },
    ]
  },
  onLoad: function () {
    if (wx.getStorageSync(this.data.allSubjects[0].title) != []) {
      this.loadLocalData()
    } else {
      this.loadCity(this.loadData);
      this.loadNewData(1);
      this.loadNewData(2);
      this.loadNewData(3);
      this.loadNewData(4);
    }
  },
  loadLocalData() {
    this.data.allSubjects.forEach(subject => {
      let obj = subject;
      obj.movies = wx.getStorageSync(obj.title) || [];
    });
    this.setData(this.data)
  },
  loadData: function (city) {
    wx.request({
      url: wx.server.url('v2/movie/in_theaters'),
      data: {
        apikey: '0df993c66c0c636e29ecbb5344252a4a',
        city: city
      },
      header: { 'content-type': 'json' },
      success: (result) => {
        let movies = result.data.subjects
        movies.forEach(movie => {
          let data = movie.subject || movie
          this.updateMovieStar(data)
        });
        this.data.allSubjects[0].movies = movies
        this.setData(this.data)
        wx.setStorage({
          key: this.data.allSubjects[0].title,
          data: movies,
        });
      },
      fail: () => {
        wx.toast.error('获取数据失败')
      },
    });

  },
  loadNewData: function (idx) {
    let obj = this.data.allSubjects[idx]
    wx.request({
      url: wx.server.url(obj.url),
      data: {
        apikey: '0df993c66c0c636e29ecbb5344252a4a',
      },
      header: { 'content-type': 'json' },
      success: (result) => {
        let movies = result.data.subjects
        movies.forEach(movie => {
          let data = movie.subject || movie
          this.updateMovieStar(data)
          obj.movies.push(data)
        });
        this.setData(this.data)
        wx.setStorage({
          key: obj.title,
          data: obj.movies,
        });

      },
      fail: () => {
        wx.toast.normal(`获取${this.data.allSubjects[idx].title}失败！`)
      },
    });
  },
  loadCity: function (success) {
    // 获取城市
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: (result) => {
        // 逆地理编码
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3/',
          data: {
            ak: 'YE0UWhG0Wg69qQfYiPUum1l7vlIPKlPh',
            output: 'json',
            coordtype: 'wgs84ll',
            location: `${result.latitude},${result.longitude}`
          },
          method: 'GET',
          success: (result) => {
            let city = result.data.result.addressComponent.city
            city = city.substring(0, city.length - 1)
            success && success(city)
          },
          fail: () => {
            wx.toast.error('获取城市失败')
          },
        });
      },
      fail: () => {
        wx.toast.error('获取地理失败')
      }
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
  viewMore: function (event) {
    const index = event.currentTarget.dataset.index;
    let obj = this.data.allSubjects[index];
    wx.navigateTo({
      url: `/pages/list/list?title=${ obj.title }&url=${ obj.url }`,
    });

  }
})