const Xman = require('../../service/xman.js')
const app = getApp()
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
    cardNumber: 0
  },
  openHongbao: function() {
    var hd_open_top = this.data.hd_open_top;
    var hb_body_top = this.data.hb_body_top;
    var hb_body_radius_shang = this.data.hb_body_radius_shang;
    var hb_body_radius_xia = this.data.hb_body_radius_xia;
    var hb_money_top = this.data.hb_money_top;
    var that = this;
    if (hd_open_top < 360) {
      var timerTem = setTimeout(function() {
        hd_open_top = hd_open_top + 10;
        that.setData({
          hd_open_top: hd_open_top
        })
        that.openHongbao()
      }, 20)
    } else if (hb_body_top > 0) {
      var timerTem = setTimeout(function() {
        hb_body_top = hb_body_top - 20;
        hb_body_radius_xia = hb_body_radius_xia - 10;
        hb_body_radius_shang = hb_body_radius_shang + 10;
        that.setData({
          hb_body_top: hb_body_top,
          show_open: false,
          hb_head_radius: 0,
          hb_body_radius_xia: hb_body_radius_xia,
          hb_body_radius_shang: hb_body_radius_shang
        })
        that.openHongbao()
      }, 20)
    } else if (hb_money_top > 10) {
      var timerTem = setTimeout(function() {
        hb_money_top = hb_money_top - 2;
        that.setData({
          hb_money_top: hb_money_top,
          hb_body_zindex: 1
        })
        that.openHongbao()
      }, 20)
    }
  },

  backToMain: function (e) {
    console.log("note1");
    wx.switchTab({
      url: "../main/main"
    })
  },

  onLoad() {
    if (app.globalData.infoCardNumber == 1111) {
      //只有首次开卡的时候会生成随机数并赋值
      this.data.textRandom_cal = Math.floor(Math.random() * 100 + 1);
      console.log("random number is " + this.data.textRandom_cal);
      app.globalData.infoCardNumber = this.data.textRandom_cal % 3 + 1;
    }
    console.log("CARD NUMBER IS ---" + app.globalData.infoCardNumber);
    if (app.globalData.infoCardNumber == 1) {
      this.setData({
        cardNumber: 1
      });
    }
    if (app.globalData.infoCardNumber == 2) {
      this.setData({
        cardNumber: 2
      });
    }
    if (app.globalData.infoCardNumber == 3 ) {
      this.setData({
        cardNumber: 3
      });
    }

    // 生命周期函数--监听页面加载
  },
})