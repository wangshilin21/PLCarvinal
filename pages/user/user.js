const Xman = require('../../service/xman.js')
var app = getApp();
Page({
  data: {
    hd_open_top: 290,
    hb_body_top: 240,
    hb_head_radius: 30,
    show_open: true,
    hb_body_radius_shang: 0,
    hb_body_radius_xia: 120,
    hb_money_top: 240,
    hb_body_zindex: 4,
    textRandom_cal: 0,
    cardNumber: 0,
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
    team:111//初始值为无意义的值
  },
  backToMain: function (e) {
    console.log("note1");
    console.log("Global team flag is " + app.globalData.playerMe_team);
    wx.switchTab({
      url: "../main/main"
    })
  },
  rotateFn: function (e) {
    let data = this.data;
    var that = this;
    var that=this;
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
  onShow() {
    var that=this;
    var funcCard=0;

    that.setData({
      team: app.globalData.playerMe_team
    });
    if(that.data.team!=404){
      wx.setStorageSync('teamNumber', that.data.team);
    }
    if (wx.getStorageSync('teamNumber')) {
      that.data.team = wx.getStorageSync('teamNumber');
      that.setData({
        team: wx.getStorageSync('teamNumber')
      });
    }
    //that.data.team = app.globalData.playerMe_team;
    console.log("Before----------"+funcCard);
    if (wx.getStorageSync('functionCard')){
    funcCard = wx.getStorageSync('functionCard');
    }
    console.log("After+++++++" + funcCard);
    if (funcCard != 1 && funcCard != 2 && funcCard != 3 && funcCard != 4 && funcCard != 5 && funcCard != 6) {
      //只有首次开卡的时候会生成随机数并赋值
      this.data.textRandom_cal = Math.floor(Math.random() * 100 + 1);
     // console.log("random number is " + this.data.textRandom_cal);
      funcCard = this.data.textRandom_cal % 6 + 1;
      wx.setStorageSync('functionCard', funcCard);
    }
    if (funcCard == 1) {
      this.setData({
        wordChoose:'card1'
      });
    }
    if (funcCard  == 2) {
      this.setData({
        wordChoose: 'card2'
      });
    }
    if (funcCard  == 3 ) {
      this.setData({
        wordChoose: 'card3'
      });
    }
    if (funcCard  == 4) {
      this.setData({
        wordChoose: 'card4'
      });
    }
    if (funcCard  == 5) {
      this.setData({
        wordChoose: 'card5'
      });
    }
    if (funcCard  == 6) {
      this.setData({
        wordChoose: 'card6'
      });
    }
    that.onLoad();
    // 生命周期函数--监听页面加载
  },
  onLoad(){

  }
})