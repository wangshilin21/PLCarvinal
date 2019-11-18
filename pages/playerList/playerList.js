var app = getApp();
Page({
  data: {
   playerOther1_name:"",
   playerOther2_name:"",
   playerOther3_name:"",
   playerOther4_name:"",
   playerOther1_flag:false,
   playerOther2_flag:false,
   playerOther3_flag:false,
   playerOther4_flag:false,
   playerNumber:0,
   joinState:0,//初始值是0，进入报名界面；在报名后置1，显示报名信息
  },
  
  onLoad() {
    var that = this;
    var interval = setInterval(function () {
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

          if (res.data.playerList.length >= 2) {
            //Player2
            app.globalData.player2.name = res.data.playerList[1].name;
            app.globalData.player2.role = res.data.playerList[1].role;
            app.globalData.player2.card = res.data.playerList[1].card;
            app.globalData.player2.objSelected = res.data.playerList[1].objSelected;
            app.globalData.player2.killed = res.data.playerList[1].killed;
          }
          if (res.data.playerList.length >= 3) {
            //Player3
            app.globalData.player3.name = res.data.playerList[2].name;
            app.globalData.player3.role = res.data.playerList[2].role;
            app.globalData.player3.card = res.data.playerList[2].card;
            app.globalData.player3.objSelected = res.data.playerList[2].objSelected;
            app.globalData.player3.killed = res.data.playerList[2].killed;
          }
          if (res.data.playerList.length >= 4){
            //Player4
            app.globalData.player4.name = res.data.playerList[3].name;
            app.globalData.player4.role = res.data.playerList[3].role;
            app.globalData.player4.card = res.data.playerList[3].card;
            app.globalData.player4.objSelected = res.data.playerList[3].objSelected;
            app.globalData.player4.killed = res.data.playerList[3].killed;
          }
          if (res.data.playerList.length >= 5){
            //Player5
            app.globalData.player5.name = res.data.playerList[4].name;
            app.globalData.player5.role = res.data.playerList[4].role;
            app.globalData.player5.card = res.data.playerList[4].card;
            app.globalData.player5.objSelected = res.data.playerList[4].objSelected;
            app.globalData.player5.killed = res.data.playerList[4].killed;
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
          if (app.globalData.player1.name == app.globalData.playerMe){
            app.globalData.playerOther1 = app.globalData.player2.name;
            app.globalData.playerOther2 = app.globalData.player3.name;
            app.globalData.playerOther3 = app.globalData.player4.name;
            app.globalData.playerOther4 = app.globalData.player5.name;
          }
          if (app.globalData.playerMe == app.globalData.player2.name) {
            app.globalData.playerOther1 = app.globalData.player1.name;
            app.globalData.playerOther2 = app.globalData.player3.name;
            app.globalData.playerOther3 = app.globalData.player4.name;
            app.globalData.playerOther4 = app.globalData.player5.name;
          }
          if (app.globalData.playerMe == app.globalData.player3.name) {
            app.globalData.playerOther1 = app.globalData.player1.name;
            app.globalData.playerOther2 = app.globalData.player2.name;
            app.globalData.playerOther3 = app.globalData.player4.name;
            app.globalData.playerOther4 = app.globalData.player5.name;
          }
          if (app.globalData.playerMe == app.globalData.player4.name) {
            app.globalData.playerOther1 = app.globalData.player1.name;
            app.globalData.playerOther2 = app.globalData.player2.name;
            app.globalData.playerOther3 = app.globalData.player3.name;
            app.globalData.playerOther4 = app.globalData.player5.name;
          }
          if (app.globalData.playerMe == app.globalData.player5.name) {
            app.globalData.playerOther1 = app.globalData.player1.name;
            app.globalData.playerOther2 = app.globalData.player2.name;
            app.globalData.playerOther3 = app.globalData.player3.name;
            app.globalData.playerOther4 = app.globalData.player4.name;
          }
          console.log("other_player1 : "+  app.globalData.playerOther1);
          console.log("other_player2 : " + app.globalData.playerOther2);
          console.log("other_player3 : " + app.globalData.playerOther3);
          console.log("other_player4 : " + app.globalData.playerOther4);
          if(app.globalData.playerOther1.length!=0){
          that.data.playerOther1_flag=true;
          that.data.playerOther1_name=app.globalData.playerOther1;
          console.log("flag1::" + that.data.playerOther1_flag);
          console.log("name1::" + that.data.playerOther1_name);
          }
          if (app.globalData.playerOther2.length != 0) {
            that.data.playerOther2_flag = true;
            that.data.playerOther2_name = app.globalData.playerOther2;
            console.log("flag2::" + that.data.playerOther2_flag);
            console.log("name2::" + that.data.playerOther2_name);
          }
          if (app.globalData.playerOther3.length != 0) {
            that.data.playerOther3_flag = true;
            that.data.playerOther3_name = app.globalData.playerOther3;
            console.log("flag3::" + that.data.playerOther3_flag);
            console.log("name3::" + that.data.playerOther3_name);
          }
          if (app.globalData.playerOther4.length != 0) {
            that.data.playerOther4_flag = true;
            that.data.playerOther4_name = app.globalData.playerOther4;
            console.log("flag4::" + that.data.playerOther4_flag);
            console.log("name4::" + that.data.playerOther4_name);
          }
        },
      })
    }, 1000000)
    // 生命周期函数--监听页面加载
  },

  enterGame: function () {

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
