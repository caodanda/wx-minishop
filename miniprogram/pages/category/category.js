Page({
  data: {
    cateList:[],
    num:0,
    scrollNum:0
  },
  onLoad: function (options) {
    wx.request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/categories',
      success:(res)=>{
        this.setData({
          cateList:res.data.message
        });  
      }
    })
  },
  getCateIndex(event){
    this.setData({
      // 通过在点击事件的标签上定义data自定义的数据，将对应的数据传入event，在点击事件中对数据进行逻辑处理。
      num:event.currentTarget.dataset.num,
      scrollNum:0
    })
  }
  
})