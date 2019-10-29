var app = getApp();
Page({
  onLoad (){
    // 生命周期函数--监听页面加载
  },
  local() {
    wx.navigateTo({
      url: "../xman/xman"
    })
  },
  schedule() {
    wx.navigateTo({
      url: "../check/check"
    })
  }
})
