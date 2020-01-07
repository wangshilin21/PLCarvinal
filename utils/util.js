//获取当前日期，返回格式yyyy-mm-dd
var app = getApp();
function getDate() {
  var date = new Date();
  var mon = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
}

var resetGlobalData=function() {
  app.globalData.infoCardNumber=1111;
  app.globalData.isIntervalStopped=false;
  app.globalData.interval='';//轮询服务器状态定时器
  app.globalData.voteInterval='';//投票界面轮询状态
  app.globalData.gameState=0;//游戏当前状态
  app.globalData.playerMe="";//当前用户的ID
  app.globalData.playerMe_team=404;//初始值为无意义的值
  app.globalData.cardMe="";//当前用户抽到的词条
  app.globalData.cardMe_en="";
  app.globalData.playerOther1.userID = "XXX";
  app.globalData.playerOther1.name="no name";
  app.globalData.playerOther1.englishName="no English name";
  app.globalData.playerOther1.role="";
  app.globalData.playerOther1.card="";
  app.globalData.playerOther1.idSelected="";
  app.globalData.playerOther1.objSelected="";
  app.globalData.playerOther1.englishObjSelected="";
  app.globalData.playerOther1.killed="";
  app.globalData.playerOther2.userID = "XXX";
  app.globalData.playerOther2.name = "no name";
  app.globalData.playerOther2.englishName = "no English name";
  app.globalData.playerOther2.role = "";
  app.globalData.playerOther2.card = "";
  app.globalData.playerOther2.idSelected = "";
  app.globalData.playerOther2.objSelected = "";
  app.globalData.playerOther2.englishObjSelected = "";
  app.globalData.playerOther2.killed = "";
  app.globalData.playerOther3.userID = "XXX";
  app.globalData.playerOther3.name = "no name";
  app.globalData.playerOther3.englishName = "no English name";
  app.globalData.playerOther3.role = "";
  app.globalData.playerOther3.card = "";
  app.globalData.playerOther3.idSelected = "";
  app.globalData.playerOther3.objSelected = "";
  app.globalData.playerOther3.englishObjSelected = "";
  app.globalData.playerOther3.killed = "";
  app.globalData.playerOther4.userID = "XXX";
  app.globalData.playerOther4.name = "no name";
  app.globalData.playerOther4.englishName = "no English name";
  app.globalData.playerOther4.role = "";
  app.globalData.playerOther4.card = "";
  app.globalData.playerOther4.idSelected = "";
  app.globalData.playerOther4.objSelected = "";
  app.globalData.playerOther4.englishObjSelected = "";
  app.globalData.playerOther4.killed = "";
  app.globalData.playerMyself.userID = "XXX";
  app.globalData.playerMyself.name = "no name";
  app.globalData.playerMyself.englishName = "no English name";
  app.globalData.playerMyself.role = "";
  app.globalData.playerMyself.card = "";
  app.globalData.playerMyself.idSelected = "";
  app.globalData.playerMyself.objSelected = "";
  app.globalData.playerMyself.englishObjSelected = "";
  app.globalData.playerMyself.killed = "";
  app.globalData.userPage="none";
  app.globalData.player1.userID = "XXX";
  app.globalData.player1.name = "no name";
  app.globalData.player1.englishName = "no English name";
  app.globalData.player1.role = "";
  app.globalData.player1.card = "";
  app.globalData.player1.idSelected = "";
  app.globalData.player1.objSelected = "";
  app.globalData.player1.englishObjSelected = "";
  app.globalData.player1.killed = "";
  app.globalData.player2.userID = "XXX";
  app.globalData.player2.name = "no name";
  app.globalData.player2.englishName = "no English name";
  app.globalData.player2.role = "";
  app.globalData.player2.card = "";
  app.globalData.player2.idSelected = "";
  app.globalData.player2.objSelected = "";
  app.globalData.player2.englishObjSelected = "";
  app.globalData.player2.killed = "";
  app.globalData.player3.userID = "XXX";
  app.globalData.player3.name = "no name";
  app.globalData.player3.englishName = "no English name";
  app.globalData.player3.role = "";
  app.globalData.player3.card = "";
  app.globalData.player3.idSelected = "";
  app.globalData.player3.objSelected = "";
  app.globalData.player3.englishObjSelected = "";
  app.globalData.player3.killed = "";
  app.globalData.player4.userID = "XXX";
  app.globalData.player4.name = "no name";
  app.globalData.player4.englishName = "no English name";
  app.globalData.player4.role = "";
  app.globalData.player4.card = "";
  app.globalData.player4.idSelected = "";
  app.globalData.player4.objSelected = "";
  app.globalData.player4.englishObjSelected = "";
  app.globalData.player4.killed = "";
  app.globalData.player5.userID = "XXX";
  app.globalData.player5.name = "no name";
  app.globalData.player5.englishName = "no English name";
  app.globalData.player5.role = "";
  app.globalData.player5.card = "";
  app.globalData.player5.idSelected = "";
  app.globalData.player5.objSelected = "";
  app.globalData.player5.englishObjSelected = "";
  app.globalData.player5.killed = "";
  app.globalData.roundResult.userIDKilled="";
  app.globalData.roundResult.roleKilled="";
  app.globalData.roundResult.finished=false;
  wx.removeStorageSync('userPage');
  wx.removeStorageSync('gameState');
  wx.removeStorageSync('roundNumber');
  wx.removeStorageSync('gameStateTemp');
  wx.removeStorageSync('round1Flag');
  wx.removeStorageSync('round2Flag');
  wx.removeStorageSync('roundFlag');
  wx.removeStorageSync('voteButtonLock');
  wx.removeStorageSync('playerInfo');
  wx.removeStorageSync('player1_en');
  wx.removeStorageSync('player2_en');
  wx.removeStorageSync('player3_en');
  wx.removeStorageSync('player4_en');
  wx.removeStorageSync('wordShown');
  wx.removeStorageSync('wordShown_en');
  wx.removeStorageSync('playerMe');//这个需要清除缓存吗？
  wx.removeStorageSync('gameState');
  wx.removeStorageSync('joinState');
  wx.removeStorageSync('wordHasGotten');
  //wx.clearStorageSync();
  //app.globalData.roundResult.winnerRole="none";
  console.log("Reset successful");
  return ;
}

