Component({
  properties: {
    navList:{
      type:Array,
      value:[]
  }},
  data: {
    num:0
  },
  methods: {
    // 点击事件获取索引
    handleTap(e){
      this.setData({
        num:e.currentTarget.dataset.num
      });
      // 子组件向父组件传递信息，第一个参数指定父组件的事件名；为第二个参数为传递的数据
      this.triggerEvent('getClickIndex',this.data.num)
    }
  }
})
