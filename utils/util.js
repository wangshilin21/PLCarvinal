//获取当前日期，返回格式yyyy-mm-dd
function getDate() {
  var date = new Date();
  var mon = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
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
}