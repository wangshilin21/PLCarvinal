var app = getApp();
Page({
  onLoad() {
    // 生命周期函数--监听页面加载
  },
  local() {
    if (wx.getStorageSync('userPage')) {
      var userPageStorage = wx.getStorageSync('userPage');
      console.log("userPage in storage is "+ userPageStorage);
      if (userPageStorage == "init") {
        wx.redirectTo({
          url: '../init/init'
        });
      }
      if (userPageStorage == "vote") {
        wx.redirectTo({
          url: '../vote/vote'
        });
      }
      if (userPageStorage == "xmanGame") {
        wx.redirectTo({
          url: '../xmanGame/xmanGame'
        });
      }
    }else {
      wx.redirectTo({//navigate
        url: "../xmanGame/xmanGame"
      })
    }
    console.log("+++++" + userPageStorage);
    console.log("--------" + wx.getStorageSync('userPage'));
  },
  signin() {
    wx.navigateTo({
      url: "../welcome/welcome"
    })
  },
  schedule() {
    wx.navigateTo({
      url: "../guess/guess"
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})