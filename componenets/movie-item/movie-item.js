// componenets/movie-item/movie-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movie: {
      type: Object,
      value: null,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function () {
      wx.navigateTo({
        url: `/pages/detail/detail?title=${ this.data.movie.title }&id=${ this.data.movie.id }`,
      });
        
    }
  }
})
