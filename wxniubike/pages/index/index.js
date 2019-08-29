//index.js

Page({

  /**
     * 页面的初始数据
     */
  data: {
    //该页面中的两个变量
    latitude: 0,
    longitude: 0,
    //控件的变量，数组类型
    controls: [],
    //显示的单车
    markers:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //将当前对象赋给that，就是获取当前信息的拷贝
    var that = this;
    wx.getLocation({
      success: function(res) {
        var lat = res.latitude;
        var log = res.longitude;

        wx.request({
          url: "http://localhost:8888/bikes",
          method: 'GET',
          success: function (res) {
            const bikes = res.data.map((item) => {
              return {
                id: item.id,
                iconPath: "/image/bike.png",
                width: 35,
                height: 40,
                latitude: item.latitude,
                longitude: item.longitude
              };
            });
            // 修改data里面的markers
            that.setData({
              markers: bikes,
              latitude: lat,
              longitude: log
            });
          }
        })
      },
    });

    //创建一个map上下文，如果想要调用地图相关的方法
    that.mapCtx = wx.createMapContext('map');

    wx.getSystemInfo({
      success: function(res) {
        var height = res.windowHeight;
        var width = res.windowWidth;
        that.setData({
          controls:[
            {
              //中心点位置
              id: 1,
              iconPath: '/image/location.png',
              position: {
                width: 20,
                height: 35,
                left: width / 2 - 10,
                top: height / 2 - 35.
              },
              //是否可点击
              clickable: true
            }, {
              //定位按钮安置
              id: 2,
              iconPath: '/image/img1.png',
              position: {
                width: 40,
                height: 40,
                left: 20,
                top: height - 60.
              },
              //是否可点击
              clickable: true
            }, {
              //扫码按钮
              id: 3,
              iconPath: '/image/qrcode.png',
              position: {
                width: 100,
                height: 40,
                left: width / 2 - 50,
                top: height - 60.
              },
              //是否可点击
              clickable: true
            }, {
            //充值按钮
            id: 4,
            iconPath: '/image/pay.png',
            position: {
              width: 40,
              height: 40,
              left: width - 45,
              top: height - 60.
            },
            //是否可点击
            clickable: true
          },{//手动添加一辆单车的按钮
            id:5,
            iconPath:'/image/bike.png',
            position:{
              width:35,
              height:40
            },
            clickable:true
          }
          ]
        });
      },
    })  
  },
  controltap(e){
    // console.log(e)
    var that = this;
    if(e.controlId==2){
      //点击定位当前位置
      that.mapCtx.moveToLocation();
    }

    if(e.controlId==3){
      wx.scanCode({
        success: function(res){
          var code = res.result;
          wx.request({
            url: 'http://localhost:8888/bike', //仅为示例，并非真实的接口地址
            // method:'POST',
            data: {
              qrCode: code,
              status: 0,
              latitude: that.data.latitude,
              longitude: that.data.longitude
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success:function(res) {
              console.log(res.data)
            }
          })
        }
      })
    }
    if(e.controlId==5){
      //添加车辆的按钮
      //发送请求
      that.mapCtx.getCenterLocation({
        success: function (res) {
          var lat = res.latitude;
          var log = res.longitude;
          wx.request({
            url: "http://localhost:8888/bike",
            method: 'POST',
            data: {
              latitude: lat,
              longitude: log
            },
            success: function () {
              //向后台发送请求，将单车查找出来
              //向后台发送请求，将单车查找出来
              wx.request({
                url: "http://localhost:8888/bikes",
                method: 'GET',
                success: function (res) {
                  const bikes = res.data.map((item) => {
                    return {
                      id: item.id,
                      iconPath: "/image/bike.png",
                      width: 35,
                      height: 40,
                      latitude: item.latitude,
                      longitude: item.longitude
                    };
                  });
                  // 修改data里面的markers
                  that.setData({
                    markers: bikes
                  });
                }
              })
            }
          })
        }
      })

    }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //在这个事件中，记录用户的行为，然后发送到后台服务器
    //获取当前位置
    wx.getLocation({
      success: function (res) {
        //纬度
        var lat = res.latitude;
        //经度
        var log = res.longitude;
        //从本地存储中取出唯一身份标识
        var openid = wx.getStorageSync('openid')
        //发送request向mongo中添加数据（添加一条文档（json））
        wx.request({
          //用POST方式请求es可以只指定index和type，不用指定id
          url: "http://localhost:8888/log/ready",
          data: {
            time: new Date(),
            openid: openid,
            lat: lat,
            log: log
          },
          method: "POST"
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
