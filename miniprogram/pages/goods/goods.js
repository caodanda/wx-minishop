// 学习知识点：
// （一）CSS
  /* 单行文本隐藏省略（3个属性）：overflow: hidden; text-overflow: ellipsis; white-space: nowrap */
  /* 多行文本隐藏省略 （4个属性）：overflow: hidden; display:-webkit-box -webkit-box-orient:vertical;  -webkit-line-clamp:2; */
Page({
  data: {
    navList:
    [
      {num:0,value:'综合',isActive:true},
      {num:1,value:'销量',isActive:false},
      {num:2,value:'价格',isActive:false}
    ],
    index:0,
    proList:[],
    newProList:[],
    clickText:'comprehensive',
    proTotal:0
  },
  // 网络请求参数接口定义
  Params:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10,
  },
  onLoad: function (options) {
    this.Params.cid = options.id;
    this.getData();
  },
  // 封装网络请求
  getData(){
    // 网络请求时，显示《加载中》窗口
    wx.showLoading({
      title: '加载中',
      mask:true
    }),
    wx.request({
      url:'https://api-hmugo-web.itheima.net/api/public/v1/goods/search',
      // data为请求的参数,对应参数会传递到成功res中
      data:this.Params,
      success:(res)=>{
        this.setData({
          // 商品数组进行拼接处理，用于下拉触底事件
          proList:[...this.data.proList,...res.data.message.goods],
          proTotal:res.data.message.total
        });       
      },
      complete:()=>{
        // 关闭下拉刷新窗口，如果没有调用下拉刷新的窗口，直接关闭不会报错
        wx.stopPullDownRefresh({}),
        // 关闭《加载中》显示窗口
        wx.hideLoading()
      }
    })
  },
  // 子组件向父组件传递的事件，用于接受子组件的信息
  handleItemChange(e){
    this.setData({  
      index:e.detail
    });
  },
  // 监控用户上拉触底事件，用户触底后加载下一页数据；
  // 1.先判断是否存在第二页数据； 1.1总页数 = 商品总条数/单页面展示条数，使用ceil进行进1取整
  // 2.如果有将商品数组进行连接； 2.1 当前页码++ ； 2.2在请求数据的时候将商品列表prolist写成拼接式；2.3在上拉触底函数中调用网络请求。
  // 3.如果没有提示用户(已经到底了)。调用微信 — — 显示消息提示框方法 wx.showToast 
  onReachBottom(){
    if(this.Params.pagenum >=  Math.ceil(this.data.proTotal/this.Params.pagesize)){
      wx.showToast({title:'已经到底了'});    
    }else{
      this.Params.pagenum++;
      this.getData();
    }
  },
  // 下拉刷新（1.下拉显示刷新窗口采用page的生命周期函数；2.刷新时数据刷新，页码重置为1;3.重新请求数据）
  // 数据请求成功，关闭加载的窗口，直接在网络请求封装的函数中实现
  onPullDownRefresh(){
    this.setData({
      proList:[]
    });
    this.Params.pagenum = 1;
    this.getData()
  }
})