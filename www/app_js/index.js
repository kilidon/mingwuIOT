/**
 * Created by zhangzidong on 2017/5/25.
 */
angular.module('myApp',['ionic'])
/*自定义*/
  //服务
    .service('$acjHttp',['$http','$ionicLoading',function ($http,$ionicLoading) {
      this.sendRequest=function (url,successCallback) {
        $ionicLoading.show({
          template:'loading...'
        });
        $http.get(url).success(function (data) {
          $ionicLoading.hide();
          successCallback(data);
        })
      }
    }])


/*路由设置*/
  .config(function ($stateProvider,$ionicConfigProvider,$urlRouterProvider) {
    //android导航位置
    $ionicConfigProvider.tabs.position('bottom');
    $stateProvider
      //登录注册
      .state('login',{
        url:'/Login',
        templateUrl:'pages/login/login.html'
      })
      .state('register',{
        url:'/Register',
        templateUrl:'pages/login/register.html',
        controller:'registerCtrl'
      })
      //首页
      .state('home',{
        url:'/Home',
        templateUrl:'pages/home/home.html'
      })
      //test
      .state('test',{
        url:'/Test',
        templateUrl:'pages/test.html'
      })
    $urlRouterProvider.otherwise('/Login')
  })


/*控制器*/
  //全局控制器
  .controller('parentCtrl',['$scope','$state','$timeout','$ionicHistory',function ($scope,$state,$timeout,$ionicHistory) {
    //跳转方法
    $scope.jump=function (desState,args) {
      $state.go(desState,args)
    };
    //浏览记录方法
    $scope.getPreviousTitle = function() {
      return $ionicHistory.backTitle();
    };
  }])
  .controller('registerCtrl',['$scope',function ($scope) {

  }])

  // app.initialize();
//完成读操作
function readSth(){
  window.requestFileSystem(
    LocalFileSystem.PERSISTENT,
    0,
    getReadFS,
    function() {
      alert("获取文件系统失败");
    }
  );
}

//拿到文件系统对象
function getReadFS(fileSystem){
  fileSystem.root.getFile(
    "test.txt",
    null,
    getReadFileEntry,
    function(){
      alert("得到fileEntry失败");
    }
  )
}
//拿到fileEntry
function getReadFileEntry(fileEntry){
  //获取file对象
  fileEntry.file(
    function (file) {
      var reader = new FileReader();
      reader.onloadend = function (event) {
        alert(event.target.result);
      }
      reader.readAsText(file);
    },
    function () {
      alert('获取file失败');
    }
  )

}


//完成写操作
function writeSth(){
  console.log(' in write ');
  window.requestFileSystem(
    LocalFileSystem.PERSISTENT,
    0,
    getFS,
    function() {
      alert("获取文件系统失败");
    }
  );
}
//得到文件系统 fileSystem
function getFS(fileSystem){
  console.log(' in getFS ');
  fileSystem.root.getFile(
    "test.txt",
    {create:true},
    getFileEntry,
    function(){
      alert("得到fileEntry失败");
    }
  )
}
//得到文件入口 fileEntry
function getFileEntry(fileEntry){
  console.log(' in getFileEntry ');
  //得到写对象 fileWriter
  fileEntry.createWriter(
    function (fileWriter) {
      console.log(' in creatWriter ');
      //完成写操作
      fileWriter.onwrite = function () {
        alert('write success!');
      }
      fileWriter.write(" Hello PhoneGap ");
    },
    function () {
      alert("创建写对象失败");
    }
  )

}




//显示确认窗口
function showConfirm(){
  navigator.notification.confirm(
    "你确定这样操作吗？",
    function () {
      navigator.notification.alert('将确认操作');
    },
    "请谨慎操作",
    "确认,取消"
  );
}

//通过通知去显示一个弹窗
function showAlert(){
  navigator.notification
    .alert("this is a window");
}
//发出蜂鸣声
function playBeep(){
  navigator.notification.beep(3);
}

//发出震动
function playVibrate(){
  navigator.notification.vibrate(1000);
}

//得到当前的加速度信息
function getDeviceAcceleration(){
  navigator.accelerometer
    .getCurrentAcceleration(
      function (acceleration) {
        alert("x is "+acceleration.x+
          " y is "+acceleration.y+
          " z is "+acceleration.z);
      },
      function () {
        alert('获取加速度信息失败');
      }
    )
}

//每隔500ms监听加速度数据的变化
function watch(){
  watchId = navigator
    .accelerometer.
    watchAcceleration(
      function (acceleration) {
        console.log(
          acceleration.x+
          " y is "+acceleration.y +
          " z is "+acceleration.z);
      },
      function () {
        console.log('watch failed');
      },
      {frequency:500}
    )
}
//结束监听
function stopWatch(){
  navigator.accelerometer.clearWatch(watchId);
}

//录制音频
function record(){
  navigator.device.capture.captureAudio(
    function (mediaFiles) {
      for(var i=0;i<mediaFiles.length;i++)
      {
        console.log(mediaFiles[i].fullPath);
      }
    },
    function () {
      alert('录制失败');
    },
    {limit:2}
  )
}

//蓝牙连接
function bluetooth(){
  ble.scan([], 5, function(device) {
    alert(JSON.stringify(device));
  },function(device) {
    alert(JSON.stringify(device));
  });
}