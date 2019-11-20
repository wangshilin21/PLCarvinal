// pages/welcome/welcome.js
var app = getApp();
var util = require('../../utils/util.js');
const watch = require("../../utils/watch.js");
Page({
  data: {
    title: '谁是卧底',
    name_inputValue: ' ',
    responseList: null,
    resResult: 1,
    resState: 0,
    playerOther1_name: "",//仅仅为了调试中打印其他玩家姓名
    playerOther2_name: "",
    playerOther3_name: "",
    playerOther4_name: "",
    playerOther1_flag: false,
    playerOther2_flag: false,
    playerOther3_flag: false,
    playerOther4_flag: false,
    playerNumber: 0,
    joinState: 0,//初始值为0，代表在报名界面
    flag:0
  },
  /**
   * 页面的初始数据
   */

  //事件处理函数
  bindKeyInput: function (e) {
    this.setData({
      name_inputValue: e.detail.value
    })
  },
  enterGame_getWords: function(){
    //var that=this;
    //that.onLoad();
    wx.navigateTo({
      url: '../init/init'
    })
  },
  enterGame: function () {
    var that = this;
    this.setData({ joinState: 1 });
    console.log("Join state is ::" + that.data.joinState);
    console.log("Player name is " + this.data.name_inputValue);
    // app.globalData.player1.name="world"
    //playerNow.name=this.data.name_inputValue;
    // console.log("Test Result:"+playerNow.name);
    if (this.data.name_inputValue === ' ' || this.data.name_inputValue.length == 0) {
      wx.showModal({
        title: '玩家姓名缺失，请输入姓名',
        content: 'Please input the name of player',
      });
      return;
    }

    wx.request({
      url: 'https://pleeprogram.com/GameSys/molegamewechat',
      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
      data: {
        command: 7,
        name: this.data.name_inputValue
      },

      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      },

      success: function (res) {

        //  console.log("response");
        // console.log("test result is :::::::::::::::"+that.data.responseList[that.data.result]);
        console.log("result: " + res.data.result);
        console.log("state: " + res.data.state);
        console.log("name: " + res.data.name);
        app.globalData.playerMe = res.data.name;
        console.log("name PlayerMe: " + res.data.name);
        that.setData({
          resResult: res.data.result,
          resState: res.data.state,
        });

      },

    })
    // console.log("+++++++++response +++++++++++++++   "+that.data.resResult);
    //console.log("+++++++++++result    ++++++++++++++    " + that.data.resState);
    /**通过判断result和state判定是否允许用户进入下一步
    if (that.data.resResult == 1) {
      wx.showModal({
        title: '报名尚未开始',
        content: 'Registration has not yet started',
      })
      return
    };
    if (that.data.resResult == 2) {
      wx.showModal({
        title: '报名已经结束',
        content: 'Registration has ended',
      })
      return
    };
    if (that.data.resResult == 3) {
      wx.showModal({
        title: '报名人数已满',
        content: 'The number of players is full',
      })
      return
    };
    if (that.data.resResult == 0 && that.data.resState == 1) {
      wx.showModal({
        title: '报名成功',
        content: 'Registration succeed',
      });
      wx.navigateTo({
        url: '../init/init'
      })
    };
    */
    //**+++++++++++++真正使用时需要屏蔽下面，使用上方注释掉的内容++++++++++++++++++++++ */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    watch.setWatcher(this); // 设置监听器，建议在onLoad下调用
    //this.setData({ flag: false })
    wx.setNavigationBarTitle({
      title: '规划经理嘉年华'
    })
    var interval = setInterval(function () {
      if (that.data.joinState == 1) {
        that.data.flag=that.data.flag+1;
        console.log("test data is "+that.data.flag);
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
            app.globalData.state = res.data.state;
            console.log("state is::" + app.globalData.state);
            //Player1
            app.globalData.player1.name = res.data.playerList[0].name;
            console.log("Size is ++" + res.data.playerList.length);
            app.globalData.player1.role = res.data.playerList[0].role;
            app.globalData.player1.card = res.data.playerList[0].card;
            app.globalData.player1.objSelected = res.data.playerList[0].objSelected;
            app.globalData.player1.killed = res.data.playerList[0].killed;
            that.data.playerNumber = 1;
            console.log("Player Number is " + that.data.playerNumber);

            if (res.data.playerList.length >= 2) {
              //Player2
              app.globalData.player2.name = res.data.playerList[1].name;
              app.globalData.player2.role = res.data.playerList[1].role;
              app.globalData.player2.card = res.data.playerList[1].card;
              app.globalData.player2.objSelected = res.data.playerList[1].objSelected;
              app.globalData.player2.killed = res.data.playerList[1].killed;
              that.data.playerNumber = 2;
              console.log("Player Number is " + that.data.playerNumber);
            }
            if (res.data.playerList.length >= 3) {
              //Player3
              app.globalData.player3.name = res.data.playerList[2].name;
              app.globalData.player3.role = res.data.playerList[2].role;
              app.globalData.player3.card = res.data.playerList[2].card;
              app.globalData.player3.objSelected = res.data.playerList[2].objSelected;
              app.globalData.player3.killed = res.data.playerList[2].killed;
              that.data.playerNumber = 3;
              console.log("Player Number is " + that.data.playerNumber);
            }
            if (res.data.playerList.length >= 4) {
              //Player4
              app.globalData.player4.name = res.data.playerList[3].name;
              app.globalData.player4.role = res.data.playerList[3].role;
              app.globalData.player4.card = res.data.playerList[3].card;
              app.globalData.player4.objSelected = res.data.playerList[3].objSelected;
              app.globalData.player4.killed = res.data.playerList[3].killed;
              that.data.playerNumber = 4;
              console.log("Player Number is " + that.data.playerNumber);
            }
            if (res.data.playerList.length >= 5) {
              //Player5
              app.globalData.player5.name = res.data.playerList[4].name;
              app.globalData.player5.role = res.data.playerList[4].role;
              app.globalData.player5.card = res.data.playerList[4].card;
              app.globalData.player5.objSelected = res.data.playerList[4].objSelected;
              app.globalData.player5.killed = res.data.playerList[4].killed;
              that.data.playerNumber = 5;
              console.log("Player Number is " + that.data.playerNumber);
              //roundResult
              //app.globalData.roundResult.nameKilled = res.data.roundResult.nameKilled;
              //app.globalData.roundResult.roleKilled = res.data.roundResult.role;
              //app.globalData.roundResult.finished = res.data.roundResult.finished;
              //app.globalData.roundResult.winnerRole = res.data.roundResult.winnerRole;
            }
            console.log("global_player1_name:" + app.globalData.player1.name);
            console.log("global_player2_name:" + app.globalData.player2.name);
            console.log("global_player3_name:" + app.globalData.player3.name);
            console.log("global_player4_name:" + app.globalData.player4.name);
            console.log("global_player5_name:" + app.globalData.player5.name);
            console.log("global_player1_role:" + app.globalData.player1.role);
            console.log("global_player1_card:" + app.globalData.player1.card);
            if (app.globalData.player1.name == app.globalData.playerMe) {
              app.globalData.playerOther1 = app.globalData.player2;
              app.globalData.playerOther2 = app.globalData.player3;
              app.globalData.playerOther3 = app.globalData.player4;
              app.globalData.playerOther4 = app.globalData.player5;
              app.globalData.cardMe = app.globalData.player1.card;
            }
            if (app.globalData.playerMe == app.globalData.player2.name) {
              app.globalData.playerOther1 = app.globalData.player1;
              app.globalData.playerOther2 = app.globalData.player3;
              app.globalData.playerOther3 = app.globalData.player4;
              app.globalData.playerOther4 = app.globalData.player5;
              app.globalData.cardMe = app.globalData.player2.card;
            }
            if (app.globalData.playerMe == app.globalData.player3.name) {
              app.globalData.playerOther1 = app.globalData.player1;
              app.globalData.playerOther2 = app.globalData.player2;
              app.globalData.playerOther3 = app.globalData.player4;
              app.globalData.playerOther4 = app.globalData.player5;
              app.globalData.cardMe = app.globalData.player3.card;
            }
            if (app.globalData.playerMe == app.globalData.player4.name) {
              app.globalData.playerOther1 = app.globalData.player1;
              app.globalData.playerOther2 = app.globalData.player2;
              app.globalData.playerOther3 = app.globalData.player3;
              app.globalData.playerOther4 = app.globalData.player5;
              app.globalData.cardMe = app.globalData.player4.card;
            }
            if (app.globalData.playerMe == app.globalData.player5.name) {
              app.globalData.playerOther1 = app.globalData.player1;
              app.globalData.playerOther2 = app.globalData.player2;
              app.globalData.playerOther3 = app.globalData.player3;
              app.globalData.playerOther4 = app.globalData.player4;
              app.globalData.cardMe = app.globalData.player5.card;
            }
            console.log("Word for Me is ::"+app.globalData.cardMe);
            console.log("other_player1 : " + app.globalData.playerOther1.name);
            console.log("other_player2 : " + app.globalData.playerOther2.name);
            console.log("other_player3 : " + app.globalData.playerOther3.name);
            console.log("other_player4 : " + app.globalData.playerOther4.name);
            if (app.globalData.playerOther1.name != "no name" ) {
              that.data.playerOther1_flag = true;
              that.data.playerOther1_name = app.globalData.playerOther1.name;
              console.log("flag1::" + that.data.playerOther1_flag);
              console.log("name1::" + that.data.playerOther1_name);
            }
            if (app.globalData.playerOther2.name != "no name") {
              that.data.playerOther2_flag = true;
              that.data.playerOther2_name = app.globalData.playerOther2.name;
              console.log("flag2::" + that.data.playerOther2_flag);
              console.log("name2::" + that.data.playerOther2_name);
            }
            if (app.globalData.playerOther3.name != "no name") {
              that.data.playerOther3_flag = true;
              that.data.playerOther3_name = app.globalData.playerOther3.name;
              console.log("flag3::" + that.data.playerOther3_flag);
              console.log("name3::" + that.data.playerOther3_name);
            }
            if (app.globalData.playerOther4.name != "no name") {
              that.data.playerOther4_flag = true;
              that.data.playerOther4_name = app.globalData.playerOther4.name;
              console.log("flag4::" + that.data.playerOther4_flag);
              console.log("name4::" + that.data.playerOther4_name);
            }
          },
        })
      }

    }, 5000)
    // 生命周期函数--监听页面加载
  },
  watch:{
      flag: function (newVal, oldVal) {
        var that=this;
        console.log("+++++++++++++++++++++++++++++++++++++++++++++" + newVal, oldVal)
      }
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