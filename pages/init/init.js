// pages/init/init.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '设置游戏',
    xman: null,
    gameStatus: 0,
    playerNumber: 8,
    blankNumber: 0,
    xmanNumber: 1,
    cards: [],
    currentPlayer: 0,
    result: '游戏进行中',
    class1: 'z1', //默认正面在上面
    class2: 'z2',
    wordChoose: '',
    navigateToMain: false,
    wordHasGotten: false,
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
  voteXman:function (e){
    
    wx.redirectTo({
      url: '../vote/vote'
    })
  },
  onLoad: function (e) {
    this.setData({
      //xman: new Xman(),
      playerNumber:5,
      blankNumber:0,
      xmanNumber:1,
      wordChoose:app.globalData.cardMe
    })
    ///console.log("Word Choose is " + that.data.wordChoose);
    /** 
    let mdata = {
      playerNumber: this.data.playerNumber,
      blankNumber: this.data.blankNumber,
      xmanNumber: this.data.xmanNumber
    }
    // 初始化游戏
    //this.data.xman.init(mdata.playerNumber, mdata.xmanNumber, mdata.blankNumber)
    //this.data.xman.start()
   // let idArray = this.data.xman.getIdArray()
    console.log(idArray)
    this.setData({
      gameStatus: this.data.xman.getStatus(),
      cards: idArray
    })
    // 保存游戏数据
    wx.setStorage({
      key: 'xman',
      data: mdata
    })*/
  },
 
  rotateFn: function (e) {
    let data = this.data;
    if (data.class1 == 'z1' && data.class2 == 'z2') {
      this.run('front', 'back', 'z2', 'z1');
    } else {
      this.run('back', 'front', 'z1', 'z2');
    }
  },

  run: function (a, b, c, d) {
    let that = this;
    that.setData({
      class1: a,
      class2: b,
    })
    setTimeout(function () {
      that.setData({
        class1: c,
        class2: d,
      })
    }, 1000);
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
  onShow: function (options) {
    app.globalData.userPage = "init";
    wx.setStorageSync('userPage', app.globalData.userPage);
    console.log("-=-=-=-=-=-=-=-=已成功啟動On Show 函數-=-=-=-=-===-INIT界面");
    var that = this;
    var logLock1 = false; ///避免輪詢下多次打Log
    var logLock2 = false;
    var logLock3 = false;
    var logLock4 = false;
    //console.log("Cache data is "+ userText);
    app.globalData.interval1 = setInterval(function () {
      if(app.globalData.interval1==0){return};
      console.log("已進入計時器---INIT");
      if (wx.getStorageSync('gameState')) {
        let gameStateStorage = wx.getStorageSync('gameState');
        app.globalData.gameState = gameStateStorage;
      }
      if (app.globalData.gameState!=0) {
        wx.request({
          url: 'https://pleeprogram.com/GameSys/molegamewechat',
          data: {
            command: 9,
          },
          method: 'GET',
          header: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          success: function (res) {
            //state
            app.globalData.gameState = res.data.state;
            wx.setStorageSync('gameState', app.globalData.gameState);
            if (app.globalData.gameState == 0) {
              util.resetGlobalData(); //重置所有涉及的全局变量
              if (that.data.navigateToMain == false) {
                wx.switchTab({
                  url: '../main/main'
                })
                that.data.navigateToMain = true;
              }
              if (logLock1 == false) {
                //console.log("When GlobalData.gameState is 0,res.data.state is =====" + res.data.state);
                logLock1 == true;
              }
            }
            if (app.globalData.gameState != 0) {
              if (res.data.playerList.length >= 1) {
                app.globalData.player1.userID = res.data.playerList[0].userID;
                app.globalData.player1.name = res.data.playerList[0].name;
                app.globalData.player1.englishName = res.data.playerList[0].englishName;
                app.globalData.player1.role = res.data.playerList[0].role;
                app.globalData.player1.card = res.data.playerList[0].card;
                app.globalData.player1.englishCard = res.data.playerList[0].englishCard;
                app.globalData.player1.objSelected = res.data.playerList[0].objSelected;
                app.globalData.player1.englishObjSelected = res.data.playerList[0].englishObjSelected;
                app.globalData.player1.idSelected = res.data.playerList[0].idSelected;
                app.globalData.player1.killed = res.data.playerList[0].killed;
              }
              if (res.data.playerList.length >= 2) {
                app.globalData.player2.userID = res.data.playerList[1].userID;
                app.globalData.player2.name = res.data.playerList[1].name;
                app.globalData.player2.englishName = res.data.playerList[1].englishName;
                app.globalData.player2.englishCard = res.data.playerList[1].englishCard;
                app.globalData.player2.role = res.data.playerList[1].role;
                app.globalData.player2.card = res.data.playerList[1].card;
                app.globalData.player2.objSelected = res.data.playerList[1].objSelected;
                app.globalData.player2.englishObjSelected = res.data.playerList[1].englishObjSelected;
                app.globalData.player2.idSelected = res.data.playerList[1].idSelected;
                app.globalData.player2.killed = res.data.playerList[1].killed;
              }
              if (res.data.playerList.length >= 3) {
                //Player3
                app.globalData.player3.userID = res.data.playerList[2].userID;
                app.globalData.player3.name = res.data.playerList[2].name;
                app.globalData.player3.englishName = res.data.playerList[2].englishName;
                app.globalData.player3.englishCard = res.data.playerList[2].englishCard;
                app.globalData.player3.role = res.data.playerList[2].role;
                app.globalData.player3.card = res.data.playerList[2].card;
                app.globalData.player3.objSelected = res.data.playerList[2].objSelected;
                app.globalData.player3.englishObjSelected = res.data.playerList[2].englishObjSelected;
                app.globalData.player3.idSelected = res.data.playerList[2].idSelected;
                app.globalData.player3.killed = res.data.playerList[2].killed;
              }
              if (res.data.playerList.length >= 4) {
                //Player4
                app.globalData.player4.userID = res.data.playerList[3].userID;
                app.globalData.player4.name = res.data.playerList[3].name;
                app.globalData.player4.englishName = res.data.playerList[3].englishName;
                app.globalData.player4.englishCard = res.data.playerList[3].englishCard;
                app.globalData.player4.role = res.data.playerList[3].role;
                app.globalData.player4.card = res.data.playerList[3].card;
                app.globalData.player4.objSelected = res.data.playerList[3].objSelected;
                app.globalData.player4.englishObjSelected = res.data.playerList[3].englishObjSelected;
                app.globalData.player4.idSelected = res.data.playerList[3].idSelected;
                app.globalData.player4.killed = res.data.playerList[3].killed;
              }
              if (res.data.playerList.length >= 5) {
                //Player5
                app.globalData.player5.userID = res.data.playerList[4].userID;
                app.globalData.player5.name = res.data.playerList[4].name;
                app.globalData.player5.englishName = res.data.playerList[4].englishName;
                app.globalData.player5.englishCard = res.data.playerList[4].englishCard;
                app.globalData.player5.role = res.data.playerList[4].role;
                app.globalData.player5.card = res.data.playerList[4].card;
                app.globalData.player5.objSelected = res.data.playerList[4].objSelected;
                app.globalData.player5.englishObjSelected = res.data.playerList[4].englishObjSelected;
                app.globalData.player5.idSelected = res.data.playerList[4].idSelected;
                app.globalData.player5.killed = res.data.playerList[4].killed;
              }
              //roundResult

              if (app.globalData.gameState == 3 || app.globalData.gameState == 4 || app.globalData.gameState == 5) {
                app.globalData.roundResult.finished = res.data.roundResult.finished;
                app.globalData.roundResult.userIDKilled = res.data.roundResult.userIDKilled;
                app.globalData.roundResult.roleKilled = res.data.roundResult.role;
                app.globalData.roundResult.winnerRole = res.data.roundResult.winnerRole;
                //console.log("Winner role is " + app.globalData.roundResult.winnerRole);
              }

              //console.log("global_player1_name:" + app.globalData.player1.name);
              //console.log("global_player2_name:" + app.globalData.player2.name);
              //console.log("global_player3_name:" + app.globalData.player3.name);
              //console.log("global_player4_name:" + app.globalData.player4.name);
              //console.log("global_player5_name:" + app.globalData.player5.name);
              if (logLock3 == false) {
               // console.log("在gameState判斷之后-------------------");
                logLock3 == true;
              }
              if (app.globalData.player1.userID == app.globalData.playerMe) {
                app.globalData.playerOther1 = app.globalData.player2;
                app.globalData.playerOther2 = app.globalData.player3;
                app.globalData.playerOther3 = app.globalData.player4;
                app.globalData.playerOther4 = app.globalData.player5;
                app.globalData.playerMyself = app.globalData.player1;
                app.globalData.cardMe = app.globalData.player1.card;
                app.globalData.cardMe_en = app.globalData.player1.englishCard;

              }
              if (app.globalData.playerMe == app.globalData.player2.userID) {
                app.globalData.playerOther1 = app.globalData.player1;
                app.globalData.playerOther2 = app.globalData.player3;
                app.globalData.playerOther3 = app.globalData.player4;
                app.globalData.playerOther4 = app.globalData.player5;
                app.globalData.playerMyself = app.globalData.player2;
                app.globalData.cardMe = app.globalData.player2.card;
                app.globalData.cardMe_en = app.globalData.player2.englishCard;
              }
              if (app.globalData.playerMe == app.globalData.player3.userID) {
                app.globalData.playerOther1 = app.globalData.player1;
                app.globalData.playerOther2 = app.globalData.player2;
                app.globalData.playerOther3 = app.globalData.player4;
                app.globalData.playerOther4 = app.globalData.player5;
                app.globalData.playerMyself = app.globalData.player3;
                app.globalData.cardMe = app.globalData.player3.card;
                app.globalData.cardMe_en = app.globalData.player3.englishCard;
              }
              if (app.globalData.playerMe == app.globalData.player4.userID) {
                app.globalData.playerOther1 = app.globalData.player1;
                app.globalData.playerOther2 = app.globalData.player2;
                app.globalData.playerOther3 = app.globalData.player3;
                app.globalData.playerOther4 = app.globalData.player5;
                app.globalData.playerMyself = app.globalData.player4;
                app.globalData.cardMe = app.globalData.player4.card;
                app.globalData.cardMe_en = app.globalData.player4.englishCard;
              }
              if (app.globalData.playerMe == app.globalData.player5.userID) {
                app.globalData.playerOther1 = app.globalData.player1;
                app.globalData.playerOther2 = app.globalData.player2;
                app.globalData.playerOther3 = app.globalData.player3;
                app.globalData.playerOther4 = app.globalData.player4;
                app.globalData.playerMyself = app.globalData.player5;
                app.globalData.cardMe = app.globalData.player5.card;
                app.globalData.cardMe_en = app.globalData.player5.englishCard;
              }
              if (app.globalData.cardMe.length > 0) {
                that.data.wordHasGotten = true;
                that.setData({
                  wordHasGotten: true
                });
                //console.log("Word for Me is ::" + app.globalData.cardMe);
                //console.log("English Word is " + app.globalData.cardMe_en);
              }

              //console.log("other_player1 : " + app.globalData.playerOther1.name);
              //console.log("other_player2 : " + app.globalData.playerOther2.name);
              //console.log("other_player3 : " + app.globalData.playerOther3.name);
              //console.log("other_player4 : " + app.globalData.playerOther4.name);
              if (app.globalData.playerOther1.userID != "XXX" && app.globalData.playerOther1.userID != "") {
                that.setData({
                  playerOther1_flag: true,
                  playerOther1_name: app.globalData.playerOther1.englishName,
                  playerNumber: 2
                });
              }
              if (app.globalData.playerOther2.userID != "XXX" && app.globalData.playerOther2.userID != "") {
                that.setData({
                  playerNumber: 3,
                  playerOther2_name: app.globalData.playerOther2.englishName,
                  playerOther2_flag: true
                });
              }
              if (app.globalData.playerOther3.userID != "XXX" && app.globalData.playerOther3.userID != "") {
                that.setData({
                  playerOther3_name: app.globalData.playerOther3.englishName,
                  playerNumber: 4,
                  playerOther3_flag: true
                });
              }
              if (app.globalData.playerOther4.userID != "XXX" && app.globalData.playerOther4.userID != "") {
                that.setData({
                  playerOther4_name: app.globalData.playerOther4.englishName,
                  playerNumber: 5,
                  playerOther4_flag: true
                });
              }
            }
            //console.log("state is::" + app.globalData.gameState);

          },
        })
      }


    }, 5000)

    // 关闭计时器
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("-=-=-=-=-=-=-=-=已成功啟動On Hide 函數-=-=-=-=-===-INIT界面");
    clearInterval(app.globalData.interval);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("-=-=-=-=-=-=-=-=已成功啟動On Unload 函數-=-=-=-=-===-Init界面");
    clearInterval(app.globalData.interval1);
    app.globalData.interval1==0;
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