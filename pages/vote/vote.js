// pages/init/init.js
const Xman = require('../../service/xman.js')
const app=getApp()
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
    roundNumber:1,//投票轮数
    playerInfo:'',
    roundFlag:0,//标志位，区分只显示Round1，还是显示Round1： You voted xx
    player1:'Player1_Name',//玩家姓名来源于Server，与前端显示一致
    player2:'Player2_Name',
    player3:'Player3_Name',
    player4:'Player4_Name',
    player5:'Player5_Name',
    player1Alive: 'true',//各个玩家生命状态。只有生命状态为TRUE的时候，才会在投票按钮显示该玩家。
    player2Alive: 'true',
    player3Alive:'true',
    player4Alive: 'true',
    player5Alive: 'true',
    voteButtonLock:0,//初始状态下，投票按钮无锁。0代表无锁，1代表上锁。作用：投票一次后，锁定投票按钮无法再投。进入下一轮后解锁。
    nextRoundLock:1//初始状态下，进入下一轮按钮上锁。0代表无锁，1代表上锁。作用：只有投票后才允许进入下一轮。
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
  backToMenu: function () {
console.log("exit");
    wx.switchTab({
      url: "../main/main"
    })
    console.log("exit over");
  },
  votePlay1:function(){
    var myThis=this;
    if (this.data.voteButtonLock == 0) {
    wx.showModal({
      title: '确定投票给'+this.data.player1+'吗？',
      content: 'Confim to vote  '+this.data.player1+'  ?',
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
              playerInfo: myThis.data.player1,
              roundFlag: 1,
              voteButtonLock: 1,
              nextRoundLock:0
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
        title: '确定投票给' + this.data.player2 + '吗？',
        content: 'Confim to vote  '+this.data.player2+'  ?',
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
              playerInfo: myThis.data.player2,
              roundFlag: 1,
              nextRoundLock: 0,
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
        title: '确定投票给' + this.data.player3 + '吗？',
        content: 'Confim to vote  '+this.data.player3+'  ？',
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
              playerInfo: myThis.data.player3,
              roundFlag: 1,
              nextRoundLock: 0,
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
        title: '确定投票给' + this.data.player4 + '吗？',
        content: 'Confim to vote  '+this.data.player4+'  ？',
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
              playerInfo: myThis.data.player4,
              roundFlag: 1,
              nextRoundLock: 0,
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
        title: '确定投票给' + this.data.player5 + '吗？',
        content: 'Confim to vote  '+this.data.player5+'  ？',
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
              playerInfo: myThis.data.player5,
              roundFlag: 1,
              nextRoundLock: 0,
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
    if(this.data.nextRoundLock==0){
      this.setData({
        roundNumber: this.data.roundNumber + 1,
        roundFlag: 0,
        voteButtonLock: 0
      })
      if (this.data.roundNumber > 3) {
        this.setData({
          gameStatus: 1,
          voteButtonLock: 1
        })
      }
      this.onLoad();
      console.log(this.data.roundNumber);
    }
   this.setData({
     nextRoundLock:1
   })
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