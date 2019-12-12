App({
  onLaunch() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  //封装请求数据的方法
  ajax: function (url, data, callback, method) {
    var method = method ? method : "GET";
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        callback(res.data);
      },
      fail(e) {
        callback(e);
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success() {
          wx.getUserInfo({
            success(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  updateContactData: function (arr) {
    this.globalData.contactData = arr;
  },
  updateMeetingrooms: function (arr) {
    this.globalData.meetingrooms = arr;
  },
  updateCheckList: function (arr) {
    this.globalData.checkList = arr;
  },
  updateCheckBrList: function (arr) {

    this.globalData.checkBrList = arr;
  },
  updateContactsList: function (arr) {

    this.globalData.contactsList = arr;
  },
  updateBoardroomList: function (arr) {

    this.globalData.boardroomList = arr;
  },
  globalData: {
    userInfo: [],
    roomInfo: [],
    contactData: [],//联系人列表
    checkList: [],//选中联系人
    meetingrooms: [],//会议室列表
    checkBrList: [],//选中会议室
    contactsList: [],
    boardroomList: [],
    infoCardNumber:1111,//用户信息界面抽到的卡牌（免喝酒之类）,初始1111，不显示任何图片
    isIntervalStopped:false,
    interval:'',//轮询服务器状态定时器
    voteInterval:'',//投票界面轮询状态
    gameState:0,//游戏当前状态
    playerMe:"",//当前用户的ID
    playerMe_team:404,//初始值为无意义的值
    resetGlobalDataFlag:false,
    cardMe:"",//当前用户抽到的词条
    cardMe_en:"",
    playerMyself: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    playerOther1: {
      userID:"XXX",
      name: "no name",
      englishName:"no English name",
      role: "",
      card: "",
      idSelected:"",
      objSelected: "",
      englishObjSelected:"",
      killed: ""
    },
    playerOther2: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    playerOther3: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    playerOther4: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    player1: {
      userID: "XXX",//默认值是XXX
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    player2: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    player3: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    player4: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    player5: {
      userID: "XXX",
      name: "no name",
      englishName: "no English name",
      role: "",
      card: "",
      idSelected: "",
      objSelected: "",
      englishObjSelected: "",
      killed: ""
    },
    roundResult:{
      userIDKilled:"",
      roleKilled:"",
      finished:false,
      winnerRole:"none"
    }
  }
})