//获取后一天的日期,输入格式为YYYY-MM-DD
function getTomorrow(today) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  var addDayCount = 1;
  dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}
//获取前一天的日期,输入格式为YYYY-MM-DD
function getYestoday(today) {
  var dd;
  if (today) {
    dd = new Date(today);
  } else {
    dd = new Date();
  }
  var addDayCount = -1;
  dd.setDate(dd.getDate() + addDayCount); //获取AddDayCount天后的日期 
  var y = dd.getFullYear();
  var m = dd.getMonth() + 1; //获取当前月份的日期 
  var d = dd.getDate();
  if (m < 10) {
    m = '0' + m;
  };
  if (d < 10) {
    d = '0' + d;
  };
  return y + "-" + m + "-" + d;
}

//获取当前星期，返回格式“Monday”
function getWeeks(todate) {
  var dateArry = [];
  var dateObj = dateLater(todate);
  dateArry.push(dateObj)
  return dateArry;
}

function dateLater(dates) {
  let dateObj = {};
  let show_day = new Array('周日Sunday', '周一Monday', '周二Thuesday', '周三Wednesday', '周四Thursday', '周五Friday', '周六Saturday');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  //dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj = show_day[day];
  return dateObj;
}

//获取当前时间，返回格式hh:mm
function getTime() {
  /*if(val) {
    var date = new Date();
    var hour = date.getHours()+val;
    var min = date.getMinutes();
    return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
  } else {*/
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  return (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//删除数组中指定对象，有局限性。用于联系人
function removeByValue(arr, val1, val2) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == val1 && arr[i].email == val2) {
      arr.splice(i, 1);
      break;
    }
  }
};

//删除数组中指定对象，有局限性。用于会议室列表
function removeByValueBr(arr, val1, val2) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].name == val1 && arr[i].id == val2) {
      arr.splice(i, 1);
      break;
    }
  }
};

function getHalfHour(minuteBlank) {
  var array_t = [];
  var n = 60 / minuteBlank;
  for (var i = 0; i < 24; i++) {
    for (var j = 0; j < n; j++) {
      var _i = i < 10 ? '0' + i : i;
      var _j = (minuteBlank * j) < 10 ? '0' + (minuteBlank * j) : (minuteBlank * j);
      array_t.push(_i + ':' + _j);
    }
  }
}

module.exports = {
  removeByValue: removeByValue,
  removeByValueBr: removeByValueBr,
  getDate: getDate,
  getTime: getTime,
  getWeeks: getWeeks,
  getTomorrow: getTomorrow,
  getYestoday: getYestoday,
  resetGlobalData: resetGlobalData,
}