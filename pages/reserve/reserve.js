var app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    title: "",//会议主题
    date: "",//预约日期
    week: "",//预约星期几
    secret: "",
    sdate: "",//开始日期
    //edate: "",//结束日期
    stime: "",//开始时间
    etime: "",//结束时间
    bookName: "",//联系人
    bookPhone: "",
    roomName: "",
    startTime: [['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], ['00', '15', '30', '45']],
    endTime: [['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'], ['00', '15', '30', '45']],
    startindex: [0, 0],
    endindex: [0, 0],
    rcontacts: [],//联系人组
    rboardroom: [],//会议室组
    rcontactsId: [],
    source: '',
  },
  onLoad: function (options) {
		/*if (options.id !== undefined && options.id === '1') {
			console.log(options);
			let rboardroom = [];
			rboardroom.push({
				roomId: options.no,
				roomName: options.name
			});
			var startTimeTemp = options.stime.split(' ')[1];
			var endTimeTemp = options.etime.split(' ')[1];
			var startTime = startTimeTemp.split(':')[0] + ':' + startTimeTemp.split(':')[1];
			var endTime = endTimeTemp.split(':')[0] + ':' + endTimeTemp.split(':')[1];
			this.setData({
				date: options.stime.split(' ')[0],
				//edate: options.etime.split(' ')[0],
				stime: startTime,
				etime: endTime,
				rboardroom: rboardroom,
				source: 'local'
			});
			this.setData({
				rcontacts: app.globalData.checkList
			});
		} else if (options.id !== undefined && options.id === '2') {
			let rboardroom = [];
			var idArr = options.roomId.split(',');
			var nameArr = options.roomName.split(',');
			var start = options.stime.split(' ');
			var end = options.etime.split(' ');
			for (var i = 0; i < idArr.length; i++) {
				rboardroom.push({
					roomId: idArr[i],
					roomName: nameArr[i]
				});
			}
			console.log(options);
            var startTimeTemp = options.stime.split(' ')[1];
            var endTimeTemp = options.etime.split(' ')[1];
            var startTime = startTimeTemp.split(':')[0] + ':' + startTimeTemp.split(':')[1];
            var endTime = endTimeTemp.split(':')[0] + ':' + endTimeTemp.split(':')[1];
        	this.setData({
        		date: start[0],
        		//edate: end[0],
                stime: startTime,
                etime: endTime,
        		rboardroom: rboardroom,
        		rcontacts: options.attendeesArr.split(','),
                rcontactsId: options.attendeesId.split(','),
        		source: 'remote'
        	});
		} else {
			this.setData({
				date: util.getDate(),
				//edate: util.getDate(),
				stime: util.getTime(),
				etime: util.getTime()
			});
			this.setData({
				rcontacts: app.globalData.checkList,
				rboardroom: app.globalData.checkBrList
			});
    }*/
    this.setData({
      date: util.getDate(),
      week: util.getWeeks((util.getDate())),
      //edate: util.getDate(),
      stime: '08:00',
      etime: '19:00',
      startindex: [8, 0],
      endindex: [19, 0]
    });


    this.setData({
      rcontacts: app.globalData.checkList,
      rboardroom: app.globalData.checkBrList
    });
  },
  onShow() {
    if (this.data.source === '') {
      this.setData({
        rboardroom: app.globalData.checkBrList
      });
    }
    if (this.data.source !== 'remote') {
      this.setData({
        rcontacts: app.globalData.checkList
      });
    }
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
  onUnload() {
    app.updateCheckList(this.data.rcontacts);
    app.updateCheckBrList(this.data.rboardroom);
  },
  onHide() {
    app.updateCheckList(this.data.rcontacts);
    app.updateCheckBrList(this.data.rboardroom);
  },
  //预定按钮事件
  onReserve1() {
    console.log("start time is:" + this.data.stime);
    console.log("end time is:" + this.data.etime);

  },
  onReserve() {
		/*var attendees = [];
    if (this.data.source === 'remote') {
			attendees = this.data.rcontactsId;
		} else {
			attendees = this.data.rcontacts.map(item => item.email);
		}
		var rooms = this.data.rboardroom.map(item => item.roomId);
		var params = {
			subject: this.data.title,
			startDate: this.data.sdate,
			endDate: this.data.edate,
			startTime: this.data.stime,
			endTime: this.data.etime,
			description: this.data.describe,
			attendees: attendees,
			rooms: rooms
		};
    wx.showLoading({
      title: '正在预定中...',
    });*/
    var ptitle, pbookName, pbookPhone, pdate, pstime, petime, proomName, prboardroom, psecret;
    //ptitle = this.data.title;
    pbookName = this.data.bookName;
    pbookPhone = this.data.bookPhone;
    pdate = this.data.date;
    pstime = this.data.stime;
    petime = this.data.etime;
    proomName = this.data.rboardroom[0].name;
    prboardroom = this.data.rboardroom;
    psecret = this.data.secret;

    /*if (ptitle === '') {
      wx.showToast({
        title: '标题缺失',
        image: '../../images/failmsg.png',
        duration: 5000
      });
      return;
    };*/

    if (pbookName === '') {
      /*wx.showToast({
        title: '联系人缺失',
        image: '../../images/failmsg.png',
        duration: 5000
      });*/
      wx.showModal({
        title: '联系人缺失，请填写联系人姓名',
        content: 'Need the Name of Contact',
      })
      return;
    };
    if (pbookPhone === '') {
      wx.showModal({
        title: '手机号码缺失，请填写联系方式',
        content: 'Need the PhoneNumber of Contact',
      })
      return;
    };

    if (pstime >= petime) {
      wx.showModal({
        title: '时间有误，请检查时间段有效性',
        content: 'Need to Check the Time is Valid',
      })
      return
    };

    console.log(pstime);
    console.log(petime);
    var that = this;

    wx.showModal({
      title: '确认预约会议?',
      content: 'Confirm to Reserve the MeetingRoom?',
      success: function (res) {
        if (res.confirm) {
          //wx.clearStorageSync();
          wx.request({
            url: 'https://pleeprogram.com/MeetingRoomSys/meetingroom',
            //url: 'http://10.220.16.125:8080/MeetingRoomSys/meetingroom',
            data: {
              requestType: 4,
              //title: ptitle,
              bookName: pbookName,
              bookPhone: pbookPhone,
              date: pdate,
              stime: pstime,
              etime: petime,
              roomName: proomName,
              rboardroom: prboardroom,
              secret: psecret
            },
            method: 'GET',
            header: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            success: function (res) {
              console.log("返回成功的数据：", res.data);
              console.log("返回成功的数据：" + JSON.stringify(res.data));
              console.log(res.data[0].requestResult);
              if (res.data[0].requestResult) {
                console.log('用户点击确认');
                wx.showToast({
                  title: 'Reserve Success',
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
                if (res.data[0].failCause === 4) {
                  wx.showToast({
                    title: 'Time Conflict',
                    image: '../../images/failmsg.png',
                    duration: 2000,
                  })
                } else if (res.data[0].failCause === 1) {
                  wx.showToast({
                    title: 'Room Removed',
                    image: '../../images/failmsg.png',
                    duration: 2000,
                  })
                } else if (res.data[0].failCause === 5) {
                  wx.showToast({
                    title: 'Sever Error',
                    image: '../../images/failmsg.png',
                    duration: 2000,
                  })
                } else if (res.data[0].failCause === 7) {
                  /*wx.showToast({
                    title: 'RoomKey Error',
                    image: '../../images/failmsg.png',
                    duration: 2000,
                  })*/
                  wx.showModal({
                    title: '密码格式有误，请输入四位数字',
                    content: 'Please Check the RoomKey Format',
                  })
                  return
                } else if (res.data[0].failCause === 2 || res.data[0].failCause === 3 || res.data[0].failCause === 6) {
                  wx.showToast({
                    title: 'System Error',
                    image: '../../images/failmsg.png',
                    duration: 2000,
                  })
                } else {
                  wx.showToast({
                    title: 'Unknown Error',
                    image: '../../images/failmsg.png',
                    duration: 2000,
                  })
                }

              }//此处应判断得到的result是否为true，如果为true则显示预约成功并跳转；否则显示预约失败；括号中的true暂时设置成常为1的成功状态
            },
            complete: function (arr) { }
          })

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onChangeDate(e) {
    this.setData({
      date: e.detail.value,
      week: util.getWeeks((e.detail.value))
    });
  },
	/*onChangeSdate (e) {
		this.setData({
			sdate: e.detail.value,
			edate: e.detail.value
		});
	},
	onChangeEdate (e) {
		this.setData({
			edate: e.detail.value
		});
	},*/
  onChangeStime(e) {
    this.setData({
      stime: e.detail.value
    });
    //if(this.data.stime == "12:00"){
    //this.data.stime = "1";
    console.log("startTime is --> " + this.data.stime);
    console.log("roomName is --> " + this.data.rboardroom[0].name);
    //}

  },
  onChangeEtime(e) {
    this.setData({
      etime: e.detail.value
    });
    console.log("endTime is --> " + this.data.etime);
  },
  onSelect() {
    wx.navigateTo({
      url: "../contacts/contacts?type=reserve"
    })
  },
  onSelectBR() {
    wx.navigateTo({
      url: "../boardroom/boardroom"
    })
  },
  //删除联系人
  delContacts(e) {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '是否移除该参会者',
      success: function (res) {
        if (res.confirm) {
          var checkMan = {},//用来存储当前联系人
            arr = app.globalData.contactsList,//临时存储人员列表
            _checkList = _this.data.rcontacts;//临时存储选中的人数组

          checkMan.name = e.currentTarget.dataset.name;
          checkMan.email = e.currentTarget.dataset.email;

          for (var i = 0; i < _checkList.length; i++) {
            if (_checkList[i].name === checkMan.name && _checkList[i].email === checkMan.email) {
              //取消选中
              util.removeByValue(_checkList, _checkList[i].name, _checkList[i].email);

              //在contactsList对应项去掉选中状态
              for (var j = 0; j < arr.length; j++) {
                for (var k = 0; k < arr[k].contactsInfo.length; k++) {
                  if (typeof (arr[j].contactsInfo[k]) != "undefined") {
                    if (arr[j].contactsInfo[k].name === checkMan.name && arr[j].contactsInfo[k].email === checkMan.email) {
                      arr[j].contactsInfo[k].check = false;
                      app.updateContactsList(arr);
                      break;
                    }
                  }
                }
              }
              break;
            }
          }
          _this.setData({
            rcontacts: _checkList
          });
        } else if (res.cancel) {

        }
      }
    })
  },
  //删除会议室
  delBoardRoom(e) {
    var _this = this;

    wx.showModal({
      title: '重新选择会议室？',
      content: 'Choose Another MeetingRoom?',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../local/local',
          });
          var checkRoom = {},//用来存储当前会议室
            arr = app.globalData.boardroomList,//临时存储会议室列表
            _checkList = _this.data.rboardroom;//临时存储选中的会议室数组

          checkRoom.name = e.currentTarget.dataset.name;
          checkRoom.id = e.currentTarget.dataset.id;
          for (var i = 0; i < _checkList.length; i++) {
            if (_checkList[i].name === checkRoom.name && _checkList[i].id === checkRoom.id) {
              //取消选中

              util.removeByValueBr(_checkList, _checkList[i].name, _checkList[i].id);

              //在boardroomList对应项去掉选中状态
              for (var j = 0; j < arr.length; j++) {
                for (var k = 0; k < arr[j].boardroomInfo.length; k++) {
                  if (typeof (arr[j].boardroomInfo[k]) != "undefined") {
                    if (arr[j].boardroomInfo[k].name === checkRoom.name && arr[j].boardroomInfo[k].id == checkRoom.id) {
                      arr[j].boardroomInfo[k].check = false;
                      app.updateBoardroomList(arr);
                      break;
                    }
                  }
                }
              }
              break;
            }
          }
          _this.setData({
            rboardroom: _checkList
          });
        } else if (res.cancel) {

        }
      }, fail: function (res) {

      }
    })
  },
  getTitle(e) {
    this.setData({
      title: e.detail.value
    });
  },
  getBookName(e) {
    this.setData({
      bookName: e.detail.value
    })
  },
  getBookPhone(e) {
    this.setData({
      bookPhone: e.detail.value
    })
  },
  getRoomName(e) {
    this.setData({
      roomName: e.detail.value
    })
  },
  getSecret(e) {
    this.setData({
      secret: e.detail.value
    })
  }
})
