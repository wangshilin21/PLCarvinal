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
    if(this.data.voteButtonLock==0){
      this.setData({
        playerNumber: 1,
        roundFlag: 1,
        voteButtonLock: 1
      })
      this.onLoad();
    }
  },
  votePlay2: function () {
    if (this.data.voteButtonLock == 0) {
    this.setData({
      playerNumber: 2,
      roundFlag:1,
      voteButtonLock: 1
    })
    this.onLoad();
    }
  },
  votePlay3: function () {
    if (this.data.voteButtonLock == 0) {
    this.setData({
      playerNumber: 3,
      roundFlag:1,
      voteButtonLock: 1
    })
    this.onLoad();
    }
  },
  votePlay4: function () {
    if (this.data.voteButtonLock == 0) {
    this.setData({
      playerNumber: 4,
      roundFlag:1,
      voteButtonLock: 1
    })
    this.onLoad();
    }
  },
  votePlay5: function () {
    if (this.data.voteButtonLock == 0) {
    this.setData({
      playerNumber: 5,
      roundFlag:1,
      voteButtonLock: 1
    })
    this.onLoad();
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
        gameStatus: 1
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