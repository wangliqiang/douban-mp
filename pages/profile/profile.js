// pages/pofile/profile.js
Page({
  data: {
    items: [
      { icon: 'ic_cat_movie.png', title: '观影分析', count: '0', has: '看过', mark: '标记10部电影\n开启音乐分析' },
      { icon: 'ic_cat_book.png', title: '读书分析', count: '0', has: '读过', mark: '标记10本书\n开启读书分析' },
      { icon: 'ic_cat_music.png', title: '音乐分析', count: '0', has: '听过', mark: '标记10张唱片\n开启电影分析' }
    ]
  },
  begin: function (event) {
    let item = event.currentTarget.dataset.item
    console.log(item)
  },
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})