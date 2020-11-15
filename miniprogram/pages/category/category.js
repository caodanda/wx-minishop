// 学习知识点：
// 1.两栏/三栏布局可以采用flex布局，利用项目属性为flex划分不同的宽度比例；也可以采用float形式，会比较麻烦；
// 2. 动态calss或style样式，可以采用三元运算符，格式需要添加花括号{{num === index1 ? 'active' : ''}}；
// 3.正常组件的点击事件为bindtap，通过自定义data属性，可以将data的数据传入点击事件中作调用处理。
// 4.navigator 标签为块级标签，通过dispaly：inline-block 转化为行内块元素，实现多个导航并排
Page({
  data: {
    cateList:[],
    num:0
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
      num:event.currentTarget.dataset.num
    })
  }
  
})