Page({
  data: {
    cartData:[],
    address:{},
    allChecked:false,
    allPrices:0,
    allProNums:0
  },
  onShow: function (options) {
    this.allCheckedChoose()
    this.totalData()
  },
  // 《-----获取收货地址 点击----》
  handleAddress(){
// 获取用户的收货地址
    wx.chooseAddress({
      success: (res)=> {
        this.setData({
          address:res
        }),
        wx.setStorageSync('address', this.data.address)
      }
    })
  },
   // 《-----全选按钮  自动判断----》
   allCheckedChoose(){
    // 获取本地缓存数据
    let cart =  wx.getStorageSync('cart');
    // 判断所有商品的check为true，则全选按钮勾选;空数组调用every，返回值为true
    let Checked = cart.length ? cart.every(e => e.check) :false;
    this.setData({
      cartData:cart,
      allChecked:Checked,
    });
  },
  // 《-----全选按钮 点击逻辑----》
  allCheckChange(){
    let cart =  wx.getStorageSync('cart');
    if(this.data.allChecked === true){
    cart.map(v=>{v.check = false})
    this.data.allChecked = false
    }else{
    cart.map(v=>{v.check = true})
    this.data.allChecked = true
    }
    this.setData({
      cartData:cart
    })
    wx.setStorageSync('cart', this.data.cartData)
    this.totalData()
  },
  // 《-----商品复选框 点击事件----》
  changeCheck(e){
    let cart =  wx.getStorageSync('cart');
    let index = e.currentTarget.dataset.index;
    cart[index].check = !cart[index].check;
    this.setData({
      cartData:cart
    });
    wx.setStorageSync('cart', this.data.cartData);
    this.allCheckedChoose(),
    this.totalData()
  },
  // 《-----商品数量 减法 逻辑----》
  sub(e){
    let cart =  wx.getStorageSync('cart');
    let index = e.currentTarget.dataset.index;
    if(cart[index].Nums >1){
      cart[index].Nums--;
    }else{
      wx.showToast({
        title: '至少购买1件哦',
      })
    };
    this.setData({
      cartData:cart
    })
    wx.setStorageSync('cart', this.data.cartData)
    this.totalData()
  },
  // 《-----商品数量 加法 逻辑----》
  add(e){
    let cart =  wx.getStorageSync('cart');
    let index = e.currentTarget.dataset.index;
    cart[index].Nums++;
    this.setData({
      cartData:cart
    })
    wx.setStorageSync('cart', this.data.cartData)
    this.totalData()
  },
  // 《-----计算商品总价格/总数量----》
  // 1.先获取缓存数据 2.遍历数组中的元素判断是否勾选
  // 3.计算勾选商品的总价格（价格*数量）、总数量，进行累加 赋值给data中数据
  // 4.更新data数据,需要在onShow/复选框点击/ 减少/添加事件/全选/中调用此函数进行页面数据更新
  totalData(){
    let cart = wx.getStorageSync('cart');
    let totalPrice = cart.reduce((total,value)=>{
      if(value.check == true){
        total+= Number(value.goods_price * value.Nums);}
      return total
    },0);
    let totalNums = cart.reduce((total,value)=>{
      if(value.check == true){
        total+= Number(value.Nums);}
      return total
    },0);
    this.setData({
      allPrices:totalPrice,
      allProNums:totalNums
    })
  },
  // 《-----删除商品 逻辑----》
  // 处理逻辑：1.获取本地缓存数据；2.判断数组中哪些元素被勾选，遍历数组并将勾选的元素在数组中删除；3.更新data数据和缓存数据。4.调用计算总金额和总商品数量的函数；5.如果全部未勾选，则提示用户《未选择任何商品》
  delPro(){
    let cart = wx.getStorageSync('cart')
    if(cart.every(e=>{ 
      return e.check== false
     })== true){
       wx.showToast({
         title: '未选择任何商品哦',
       })
     } 
    cart.forEach((value,index) => {
      if(value.check == true){
        cart.splice(index,1)
      }
    });
    this.setData({
      cartData:cart
    });
    wx.setStorageSync('cart', this.data.cartData);
    this.totalData()
  },
  // 《-----用户输入商品数量 逻辑----》
  // 处理逻辑：添加input的bindinput事件，在键盘输入时触发，可以通过参数拿到用户输入的内容
  // 1.获取本地缓存购物车的数组；2.获取用户输入对应的数组的索引；3.将对应商品的数量修改为用于输入的数量；4.更新data和缓存中的数据;5.数据更新调用总价格/数量更新的函数
  handleNum(e){
    let cart = wx.getStorageSync('cart');
    let index = e.currentTarget.dataset.index;
    cart[index].Nums = e.detail.value
    this.setData({
      cartData:cart
    })
    wx.setStorageSync('cart', this.data.cartData)
    this.totalData()
  },
  // 《-----点击结算 处理逻辑----》
  handleSettle(){
    // every判断购物车元素是否全部没选择，如果元素.check全部为false，则返回false；否则返回true。
    // 判断是否选中商品也可以使用 totalNums 选择的总数量进行选择
    let every = this.data.cartData.length ? !this.data.cartData.every(e => e.check == false) : false;
    // 先判断是否选择商品，以及选择收货地址
    if(JSON.stringify(this.data.address) == "{}"){
      wx.showToast({
        title: '您还没有选择收货地址',
        icon:'none'
      });
    }
    if(every == false){
      wx.showToast({
        title: '您还没有选择商品',
        icon:'none'
      });
    }
    // 点击跳转到应用中某个页面（保留当前的页面）
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
    
    
  }
})