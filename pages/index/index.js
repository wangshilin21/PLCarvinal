var app = getApp();
Page({
  data: {
    userName: 'PLmeetingroom',//邮箱
    userPassword: wx.getStorageSync('userPw'),//密码
    isAgree: true//记住账号密码凭证
  },
//FOR test git
  onLogin () {
    var that = this;
    var userName, userPassword,res; 
    userName = this.data.userName;
    userPassword = this.data.userPassword;
    console.log(userName);
    console.log(userPassword);
    if(userName === '') {
      wx.showToast({
        title: '账号不能为空',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    };
    if(userName != 'PLmeetingroom'){
      wx.showToast({
        title: '账号错误',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    };
    if(userPassword == '') {
      wx.showToast({
        title: 'Password Wrong',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    }
    if(userPassword != 'Pl123'){
      wx.setStorageSync('userPw', '');
      wx.showToast({
        title: 'Password Wrong',
        image: '../../images/failmsg.png',
        duration: 2000
      });
      return;
    }
    wx.setStorageSync('userPw', 'Pl123');

    wx.request({
      url: 'https://pleeprogram.com/MeetingRoomSys/meetingroom',
      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
      //url: 'http://localhost:8080/MeetingRoomSys/meetingroom',
      data: {
        requestType: 2
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      success: function (res) {
        //console.log(res.data.length);
        app.globalData.roomInfo = res.data;
        //console.log(app.globalData.roomInfo);// 服务器回包信息
      },
      fail: function (err) {
        console.log("请求失败", err);
      }
    })

    wx.switchTab({
      url: '../main/main',
    })
  },
  inputUserName (e) {
    this.setData({
        userName: e.detail.value
      });
  },
  inputUserPassword (e) {
    this.setData({
        userPassword: e.detail.value
      });
  },
  bindAgreeChange (e) {
    this.setData({
        isAgree: !!e.detail.value.length
    });
  }
})