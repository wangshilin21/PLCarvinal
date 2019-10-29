var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    date: "",//日期
    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    roomNameList: ['会议室 RoomNumber'],
    index: 0,//选择的下拉列表下标
    roomName: "",
    resultList: null,
    cancelList: "",
    loading: false,
    hiddenmodalput: true,
    stime: "",//开始时间
    etime: "",//结束时间
    test:"",//only for test git
    secret: "",
    startTime: [['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], ['00', '15', '30', '45']],
    endTime: [['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], ['00', '15', '30', '45']],
    startindex: [0, 0],
    endindex: [0, 0],
    isShow_03: false,
    listData_03: [['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], ['00', '15', '30', '45']],
    picker_03_data: [],
  },
  onLoad: function (options) {
    for (var i = 0; i < app.globalData.roomInfo.length; i++) {
      var index = i + 1;
      var temp_string = 'roomNameList[' + index + ']';
      this.setData({
        [temp_string]: app.globalData.roomInfo[i].roomName
      })
    }
    if (options.id !== undefined) {
      console.log(options);
      this.setData({
        date: options.stime.split(' ')[0],
      });
    } else {
      this.setData({
        date: util.getDate(),
        week: util.getWeeks((util.getDate())),
        stime: "08:00",
        etime: "19:00",
        startindex: [8, 0],
        endindex: [19, 0]
      });
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 点击下拉显示框
  selectTap() {
    this.setData({
      selectShow: !this.data.selectShow
    });
  },
  // 点击下拉列表
  optionTap(e) {
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      selectShow: !this.data.selectShow,
    });
    this.data.roomName = this.data.roomNameList[Index];
    console.log(this.data.roomName);
  },
  //预定按钮事件

  onCheck1() {
    console.log("startTime is --> " + this.data.stime);
    console.log("endTime is --> " + this.data.etime);
  },

  showPicker_03: function () {
    this.setData({
      isShow_03: true
    })
  },
  sureCallBack_03(e) {
    let data = e.detail
    this.setData({
      isShow_03: false,
      picker_03_data: e.detail.choosedData,
      picker_03_index: JSON.stringify(e.detail.choosedIndexArr)
    })
  },
  cancleCallBack_03() {
    this.setData({
      isShow_03: false,
    })
  },
  bindStartTimeChange: function (e) {
    console.log(e.detail)
    this.setData({
      startindex: e.detail.value
    })
    this.data.stime = this.data.startTime[0][this.data.startindex[0]] + ':' + this.data.startTime[1][this.data.startindex[1]];
    console.log(e.detail)

  },
  bindEndTimeChange: function (e) {
    console.log(e.detail)
    this.setData({
      endindex: e.detail.value,
    })
    this.data.etime = this.data.endTime[0][this.data.endindex[0]] + ':' + this.data.endTime[1][this.data.endindex[1]];
  },
  bindColumnChange: function (e) {
    console.log(e.detail)
  },
  onCheck() {

    console.log(this.data.roomName);
    console.log(this.data.date);
    var that = this;
    if (that.data.roomName !== "会议室 RoomNumber") {
      wx.request({
        url: 'https://pleeprogram.com/MeetingRoomSys/meetingroom',
       // url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
        //url: 'http://localhost:8080/MeetingRoomSys/meetingroom',
        data: {
          roomName: that.data.roomName,
          date: that.data.date,
          week: that.data.week,
          stime: that.data.stime,
          etime: that.data.etime,
          requestType: 3
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          //请求成功后的回调
          /*if (that.data.roomName ==="请选择会议室") {
            wx.showToast({
              title: '请选择会议室',
              image: '../../images/failmsg.png',
              duration: 2000,
            })
          }else */
          if (res.data.length == 0) {
            wx.showToast({
              title: 'No Reservation',
              image: '../../images/failmsg.png',
              duration: 2000,
            })
          }
          if (res.data.length != 0) {
            console.log("请求成功");
            that.setData({
              loading: true,
            })
          };
          console.log(res.data.length);
          console.log(res.data);// 服务器回包信息
          that.setData({ resultList: res.data });

        },
        fail: function (err) {
          console.log("请求失败", err);

          wx.showToast({
            title: 'Request Failed',
            image: '../../images/failmsg.png',
            duration: 2000,
          })
        }
      })
    } else {
      wx.request({
        url: 'https://pleeprogram.com/MeetingRoomSys/meetingroom',
        //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
        //url: 'http://localhost:8080/MeetingRoomSys/meetingroom',
        data: {
          roomName: '',
          date: that.data.date,
          week: that.data.week,
          stime: that.data.stime,
          etime: that.data.etime,
          requestType: 3
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        success: function (res) {
          if (res.data.length == 0) {
            wx.showToast({
              title: 'No Reservation',
              image: '../../images/failmsg.png',
              duration: 2000,
            })
          };
          if (res.data.length != 0) {
            console.log("请求成功");
            that.setData({
              loading: true,
            })
          };
          console.log(res.data.length);
          console.log(res.data);// 服务器回包信息
          that.setData({ resultList: res.data });

        },
        fail: function (err) {
          console.log("请求失败", err);

          wx.showToast({
            title: 'Request Failed',
            image: '../../images/failmsg.png',
            duration: 2000,
          })
        }
      })
    }
  },
  confirm(e) {
    /*if(res.confirmSecret){
      console.log('点击确认');
    }else if(res.cancelSecret){
      console.log('点击取消');
    }
    
    var Id = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    that.setData({
      index: Id,

    });*/
    var that = this;
    that.data.cancelList = that.data.resultList[that.data.index];
    console.log(that.data.cancelList);
    var cancelData = that.data.cancelList;
    var cancelName = that.data.roomName;
    var cancelDate = that.data.date;
    var cancelSecret = that.data.secret;
    console.log(that.data.secret);
    wx.showModal({
      title: '确认删除此会议室预定？',
      content: 'Confirm to Delete the Reservation?',
      success: function (res) {
        if (res.confirm) {
          console.log('删除');
          console.log(cancelData.roomName);
          console.log(cancelData.stime);

          wx.request({
            url: 'https://pleeprogram.com/MeetingRoomSys/meetingroom',
            //url: 'http://localhost:8080/MeetingRoomSys/meetingroom',
            //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
            data: {
              roomName: cancelData.roomName,
              date: cancelDate,
              stime: cancelData.stime,
              etime: cancelData.etime,
              secret: cancelSecret,
              requestType: 5
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success: function (res) {
              console.log(res.data.length);
              console.log("返回成功的数据：" + JSON.stringify(res.data));
              if (res.data[0].requestResult) {
                console.log('用户删除成功');
                wx.showToast({
                  title: 'Delete Success',
                  icon: 'success',
                  duration: 2000,
                  mask: true
                })
                setTimeout(function () {
                  wx.reLaunch({
                    url: '../main/main',
                  })
                }, 2000)
              } else {
                console.log('失败原因')
                if (res.data[0].failCause === 3) {
                  wx.showToast({
                    title: 'RoomKey Wrong',
                    image: '../../images/failmsg.png',
                    duration: 2000,
                  })
                }
              }
              //请求成功后的回调
              console.log('删除成功')// 服务器回包信息
            },
            fail: function (err) {
              console.log("请求失败", err);
              wx.showToast({
                title: 'Delete Failed',
                image: '../../images/failmsg.png',
                duration: 2000,
              })
            }

          })
        } else {
          console.log('取消删除')
        }
      }
    })

  },

  /*showtip(e){
    var Id = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Id,

    });
    this.data.cancelList = this.data.resultList[Id];
    wx.showModal({
      title: '取消提示',
      content: '是否取消此会议室预约？',
      success:function(res){
        if(res.confirm){
          console.log('删除');
          console.log(this.data.cancelList.roomName);
          console.log(this.data.cancelList.date);
          var that = this;
          wx.request({
            url: 'https://pleeprogram.com/MeetingRoomSys/meetingroom',
            url: 'http://localhost:8080/MeetingRoomSys/meetingroom',
            data: {
              roomName: this.data.cancelList.roomName,
              date: this.data.cancelList.date,
              stime: this.data.cancelList.stime,
              etime: this.data.cancelList.etime,
              requestType: 5
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              //请求成功后的回调
              console.log('删除成功')// 服务器回包信息
            }
          })
        }else{
          console.log('取消删除')
        }
      }
    })


  },*/

  modalinput(e) {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
    var Id = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.data.index = Id;
    this.data.cancelList = this.data.resultList[Id];
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  /*confirm: function () {
     this.setData({
        hiddenmodalput: true  
     })
   }  ,  */

  cancelSecret: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  confirmSecret: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  onChangeStime(e) {
    this.setData({
      stime: e.detail.value
    });
    //if(this.data.stime == "12:00"){
    //this.data.stime = "1";
    console.log("startTime is --> " + this.data.stime);
    //console.log("roomName is --> " + this.data.rboardroom[0].name);
    //}

  },
  onChangeEtime(e) {
    this.setData({
      etime: e.detail.value
    });
    console.log("endTime is --> " + this.data.etime);
  },
  onChangeDate(e) {
    this.setData({
      date: e.detail.value,
      week: util.getWeeks(e.detail.value),
    });
  },
  onMinus(e) {
    this.setData({
      date: util.getYestoday(this.data.date),
      week: util.getWeeks(util.getYestoday(this.data.date)),
    })

  },
  onAdd(e) {
    this.setData({
      date: util.getTomorrow(this.data.date),
      week: util.getWeeks(util.getTomorrow(this.data.date)),
    })

  },
  getSecret(e) {
    this.setData({
      secret: e.detail.value
    })
  }
})
