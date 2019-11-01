// pages/init/init.js
const Xman = require('../../service/xman.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '设置游戏',
    xman: null,
    gameStatus: 0,
    blankNumber: 0,
    xmanNumber: 1,
    cards: [],
    currentPlayer: 0,
    result: '游戏进行中',
    word1: '变速箱',
    word1_en:'Gearbox',
    roundNumber:1,
    playerNumber:0,
    roundFlag:0,
    voteButtonLock:0
  },

  
  generatorArray: function (num) {
    let arr = []
    while (num-- > 0) {
      arr.unshift(num)
    }
    return arr
  },
  // 输入游戏参与人数
  bindPlayerInput: function (e) {
    this.setData({
      playerNumber: parseInt(e.detail.value)
    })
  },
  bindBlankInput: function (e) {
    this.setData({
      blankNumber: parseInt(e.detail.value)
    })
  },
  bindXmanInput: function (e) {
    this.setData({
      xmanNumber: parseInt(e.detail.value)
    })
  },
  initXman: function (e) {
    this.setData({
      xman: new Xman()
    })
    let mdata = {
      playerNumber: this.data.playerNumber,
      blankNumber: this.data.blankNumber,
      xmanNumber: this.data.xmanNumber
    }
    // 初始化游戏
    this.data.xman.init(mdata.playerNumber, mdata.xmanNumber, mdata.blankNumber)
    this.data.xman.start()
    let idArray = this.data.xman.getIdArray()
    console.log(idArray)
    this.setData({
      gameStatus: this.data.xman.getStatus(),
      cards: idArray
    })
    // 保存游戏数据
    wx.setStorage({
      key: 'xman',
      data: mdata
    })
  },
  confirmWord: function (e) {
    let curr = this.data.currentPlayer
    let id = this.data.xman.confirmWord(curr)
    console.log(id.desc)
    let that = this
    wx.showModal({
      title: '你的词语',
      content: id.desc,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          that.setData({
            currentPlayer: curr + 1
          })
        }
      }
    })
  },
  exposePlayer: function (e) {
    let playerId = e.currentTarget.dataset.index
    if (playerId === undefined) {
      // alert('index 为空')
      return false
    }
    if (this.data.gameStatus === 2) {
      // alert('游戏已结束')
      return false
    }
    let res = this.data.xman.exposePlayer(playerId)
    console.log(res)
    let idArray = this.data.xman.getIdArray()
    this.setData({
      gameStatus: this.data.xman.getStatus(),
      cards: idArray,
      result: res
    })
  },
  continueGame: function () {
    this.data.xman.start()
    let idArray = this.data.xman.getIdArray()
    console.log(idArray)
    this.setData({
      gameStatus: this.data.xman.getStatus(),
      result: "游戏未开始",
      currentPlayer: 0,
      cards: idArray
    })
  },
  restartGame: function () {
    this.data.xman.reset()
    // this.data.xman = null
    this.setData({
      gameStatus: 0,
      currentPlayer: 0,
      result: "游戏未开始",
      cards: [],
      xman: null
    })
  },
  votePlay1:function(){
    var myThis=this;
    if (this.data.voteButtonLock == 0) {
    wx.showModal({
      title: '确定投票给XX吗？',
      content: 'Confim to vote XX？',
      showCancel: true,//是否显示取消按钮
      cancelText: "No",//默认是“取消”
      cancelColor: 'skyblue',//取消文字的颜色
      confirmText: "Yes",//默认是“确定”
      confirmColor: 'skyblue',//确定文字的颜色
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
        console.log("确认");
            myThis.setData({
              playerNumber: 1,
              roundFlag: 1,
              voteButtonLock: 1
            })
            console.log(myThis.data.playerNumber);
            myThis.onLoad();
        }
      },
      fail: function (res) { },//接口调用失败的回调函数
      complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
    })
    }
  },

  votePlay2: function () {
    var myThis = this;
    if (this.data.voteButtonLock == 0) {
      wx.showModal({
        title: '确定投票给XX吗？',
        content: 'Confim to vote XX？',
        showCancel: true,//是否显示取消按钮
        cancelText: "No",//默认是“取消”
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "Yes",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            console.log("确认");
            myThis.setData({
              playerNumber: 2,
              roundFlag: 1,
              voteButtonLock: 1
            })
            console.log(myThis.data.playerNumber);
            myThis.onLoad();
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
    }
  },
  
  votePlay3: function () {
    var myThis = this;
    if (this.data.voteButtonLock == 0) {
      wx.showModal({
        title: '确定投票给XX吗？',
        content: 'Confim to vote XX？',
        showCancel: true,//是否显示取消按钮
        cancelText: "No",//默认是“取消”
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "Yes",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            console.log("确认");
            myThis.setData({
              playerNumber: 3,
              roundFlag: 1,
              voteButtonLock: 1
            })
            console.log(myThis.data.playerNumber);
            myThis.onLoad();
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
    }
  },
  votePlay4: function () {
    var myThis = this;
    if (this.data.voteButtonLock == 0) {
      wx.showModal({
        title: '确定投票给XX吗？',
        content: 'Confim to vote XX？',
        showCancel: true,//是否显示取消按钮
        cancelText: "No",//默认是“取消”
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "Yes",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            console.log("确认");
            myThis.setData({
              playerNumber: 4,
              roundFlag: 1,
              voteButtonLock: 1
            })
            console.log(myThis.data.playerNumber);
            myThis.onLoad();
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
    }
  },
  votePlay5: function () {
    var myThis = this;
    if (this.data.voteButtonLock == 0) {
      wx.showModal({
        title: '确定投票给XX吗？',
        content: 'Confim to vote XX？',
        showCancel: true,//是否显示取消按钮
        cancelText: "No",//默认是“取消”
        cancelColor: 'skyblue',//取消文字的颜色
        confirmText: "Yes",//默认是“确定”
        confirmColor: 'skyblue',//确定文字的颜色
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            console.log("确认");
            myThis.setData({
              playerNumber: 5,
              roundFlag: 1,
              voteButtonLock: 1
            })
            console.log(myThis.data.playerNumber);
            myThis.onLoad();
          }
        },
        fail: function (res) { },//接口调用失败的回调函数
        complete: function (res) { },//接口调用结束的回调函数（调用成功、失败都会执行）
      })
    }
  },
  nextRound:function(){
    this.setData({
      roundNumber: this.data.roundNumber + 1,
       roundFlag: 0,
       voteButtonLock:0
    })
    if (this.data.roundNumber > 3) {
      this.setData({
        gameStatus: 1,
        voteButtonLock:1
      })
    }
    this.onLoad();
    console.log(this.data.roundNumber);
   /* wx.navigateTo({
      url: "../vote/vote"
    })*/
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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