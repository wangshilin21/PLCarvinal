Page({
  data: {
    word_inputValue: '',
    userID:'',
    resWord:"",
    resResult:-1,
    resUserID:-1,
     //更改后此变量为工号
  },
  /**
   * 页面的初始数据
   */
  bindKeyInput: function (e) {
    this.setData({
      word_inputValue: e.detail.value
    })
  },
  sendWord: function () { //报名阶段
    var that = this;
    that.data.userID = wx.getStorageSync('playerMe');
    console.log("user ID is "+that.data.userID);
    if (this.data.word_inputValue === ' ' || this.data.word_inputValue.length == 0) {
      wx.showModal({
        title: '请输入要发送的词汇',
        content: 'Please input the word', //工号的英文翻译怎么说？
      });
      return;
    }
    wx.showToast({
      title: 'Uploading...',
      icon: 'loading',
      mask: true,
      duration: 10000
    }),
    wx.request({
      url: 'https://pleeprogram.com/GameSys/guessgamewechat',
      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',  
      data: {
        command: 4,
        userID: that.data.userID,
        word:that.data.word_inputValue
         //此处更改为输入工号
      },

      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },

      success: function (res) {
        wx.hideToast();
        that.data.resResult = res.data.result;
        that.data.resWord = res.data.word;
        that.data.resUserID = res.data.userID;
        console.log(" return result is "+ res.data.result);
        console.log(" return word is "+res.data.word);
        if (that.data.resResult == 0) {
          wx.showModal({
            title: '投词成功',
            showCancel: false,
            content: 'Pushing word succeeds',
          })
          return;
        };
        if (that.data.resResult == 1) {
          wx.showModal({
            title: '投词尚未开始',
            showCancel: false,
            content: 'Pushing word has not yet started',
          })
          return;
        };
        if (that.data.resResult == 2) {
          wx.showModal({
            title: '投词已经结束',
            showCancel: false,
            content: 'Pushing word has ended',
          })
          return;
        };
        if (that.data.resResult == 3) {
          wx.showModal({
            title: '您输入的词汇为空',
            showCancel: false,
            content: 'The word is empty',
          })
          return;
        };
        if (that.data.resResult == 4) {
          wx.showModal({
            title: '数据库写入失败',
            showCancel: false,
            content: 'Writing into database failed',
          })
          return;
        };
      },

    })
  },
  //事件处理函数
})