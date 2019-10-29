// pages/welcome/welcome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '谁是卧底',
    name_inputValue: ' '
  },
  //事件处理函数
  bindKeyInput: function (e) {
    this.setData({
      name_inputValue: e.detail.value
    })
  },
  enterGame: function () {
   console.log("Player name is "+this.data.name_inputValue);
 /*if(this.data.name_inputValue.length==0){
     wx.showModal({
       title: '玩家姓名缺失，请输入姓名',
       content: 'Please input the name of player',
     });
   }*/
   // infoMess: '温馨提示：用户名和密码不能为空！',
    wx.navigateTo({
      url: '../init/init'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '谁是卧底Who is the X-Man'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})