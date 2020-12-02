import {proList} from "../../proList.js";
Page({
  data: {
    mainData:{},
    proImg:[
      'https://img.alicdn.com/imgextra/i1/196993935/O1CN0170ScVt1ewH8ulDbr9_!!0-item_pic.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i1/196993935/O1CN01hsSKMU1ewH8r9wPdk-196993935.jpg_430x430q90.jpg',
      'https://img.alicdn.com/imgextra/i2/196993935/O1CN01oXTs2c1ewH8mTx9cF-196993935.jpg_430x430q90.jpg'
    ],
    proTitle:{
      price:188,
      title:"女装 3D柔软羊仔毛茧形针织开衫(长袖) 设计感小众外穿连帽毛衣女秋冬2020新款韩版宽松慵懒风毛线衣外套"
    },
    swiperIndex:0,
    proId:0,
    shopData:[]
  },
  onLoad: function (options) { 
    this.setData({
      proId:options.goodid
    });
    proList.map((value)=>{
      if(value.goods_id == options.goodid){
        this.setData({
          mainData: value
        })
      }
    });    
  },
  handletap(e){
    this.setData({
      swiperIndex:e.currentTarget.dataset.index
    });
    // 在新页面全屏预览图片
    wx.previewImage({
      current: this.data.mainData.goods_img[this.data.swiperIndex], 
      urls: this.data.mainData.goods_img
    })
  },
    // 点击加入购物车的操作：
    // 1.先获取到点击的商品信息（mainData）;
    // 2.将获取的商品信息（商品图片/商品名称/售卖方，用户点击添加的数量）保存到本地缓存的数组对象中；
    // 本地缓存的数据不会跟着页面刷新，可以保留数据。
    // 3.需要判断用户点击的id是否存在数组中，如果存在就将商品数量++；不存在将上述商品信息新添加到数组
    // 4.当添加到数组后提示《添加成功》的字样。
    // 5.正常流程需要校验后台商品库存（先点击再校验）
  addShopCar(e){
    let cartData = wx.getStorageSync('cart')||[];
    let index = cartData.findIndex(v=>v.goods_id == Number(this.data.proId));
    if(index === -1){
      cartData.push(this.data.mainData);
      this.data.mainData.Nums = 1;
      this.data.mainData.check = true
    }else{
      cartData[index].Nums++;
    };
    wx.setStorageSync('cart', cartData);
    wx.showToast({
      title:'添加成功',
      icon:'success',
      mask:true
    });
  }
})