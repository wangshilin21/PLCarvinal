var app = getApp();
var util = require('../../utils/util.js');
Page({
  data:{
  id_input:"",
  playerName:"",
  playerName_en:"",
  resResult:100,//毫无意义的默认值
  resState:100
  },
  onLoad() {
    // 生命周期函数--监听页面加载
  },
  bindKeyInput: function (e) {
    this.setData({
      id_input: e.detail.value
    })

  },
  signinUserPage00: function (e) {
    wx.redirectTo({
      url: '../team/team',
    })
  },
  signinUserPage: function (e) {
    var that = this;
    wx.request({
      url: 'https://pleeprogram.com/GameSys/molegamewechat',
      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',  
      data: {
        command: 10,
        userID: this.data.id_input//此处更改为输入工号
      },

      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },

      success: function (res) {
        console.log("result: " + res.data.result);
        console.log("ID Number: " + res.data.userID);
        app.globalData.playerMe_team = res.data.teamFlag; 
        that.data.resResult = res.data.result;
        that.data.playerName = res.data.name;
        that.data.playerName_en = res.data.englishName;
        that.setData({
          resResult: res.data.result,
          playerName_en:res.data.englishName
        });
        if (that.data.resResult == 0) {
          console.log("签到成功！")
          console.log("分组信息为"+app.globalData.playerMe_team);
          wx.showToast({
            title: 'Welcome',
            icon: 'success',
            duration: 8000,
            mask: true
          })
          setTimeout(function () {
            that.setData({
              joinState: 1
            });
            that.onLoad();
            /**wx.switchTab({
              url: "../user/user"
            })*/
            wx.reLaunch({
              url: '../team/team',
            })
          }, 2000)
 
        };
        if (that.data.resResult == 2) {
          console.log("重复签到！")
          console.log("分组信息为" + app.globalData.playerMe_team);
          wx.showModal({
            title: '您已签到，无需重复签到',
            content: 'You have already signed in',
          });

        };
        console.log("输入的工号是 " + that.data.id_input);
        if(that.data.resResult == 4){
          wx.showModal({
            title: '请输入工号后再签到',
            content: 'Please sign in after typing in your ID',
          });
          return;
        };

      },

    })
    console.log("note");

  },
  /**
   * 生命周期函数--监听页面加载
   */

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
