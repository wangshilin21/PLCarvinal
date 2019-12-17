// pages/init/init.js
var util = require('../../utils/util.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: '设置游戏',
    xman: null,
    gameStatus: 0, //判断是否显示game over的标志位；0则不显示game over
    blankNumber: 0,
    xmanNumber: 1,
    cards: [],
    currentPlayer: 0,
    result: '游戏进行中',
    roundNumber: 1, //投票轮数
    round1Flag:false,//判断第一轮是否已经投过票
    round2Flag:false,//判断第二轮是否已经投过票
    round3Flag:false,//判断第三轮是否已经投过票
    playerInfo: '',
    roundFlag: 0, //标志位，区分只显示Round1，还是显示Round1： You voted xx
    player1: '玩家姓名一', //玩家姓名来源于Server，与前端显示一致
    player2: '玩家姓名二',
    player3: '玩家姓名三',
    player4: '玩家姓名四',
    player5: '玩家姓名五',
    player1_en: 'wanjia1',
    player2_en: 'wanjia2',
    player3_en: 'wanjia3',
    player4_en: 'wanjia4',
    player5_en: 'wanjia5',
    gameStateTemp:404,//用來存儲當前狀態，狀態改變時觸發
    wordShown: "", //在投票页显示所选词汇
    wordShown_en: "", //显示所选词汇的英文
    buttonColorFlag1: 0, //投票按钮颜色标志：0代表白色，1代表点击后变灰
    buttonColorFlag2: 0,
    buttonColorFlag3: 0,
    buttonColorFlag4: 0,
    buttonColorFlag5: 0,
    player1ID: "",
    player2ID: "",
    player3ID: "",
    player4ID: "",
    player5ID: "",
    checkPlayer1Alive:false,//尚未显示玩家死亡信息
    checkPlayer2Alive: false,//尚未显示玩家死亡信息
    checkPlayer3Alive: false,//尚未显示玩家死亡信息
    checkPlayer4Alive: false,//尚未显示玩家死亡信息
    checkPlayerMeAlive:false,//显示自己的生命状态
    player1Alive: true, //各个玩家生命状态。只有生命状态为TRUE的时候，才会在投票按钮显示该玩家。
    player2Alive: true,
    player3Alive: true,
    player4Alive: true,
    player5Alive: true,
    navigateToMain: false,
    wordHasGotten: false,
    winnerRole:"",
    voteButtonLock: 0, //初始状态下，投票按钮无锁。0代表无锁，1代表上锁。作用：投票一次后，锁定投票按钮无法再投。进入下一轮后解锁。
    nextRoundLock: 1 //初始状态下，进入下一轮按钮上锁。0代表无锁，1代表上锁。作用：只有投票后才允许进入下一轮。
  },
  generatorArray: function(num) {
    let arr = []
    while (num-- > 0) {
      arr.unshift(num)
    }
    return arr
  },
  // 输入游戏参与人数
  bindPlayerInput: function(e) {
    this.setData({
      playerNumber: parseInt(e.detail.value)
    })
  },
  bindBlankInput: function(e) {
    this.setData({
      blankNumber: parseInt(e.detail.value)
    })
  },
  bindXmanInput: function(e) {
    this.setData({
      xmanNumber: parseInt(e.detail.value)
    })
  },
  initXman: function(e) {
    this.setData({
      //xman: new Xman()
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
    //////console.log(idArray)
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
  confirmWord: function(e) {
    let curr = this.data.currentPlayer
    let id = this.data.xman.confirmWord(curr)
    //console.log(id.desc)
    let that = this
    wx.showModal({
      title: '你的词语',
      content: id.desc,
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          that.setData({
            currentPlayer: curr + 1
          })
        }
      }
    })
  },
  exposePlayer: function(e) {
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
    //console.log(res)
    let idArray = this.data.xman.getIdArray()
    this.setData({
      gameStatus: this.data.xman.getStatus(),
      cards: idArray,
      result: res
    })
  },
  continueGame: function() {
    this.data.xman.start()
    let idArray = this.data.xman.getIdArray()
    //console.log(idArray)
    this.setData({
      gameStatus: this.data.xman.getStatus(),
      result: "游戏未开始",
      currentPlayer: 0,
      cards: idArray
    })
  },
  backToMenu: function() {
    //console.log("exit");
    util.resetGlobalData();//重置所有涉及的全局变量
//    app.globalData.isIntervalStopped = true;//關閉計時器的標誌
    wx.switchTab({
      url: "../main/main"
    })
    //console.log("exit over");
  },
  votePlay1: function() {
    var that = this;
    if (app.globalData.roundResult.finished == false) {
      that.setData({
        gameStatus: 0
      });
      if (that.data.roundNumber == 1) {
        if (app.globalData.gameState == 3) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player1 + '吗？',
              content: 'Confim to vote  ' + this.data.player1_en + '  ?',
              showCancel: true, //是否显示取消按钮
             // cancelText: "No", //默认是“取消”
              //cancelColor: 'skyblue', //取消文字的颜色
             // confirmText: "Yes", //默认是“确定”
              //confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  if (that.data.roundNumber == 1 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player1ID,
                        state: 3
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round1Flag = true;
                  }
                  that.setData({
                    playerInfo: that.data.player1_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag1: 1
                  })
                  console.log("2222");
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
          }
        }

        if (app.globalData.gameState != 3) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 2) {
        if (app.globalData.gameState == 4) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player1 + '吗？',
              content: 'Confim to vote  ' + this.data.player1_en + '  ?',
              showCancel: true, //是否显示取消按钮
              //cancelText: "No", //默认是“取消”
             // cancelColor: 'skyblue', //取消文字的颜色
             // confirmText: "Yes", //默认是“确定”
              //confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 2 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player1ID,
                        state: 4
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round2Flag = true;

                  }
                  that.setData({
                    playerInfo: that.data.player1_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag1: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 4) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 3) {
        if (app.globalData.gameState == 5) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player1 + '吗？',
              content: 'Confim to vote  ' + this.data.player1_en + '  ?',
              showCancel: true, //是否显示取消按钮
              //cancelText: "No", //默认是“取消”
              //cancelColor: 'skyblue', //取消文字的颜色
              //confirmText: "Yes", //默认是“确定”
              //confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 3 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player1ID,
                        state: 5
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round3Flag = true;

                  }

                  that.setData({
                    playerInfo: that.data.player1_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag1: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 5) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
    }
    /** 
    if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
  }*/
  },
  ///Vote2按钮
  votePlay2: function() {
    var that = this;
    if (app.globalData.roundResult.finished == false) {
      that.setData({
        gameStatus: 0
      });
      if (that.data.roundNumber == 1) {
        if (app.globalData.gameState == 3) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player2 + '吗？',
              content: 'Confim to vote  ' + this.data.player2_en + '  ?',
              showCancel: true, //是否显示取消按钮
             // cancelText: "No", //默认是“取消”
             // cancelColor: 'skyblue', //取消文字的颜色
             // confirmText: "Yes", //默认是“确定”
             // confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 1 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player2ID,
                        state: 3
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round1Flag = true;
                  }

                  that.setData({
                    playerInfo: that.data.player2_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag2: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })

          }
        }
        if (app.globalData.gameState != 3) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 2) {
        if (app.globalData.gameState == 4) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player2 + '吗？',
              content: 'Confim to vote  ' + this.data.player2_en + '  ?',
              showCancel: true, //是否显示取消按钮
             // cancelText: "No", //默认是“取消”
             // cancelColor: 'skyblue', //取消文字的颜色
             // confirmText: "Yes", //默认是“确定”
             // confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 2 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player2ID,
                        state: 4
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round2Flag = true;

                  }

                  that.setData({
                    playerInfo: that.data.player2_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag2: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 4) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 3) {
        if (app.globalData.gameState == 5) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player2 + '吗？',
              content: 'Confim to vote  ' + this.data.player2_en + '  ?',
              showCancel: true, //是否显示取消按钮
              //cancelText: "No", //默认是“取消”
              //cancelColor: 'skyblue', //取消文字的颜色
              //confirmText: "Yes", //默认是“确定”
             // confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 3 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player2ID,
                        state: 5
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round3Flag = true;

                  }

                  that.setData({
                    playerInfo: that.data.player2_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag2: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 5) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
    }
   /** if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
    }*/
  },
  ///vote3 按钮
  votePlay3: function() {
    var that = this;
    if (app.globalData.roundResult.finished == false) {
      that.setData({
        gameStatus: 0
      });
      if (that.data.roundNumber == 1) {
        if (app.globalData.gameState == 3) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player3 + '吗？',
              content: 'Confim to vote  ' + this.data.player3_en + '  ?',
              showCancel: true, //是否显示取消按钮
              //cancelText: "No", //默认是“取消”
              //cancelColor: 'skyblue', //取消文字的颜色
              //confirmText: "Yes", //默认是“确定”
              //confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 1 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player3ID,
                        state: 3
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round1Flag = true;
                  }

                  that.setData({
                    playerInfo: that.data.player3_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag3: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })

          }
        }
        if (app.globalData.gameState != 3) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 2) {
        if (app.globalData.gameState == 4) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player3 + '吗？',
              content: 'Confim to vote  ' + this.data.player3_en + '  ?',
              showCancel: true, //是否显示取消按钮
             // cancelText: "No", //默认是“取消”
             // cancelColor: 'skyblue', //取消文字的颜色
              //confirmText: "Yes", //默认是“确定”
             // confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 2 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player3ID,
                        state: 4
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round2Flag = true;

                  }

                  that.setData({
                    playerInfo: that.data.player3_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag3: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 4) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 3) {
        if (app.globalData.gameState == 5) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player3 + '吗？',
              content: 'Confim to vote  ' + this.data.player3_en + '  ?',
              showCancel: true, //是否显示取消按钮
             // cancelText: "No", //默认是“取消”
             // cancelColor: 'skyblue', //取消文字的颜色
             // confirmText: "Yes", //默认是“确定”
            //  confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 3 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player3ID,
                        state: 5
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round3Flag = true;

                  }

                  that.setData({
                    playerInfo: that.data.player3_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag3: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 5) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
    }
   /** if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
    }*/
  },
  //vote4按钮
  votePlay4: function() {
    var that = this;
    if (app.globalData.roundResult.finished == false) {
      that.setData({
        gameStatus: 0
      });
      if (that.data.roundNumber == 1) {
        if (app.globalData.gameState == 3) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player4 + '吗？',
              content: 'Confim to vote  ' + this.data.player4_en + '  ?',
              showCancel: true, //是否显示取消按钮
              //cancelText: "No", //默认是“取消”
           //   cancelColor: 'skyblue', //取消文字的颜色
             // confirmText: "Yes", //默认是“确定”
            //  confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 1 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player4ID,
                        state: 3
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round1Flag = true;
                  }

                  that.setData({
                    playerInfo: that.data.player4_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag4: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })

          }
        }
        if (app.globalData.gameState != 3) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 2) {
        if (app.globalData.gameState == 4) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player4 + '吗？',
              content: 'Confim to vote  ' + this.data.player4_en + '  ?',
              showCancel: true, //是否显示取消按钮
             // cancelText: "No", //默认是“取消”
             // cancelColor: 'skyblue', //取消文字的颜色
             // confirmText: "Yes", //默认是“确定”
            //  confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 2 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player4ID,
                        state: 4
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round2Flag = true;

                  }
                  that.setData({
                    playerInfo: that.data.player4_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag4: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 4) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
      if (that.data.roundNumber == 3) {
        if (app.globalData.gameState == 5) {
          if (this.data.voteButtonLock == 0) {
            wx.showModal({
              title: '确定投票给' + this.data.player4 + '吗？',
              content: 'Confim to vote  ' + this.data.player4_en + '  ?',
              showCancel: true, //是否显示取消按钮
             // cancelText: "No", //默认是“取消”
             // cancelColor: 'skyblue', //取消文字的颜色
            //  confirmText: "Yes", //默认是“确定”
             // confirmColor: 'skyblue', //确定文字的颜色
              success: function(res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  //console.log("确认");
                  if (that.data.roundNumber == 3 && app.globalData.gameState != 0) {
                    wx.request({
                      url: 'https://pleeprogram.com/GameSys/molegamewechat',
                      //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                      data: {
                        command: 8,
                        userID: app.globalData.playerMe,
                        idSelected: that.data.player4ID,
                        state: 5
                      },

                      method: 'GET',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                      },

                      success: function (res) {
                        //console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                        //console.log("result: " + res.data.result);
                        //console.log("state: " + res.data.state);
                        //console.log("name: " + res.data.name);
                      },

                    })
                    that.data.round3Flag = true;

                  }

                  that.setData({
                    playerInfo: that.data.player4_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag4: 1
                  })
                  //console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function(res) {}, //接口调用失败的回调函数
              complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
            })


          }
        }
        if (app.globalData.gameState != 5) {
          wx.showModal({
            title: '投票尚未开始，请等待',
            content: 'Voting does not start yet,please wait',
          })
          return;
        }
      }
    }
    /**if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
    }*/
  },

   
  onShow: function(options) {
    var that = this;
    var round2FlashEnd = false;
    var round3FlashEnd = false;
      console.log("-=-=-=-=-=-=-=-=已成功啟動On Show 函數-=-=-=-=-===-VOTE界面");
      var logLock1 = false; ///避免輪詢下多次打Log
      var logLock2 = false;
      var logLock3 = false;
      var logLock4 = false;
      //console.log("Cache data is "+ userText);
      app.globalData.interval2 = setInterval(function () {
        if (app.globalData.interval2 == 0){return};
        console.log("已進入計時器---VOTE");
        if (app.globalData.gameState != 0) {
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
              if (logLock2 == false) {
                // console.log("+++Game State is+++   " + app.globalData.gameState);
                logLock2 == true;
              }
            }
            if (logLock3 == false) {
              //console.log("在gameState判斷之前！！！！！！！！");
              logLock3 == true;
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

    app.globalData.voteInterval = setInterval(function() {
      that.setData({
        player1: app.globalData.playerOther1.name,
        player2: app.globalData.playerOther2.name,
        player3: app.globalData.playerOther3.name,
        player4: app.globalData.playerOther4.name,
        player1ID: app.globalData.playerOther1.userID,
        player2ID: app.globalData.playerOther2.userID,
        player3ID: app.globalData.playerOther3.userID,
        player4ID: app.globalData.playerOther4.userID,
        player1_en: app.globalData.playerOther1.englishName,
        player2_en: app.globalData.playerOther2.englishName,
        player3_en: app.globalData.playerOther3.englishName,
        player4_en: app.globalData.playerOther4.englishName,
        wordShown: app.globalData.cardMe,
        wordShown_en: app.globalData.cardMe_en
      });
      if (that.data.gameStateTemp != app.globalData.gameState) {//遊戲狀態改變時觸發條件
        if (app.globalData.gameState == 3 || app.globalData.gameState == 4 || app.globalData.gameState == 5) {
         // console.log("Game state is "+app.globalData.gameState);
          //console.log("Temp state is :"+ that.data.gameStateTemp);
          that.setData({
            voteButtonLock: 0//解锁按钮
          });
        }
        if (app.globalData.playerOther1.killed == false) {
          that.setData({
            buttonColorFlag1: 0
          });

        }
        if (app.globalData.playerOther2.killed == false) {
          that.setData({
            buttonColorFlag2: 0
          });
        }
        if (app.globalData.playerOther3.killed == false) {
          that.setData({
            buttonColorFlag3: 0
          });
        }
        if (app.globalData.playerOther4.killed == false) {
          that.setData({
            buttonColorFlag4: 0
          });
        }

        that.data.gameStateTemp = app.globalData.gameState;
      }
      if (app.globalData.playerMyself.killed == true && that.data.checkPlayerMeAlive == false) {
        wx.showModal({
          title: '本轮中您被投票出局',
          content: 'This round you are killed',
          showCancel: false,
        })
        that.data.checkPlayerMeAlive = true;
        return;
      }
      if (app.globalData.playerOther1.killed == true && that.data.checkPlayer1Alive == false) {
        that.setData({
          player1Alive: false
        });
        wx.showModal({
          title: '本轮投票中' + that.data.player1 + '被投票出局',
          content: 'This round ' + that.data.player1_en + ' is killed',
          showCancel: false,
        })
        that.data.checkPlayer1Alive = true;
        return;
      }
      if (app.globalData.playerOther2.killed == true && that.data.checkPlayer2Alive == false) {
        that.setData({
          player2Alive: false
        })
        wx.showModal({
          title: '本轮投票中' + that.data.player2 + '被投票出局',
          content: 'This round ' + that.data.player2_en + ' is killed',
          showCancel: false,
        })
        that.data.checkPlayer2Alive = true;
        return;
      }
      if (app.globalData.playerOther3.killed == true && that.data.checkPlayer3Alive == false) {
        that.setData({
          player3Alive: false
        });
        wx.showModal({
          title: '本轮投票中' + that.data.player3 + '被投票出局',
          content: 'This round ' + that.data.player3_en + ' is killed',
          showCancel: false,
        })
        that.data.checkPlayer3Alive = true;
        return;
      }
      if (app.globalData.playerOther4.killed == true&& that.data.checkPlayer4Alive == false) {
        that.setData({
          player4Alive: false
        });
        wx.showModal({
          title: '本轮投票中' + that.data.player4 + '被投票出局',
          content: 'This round ' + that.data.player4_en + ' is killed',
          showCancel: false,
        })
        that.data.checkPlayer4Alive=true;
        return;
      }
      if (that.data.round1Flag == true && round2FlashEnd != true ){
        if (app.globalData.gameState == 4) {
          that.setData({
            roundNumber: 2,
            roundFlag: 0,
          });

          if (that.data.player1Alive == false) {
            that.setData({
              buttonColorFlag1: 1
            })
          }
          if (that.data.player2Alive == false) {
            that.setData({
              buttonColorFlag2: 1
            })
          }
          if (that.data.player3Alive == false) {
            that.setData({
              buttonColorFlag3: 1
            })
          }
          if (that.data.player4Alive == false) {
            that.setData({
              buttonColorFlag4: 1
            })
          }
          round2FlashEnd=true;
        }
      }
      if (that.data.round2Flag == true && round3FlashEnd != true) {
        if (app.globalData.gameState == 5) {
          that.setData({
            roundNumber: 3,
            roundFlag: 0,
          });
          if (that.data.player1Alive == false) {
            that.setData({
              buttonColorFlag1: 1
            })
          }
          if (that.data.player2Alive == false) {
            that.setData({
              buttonColorFlag2: 1
            })
          }
          if (that.data.player3Alive == false) {
            that.setData({
              buttonColorFlag3: 1
            })
          }
          if (that.data.player4Alive == false) {
            that.setData({
              buttonColorFlag4: 1
            })
          }
          round3FlashEnd = true;
        }
      }
        //console.log("winner role before --------------" + app.globalData.roundResult.winnerRole);
        that.setData({
          winnerRole: app.globalData.roundResult.winnerRole
        });
      //console.log("winner role After ++++++++++++" + that.data.winnerRole);
      if (app.globalData.gameState == 0 || app.globalData.roundResult.finished == true) {
        that.setData({
        gameStatus:1,
        });
        if(app.globalData.resetGlobalDataFlag==false){
          //clearInterval(app.globalData.interval);
          util.resetGlobalData();//重置所有涉及的全局变量
          ///app.globalData.isIntervalStopped = true;//關閉計時器的標誌
          app.globalData.resetGlobalDataFlag=true;
          console.log("reset");
        }
      }

    }, 500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
    console.log("-=-=-=-=-=-=-=-=已成功啟動On Unload 函數-=-=-=-=-===-Vote界面");
    clearInterval(app.globalData.interval2);
    app.globalData.interval2 == 0;
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