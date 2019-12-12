// pages/welcome/welcome.js
var app = getApp();
var util = require('../../utils/util.js');
const watch = require("../../utils/watch.js");
Page({
  data: {
    title: '谁是卧底',
    name_inputValue: '', //更改后此变量为工号
    responseList: null,
    resResult: 100, //初始值为毫无意义的值
    resState: 100, //初始值为毫无意义的值
    playerOther1_flag: false,
    playerOther2_flag: false,
    playerOther3_flag: false,
    playerOther4_flag: false,
    navigateToMain: false,
    playerOther1_name: "", //用于在界面显示哪位玩家进入游戏
    playerOther2_name: "",
    playerOther3_name: "",
    playerOther4_name: "",
    wordHasGotten: false,
    playerNumber: 0,
    joinState: 0, //初始值为0，代表在报名界面
    flag: 0
  },
  /**
   * 页面的初始数据
   */

  //事件处理函数
  bindKeyInput: function(e) {
    this.setData({
      name_inputValue: e.detail.value
    })
    if (this.data.name_inputValue) {
      wx.setStorageSync('playerMe', this.data.name_inputValue);
      //console.log("Cache data here");
    }

  },
  enterGame_getWords: function() {
    if (this.data.wordHasGotten == false) {
      if (this.data.playerNumber >= 5 && this.data.playerOther4_flag == true) {
        wx.showModal({
          title: '请等待分配词汇',
          content: 'Please wait for your word',
        });
      } else {
        wx.showModal({
          title: '请等待其他玩家进入游戏',
          content: 'Please wait other players',
        });
        return;
      }
    }
    if (this.data.wordHasGotten == true) {
      wx.navigateTo({
        url: '../init/init'
      })
    }

  },
  enterGame: function() { //报名阶段
    var that = this;
    //console.log("Join state is ::" + that.data.joinState);
    //console.log("Player name is " + this.data.name_inputValue);
    if (this.data.name_inputValue === ' ' || this.data.name_inputValue.length == 0) {
      wx.showModal({
        title: '请输入姓名',
        content: 'Please input your name', //工号的英文翻译怎么说？
      });
      return;
    }
    wx.request({
      url: 'https://pleeprogram.com/GameSys/molegamewechat',
      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',  
      data: {
        command: 7,
        userID: this.data.name_inputValue //此处更改为输入工号
      },

      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },

      success: function(res) {
        //  //console.log("response");
        // //console.log("test result is :::::::::::::::"+that.data.responseList[that.data.result]);
        //console.log("result: " + res.data.result);
        //console.log("state: " + res.data.state);
        //console.log("ID Number: " + res.data.userID);
        app.globalData.playerMe = res.data.userID;
        app.globalData.gameState = res.data.state;
        //console.log("Game STATE is : " + app.globalData.gameState);
        //console.log("name PlayerMe: " + res.data.name);
        that.data.resResult = res.data.result;
        that.data.resState = res.data.state;
        that.setData({
          resResult: res.data.result,
          resState: res.data.state,
        });
        console.log("==============Test data.result is " + that.data.resResult);
        console.log("==============Test data.state is " + that.data.resState);
        if (that.data.resResult == 1) {
          wx.showModal({
            title: '报名尚未开始',
            content: 'Registration has not yet started',
          })
          return;
        };
        if (that.data.resResult == 2) {
          wx.showModal({
            title: '报名已经结束',
            content: 'Registration has ended',
          })
          return;
        };
        if (that.data.resResult == 3) {
          wx.showModal({
            title: '报名人数已满',
            content: 'The number of players is full',
          })
          return;
        };
        if (that.data.resResult == 4) {
          wx.showModal({
            title: '重复报名',
            content: 'The ID has already signed in',
          })
          return;
        };
        if (that.data.resResult == 0) {
          //console.log("报名成功！")
          wx.showToast({
            title: 'success',
            icon: 'success',
            duration: 2000,
            mask: true
          })
          setTimeout(function() {
            that.setData({
              joinState: 1
            });
            that.onLoad();
          }, 2000)

        };

      },

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function(options) {
    var that = this;
    let userText = wx.getStorageSync('playerMe') //在名字输入框设置缓存，无需二次输入
    //console.log("Cache data is "+ userText);
    if (app.globalData.isIntervalStopped == true) {
      app.globalData.isIntervalStopped == false
    }
    if (userText) {
      that.data.name_inputValue = userText;
      that.setData({
        name_inputValue: userText
      });
    }
    //watch.setWatcher(this); // 设置监听器，建议在onLoad下调用
    //this.setData({ flag: false })
    wx.setNavigationBarTitle({
      title: '规划经理嘉年华'
    })

      app.globalData.interval = setInterval(function() {
        console.log("interval life cycle is ++++++++++++");
        if (app.globalData.isIntervalStopped == false) {
        if (that.data.joinState == 1) {
          wx.request({
            url: 'https://pleeprogram.com/GameSys/molegamewechat',
            data: {
              command: 9,
            },
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success: function(res) {
              //state
              app.globalData.gameState = res.data.state;
              if(app.globalData.gameState == 0){
                util.resetGlobalData();//重置所有涉及的全局变量
                if (that.data.navigateToMain==false){
                  wx.switchTab({
                    url: '../main/main'
                  })
                  that.data.navigateToMain=true;
                }

              }
              if (app.globalData.gameState != 0) {
                console.log("inside the interval");
                //Player1
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

                if (res.data.playerList.length >= 2) {
                  //Player2
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
                
                if (app.globalData.gameState == 3 || app.globalData.gameState == 4 || app.globalData.gameState == 5){
                  app.globalData.roundResult.finished = res.data.roundResult.finished;
                  app.globalData.roundResult.userIDKilled = res.data.roundResult.userIDKilled;
                  app.globalData.roundResult.roleKilled = res.data.roundResult.role;
                  app.globalData.roundResult.winnerRole = res.data.roundResult.winnerRole;
                  console.log("Winner role is "+app.globalData.roundResult.winnerRole);
                }

                //console.log("global_player1_name:" + app.globalData.player1.name);
                //console.log("global_player2_name:" + app.globalData.player2.name);
                //console.log("global_player3_name:" + app.globalData.player3.name);
                //console.log("global_player4_name:" + app.globalData.player4.name);
                //console.log("global_player5_name:" + app.globalData.player5.name);
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
        }
      
      }, 5000)
   
    // 关闭计时器
  },
  watch: {
    flag: function(newVal, oldVal) {
      var that = this;
      //console.log("+++++++++++++++++++++++++++++++++++++++++++++" + newVal, oldVal)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function() {

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