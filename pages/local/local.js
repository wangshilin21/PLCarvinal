var app = getApp();
Page({
  data: {
    hidden: true,
    index: 0,
    condition: true,
    conditionVal: '',
    Loc_index: 0,
    Peo_index: 0,
    Dev_index: 0,
    Time_index: 0,
    boardroomList: []
  },
  onLoad () {
    this.setData({
      boardroomList: app.globalData.roomInfo
    })
    // 生命周期函数--监听页面加载
  },
  onReady () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow () {
    // 生命周期函数--监听页面显示
  },
  onHide () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom () {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage () {
    // 用户点击右上角转发
  },
  onPageScroll () {
    // 页面滚动触发事件的处理函数
  },
  onFilter () {
    //下拉弹出筛选界面方法
    this.setData({
      hidden: false
    });
  },
  onConfirm () {
    //筛选界面确认方法
    this.setData({
      hidden: true
    });
  },
  //预约按钮方法
  goReserve (e) {
    
    var checkRoom = {},
        arr = [];
    checkRoom.name = e.currentTarget.dataset.name;
    checkRoom.id = e.currentTarget.dataset.id;
  
    arr.push(checkRoom);

    app.updateCheckList([]);
    app.updateCheckBrList(arr);
    app.updateContactsList([]);
    app.updateBoardroomList([]);

    // 跳转传参,这里id=1是为了表示从同城预约界面过来,从另一个页面onload里接收数
    var params = //"stime="+e.currentTarget.dataset.stime+"&"+
                  //"etime="+e.currentTarget.dataset.etime+"&"+
                  //"name="+e.currentTarget.dataset.name+"&"
                  //"no="+e.currentTarget.dataset.no+"&id=1";
      "name=" + e.currentTarget.dataset.name;
    //var roomName = e.currentTarget.dataset.name;
    var url = "../reserve/reserve?"+params;
    wx.reLaunch({
      url: url
    })
  }
}) 
