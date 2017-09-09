'use strict';
app.controller('registerCtrl', ['$http', '$scope','$interval','$state', function($http, $scope,$interval,$state){
	//初始化发送信息哦按钮的文字
	$scope.timeMsg="发送短信";
	//点击发送时执行，60秒后课重新发送
	$scope.send=function(){
		$http.get("/data/handle.json").success(function(res){
			if(res.state==1){
				$scope.time=60;
				let count=60;
				$scope.timeMsg=count+"s";
				let interval=$interval(function(){
					if(count>0){
						count--;
						$scope.timeMsg=count+"s";
					}else{
						$interval.cancel(interval);
						$scope.timeMsg="重新发送";
						$scope.time="";

					}
				},1000)
			}
		})
	};
	$scope.submit=function(){
		//把客户注册的数据用post方法传给后台,这里模拟简单用了get
		$http.get("/data/myPost.json").success(function(res){
			//注册成功后跳到登录页面
			$state.go("login");

		})

	}
 
}]);