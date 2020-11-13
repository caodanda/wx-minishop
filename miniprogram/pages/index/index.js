Page({
  data: {
    swiperList:[],
    catesList:[],
    floorData:[],
    productList:[]
  },
  onLoad: function (options) {
    // 回调情况比较复杂，可以采用promise优化——需要再学习
    // 1.获取轮播图的数据
    wx.request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success:(res)=>{
        // 注意：使用箭头函数，否则找不到this；
        this.setData({
          swiperList:res.data.message
        });
        // 注意：在方法中使用data中数据时，需要用this.data.变量名的方式，否则找不到data中的变量。
        // console.log(this.data.swiperList);
      }
    }) ,
    // 2.获取分类导航的数据
    wx.request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      success:(res)=>{
        this.setData({
          catesList:res.data.message
        });
      }
    }),
    // 3.获取商品楼层的数据
    wx.request({
      url:"https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
      success:(res)=>{
        this.setData({
          floorData:res.data.message,
        });
      }
    })
  }
})