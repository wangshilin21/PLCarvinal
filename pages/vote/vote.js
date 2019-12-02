// pages/init/init.js
const Xman = require('../../service/xman.js')
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
    wordShown: "", //在投票页显示所选词汇
    wordShown_en: "", //显示所选词汇的英文
    buttonColorFlag1: 0, //投票按钮颜色标志：0代表白色，1代表点击后变灰
    buttonColorFlag2: 0,
    buttonColorFlag3: 0,
    buttonColorFlag4: 0,
    buttonColorFlag5: 0,
    player1Alive: "true", //各个玩家生命状态。只有生命状态为TRUE的时候，才会在投票按钮显示该玩家。
    player2Alive: "true",
    player3Alive: "true",
    player4Alive: "true",
    player5Alive: "true",
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
  confirmWord: function(e) {
    let curr = this.data.currentPlayer
    let id = this.data.xman.confirmWord(curr)
    console.log(id.desc)
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
    console.log(res)
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
    console.log(idArray)
    this.setData({
      gameStatus: this.data.xman.getStatus(),
      result: "游戏未开始",
      currentPlayer: 0,
      cards: idArray
    })
  },
  backToMenu: function() {
    console.log("exit");
    wx.switchTab({
      url: "../main/main"
    })
    console.log("exit over");
  },
  votePlay1: function() {
    var that = this;
    if (app.globalData.roundResult.finished == false) {
      that.setData({
        gameStatus: 0
      });
      if(that.data.roundNumber==1){
      if (app.globalData.gameState == 3) {
        if (this.data.voteButtonLock == 0) {
          wx.showModal({
            title: '确定投票给' + this.data.player1 + '吗？',
            content: 'Confim to vote  ' + this.data.player1_en + '  ?',
            showCancel: true, //是否显示取消按钮
            cancelText: "No", //默认是“取消”
            cancelColor: 'skyblue', //取消文字的颜色
            confirmText: "Yes", //默认是“确定”
            confirmColor: 'skyblue', //确定文字的颜色
            success: function(res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                //点击确定
                console.log("确认");
                that.setData({
                  playerInfo: that.data.player1_en,
                  roundFlag: 1,
                  voteButtonLock: 1,
                  nextRoundLock: 0,
                  buttonColorFlag1: 1
                })
                console.log(that.data.playerNumber);
                that.onLoad();
              }
            },
            fail: function(res) {}, //接口调用失败的回调函数
            complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
          if (this.data.roundNumber == 1 && app.globalData.gameState != 0) {
            wx.request({
              url: 'https://pleeprogram.com/GameSys/molegamewechat',
              //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
              data: {
                command: 8,
                userID: app.globalData.playerMe,
                IDSelected: this.data.player1.userID,
                state: 3
              },

              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },

              success: function(res) {
                console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                console.log("result: " + res.data.result);
                console.log("state: " + res.data.state);
                console.log("name: " + res.data.name);
              },

            })

          }
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
            cancelText: "No", //默认是“取消”
            cancelColor: 'skyblue', //取消文字的颜色
            confirmText: "Yes", //默认是“确定”
            confirmColor: 'skyblue', //确定文字的颜色
            success: function(res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                //点击确定
                console.log("确认");
                that.setData({
                  playerInfo: that.data.player1_en,
                  roundFlag: 1,
                  voteButtonLock: 1,
                  nextRoundLock: 0,
                  buttonColorFlag1: 1
                })
                console.log(that.data.playerNumber);
                that.onLoad();
              }
            },
            fail: function(res) {}, //接口调用失败的回调函数
            complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
          if (this.data.roundNumber == 2 && app.globalData.gameState != 0) {
            wx.request({
              url: 'https://pleeprogram.com/GameSys/molegamewechat',
              //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
              data: {
                command: 8,
                userID: app.globalData.playerMe,
                IDSelected: this.data.player1.userID,
                state: 4
              },

              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },

              success: function(res) {
                console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                console.log("result: " + res.data.result);
                console.log("state: " + res.data.state);
                console.log("name: " + res.data.name);
              },

            })


          }

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
            cancelText: "No", //默认是“取消”
            cancelColor: 'skyblue', //取消文字的颜色
            confirmText: "Yes", //默认是“确定”
            confirmColor: 'skyblue', //确定文字的颜色
            success: function(res) {
              if (res.cancel) {
                //点击取消,默认隐藏弹框
              } else {
                //点击确定
                console.log("确认");
                that.setData({
                  playerInfo: that.data.player1_en,
                  roundFlag: 1,
                  voteButtonLock: 1,
                  nextRoundLock: 0,
                  buttonColorFlag1: 1
                })
                console.log(that.data.playerNumber);
                that.onLoad();
              }
            },
            fail: function(res) {}, //接口调用失败的回调函数
            complete: function(res) {}, //接口调用结束的回调函数（调用成功、失败都会执行）
          })
          if (this.data.roundNumber == 3 && app.globalData.gameState != 0) {
            wx.request({
              url: 'https://pleeprogram.com/GameSys/molegamewechat',
              //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
              data: {
                command: 8,
                userID: app.globalData.playerMe,
                IDSelected: this.data.player1.userID,
                state: 5
              },

              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              },

              success: function(res) {
                console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                console.log("result: " + res.data.result);
                console.log("state: " + res.data.state);
                console.log("name: " + res.data.name);
              },

            })


          }

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
    if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
    }
  },
  ///Vote2按钮
  votePlay2: function () {
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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player2_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag2: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 1 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player2.userID,
                  state: 3
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })

            }
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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player2_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag2: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 2 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player2.userID,
                  state: 4
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })


            }

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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player2_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag2: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 3 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player2.userID,
                  state: 5
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })


            }

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
    if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
    }
  },
  ///vote3 按钮
  votePlay3: function () {
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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player3_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag3: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 1 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player3.userID,
                  state: 3
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })

            }
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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player3_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag3: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 2 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player3.userID,
                  state: 4
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })


            }

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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player3_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag3: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 3 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player3.userID,
                  state: 5
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })


            }

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
    if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
    }
  },
  //vote4按钮
  votePlay4: function () {
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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player4_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag4: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 1 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player4.userID,
                  state: 3
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-FIRST ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })

            }
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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player4_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag4: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 2 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player4.userID,
                  state: 4
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-SECOND ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })


            }

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
              cancelText: "No", //默认是“取消”
              cancelColor: 'skyblue', //取消文字的颜色
              confirmText: "Yes", //默认是“确定”
              confirmColor: 'skyblue', //确定文字的颜色
              success: function (res) {
                if (res.cancel) {
                  //点击取消,默认隐藏弹框
                } else {
                  //点击确定
                  console.log("确认");
                  that.setData({
                    playerInfo: that.data.player4_en,
                    roundFlag: 1,
                    voteButtonLock: 1,
                    nextRoundLock: 0,
                    buttonColorFlag4: 1
                  })
                  console.log(that.data.playerNumber);
                  that.onLoad();
                }
              },
              fail: function (res) { }, //接口调用失败的回调函数
              complete: function (res) { }, //接口调用结束的回调函数（调用成功、失败都会执行）
            })
            if (this.data.roundNumber == 3 && app.globalData.gameState != 0) {
              wx.request({
                url: 'https://pleeprogram.com/GameSys/molegamewechat',
                //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
                data: {
                  command: 8,
                  userID: app.globalData.playerMe,
                  IDSelected: this.data.player4.userID,
                  state: 5
                },

                method: 'GET',
                header: {
                  'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                },

                success: function (res) {
                  console.log("+-+-+-+-+-THIRD ROUND-+-+-+-+-+-+-+");
                  console.log("result: " + res.data.result);
                  console.log("state: " + res.data.state);
                  console.log("name: " + res.data.name);
                },

              })


            }

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
    if (app.globalData.roundResult.finished == true) { ///轮询到游戏已结束，清空所有数据，关闭计时器，锁定投票界面
      that.setData({
        gameStatus: 1
      });
      app.globalData.isIntervalStopped = true;
    }
  },
  nextRound: function() {
    if (this.data.nextRoundLock == 0) {
      this.setData({
        roundNumber: this.data.roundNumber + 1,
        roundFlag: 0,
        buttonColorFlag1: 0, //投票按钮颜色标志：0代表白色，1代表点击后变灰
        buttonColorFlag2: 0,
        buttonColorFlag3: 0,
        buttonColorFlag4: 0,
        buttonColorFlag5: 0,
        voteButtonLock: 0
      })
      if (this.data.roundNumber > 3 || app.globalData.roundResult.finished == true) {
        app.globalData.isIntervalStopped = true;
        clearInterval(app.globalData.interval);
        this.setData({
          gameStatus: 1,
          voteButtonLock: 1,
          buttonColorFlag1: 0, //投票按钮颜色标志：0代表白色，1代表点击后变灰
          buttonColorFlag2: 0,
          buttonColorFlag3: 0,
          buttonColorFlag4: 0,
          buttonColorFlag5: 0,

        })
        console.log("clear Interval");
        app.globalData.playerOther1.name = "no name";
        app.globalData.playerOther1.role = "";
        app.globalData.playerOther1.card = "";
        app.globalData.playerOther1.objSelected = "";
        app.globalData.playerOther1.killed = "";
        ////////////
        app.globalData.playerOther2.name = "no name";
        app.globalData.playerOther2.role = "";
        app.globalData.playerOther2.card = "";
        app.globalData.playerOther2.objSelected = "";
        app.globalData.playerOther2.killed = "";
        ///////////////
        app.globalData.playerOther3.name = "no name";
        app.globalData.playerOther3.role = "";
        app.globalData.playerOther3.card = "";
        app.globalData.playerOther3.objSelected = "";
        app.globalData.playerOther3.killed = "";
        ///////////////
        app.globalData.playerOther4.name = "no name";
        app.globalData.playerOther4.role = "";
        app.globalData.playerOther4.card = "";
        app.globalData.playerOther4.objSelected = "";
        app.globalData.playerOther4.killed = "";
        ///////////////
        app.globalData.player1.name = "";
        app.globalData.player1.role = "";
        app.globalData.player1.card = "";
        app.globalData.player1.objSelected = "";
        app.globalData.player1.killed = "";
        ////////////////
        app.globalData.player2.name = "";
        app.globalData.player2.role = "";
        app.globalData.player2.card = "";
        app.globalData.player2.objSelected = "";
        app.globalData.player2.killed = "";
        ///////////////
        app.globalData.player3.name = "";
        app.globalData.player3.role = "";
        app.globalData.player3.card = "";
        app.globalData.player3.objSelected = "";
        app.globalData.player3.killed = "";
        ////////////////
        app.globalData.player4.name = "";
        app.globalData.player4.role = "";
        app.globalData.player4.card = "";
        app.globalData.player4.objSelected = "";
        app.globalData.player4.killed = "";
        //////////////
        app.globalData.player5.name = "";
        app.globalData.player5.role = "";
        app.globalData.player5.card = "";
        app.globalData.player5.objSelected = "";
        app.globalData.player5.killed = "";
        //////////////
        app.globalData.playerMe = "";
        app.globalData.cardMe = "";
      }
      this.onLoad();
      console.log(this.data.roundNumber);
    }
    this.setData({
      nextRoundLock: 1
    })
    /* wx.navigateTo({
       url: "../vote/vote"
     })*/
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      player1: app.globalData.playerOther1.name,
      player2: app.globalData.playerOther2.name,
      player3: app.globalData.playerOther3.name,
      player4: app.globalData.playerOther4.name,
      player1_en: app.globalData.playerOther1.englishName,
      player2_en: app.globalData.playerOther2.englishName,
      player3_en: app.globalData.playerOther3.englishName,
      player4_en: app.globalData.playerOther4.englishName,
      wordShown: app.globalData.cardMe,
      wordShown_en: app.globalData.cardMe_en
    });
    if (app.globalData.playerOther1.killed == "true") {
      that.setData({
        player1Alive: "false"
      });
    }
    if (app.globalData.playerOther2.killed == "true") {
      that.setData({
        player2Alive: "false"
      });
    }
    if (app.globalData.playerOther3.killed == "true") {
      that.setData({
        player3Alive: "false"
      });
    }
    if (app.globalData.playerOther4.killed == "true") {
      that.setData({
        player4Alive: "false"
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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