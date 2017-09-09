'use strict';
app.controller('myCtrl', ['$http', '$scope','$cookies','$state' ,function($http, $scope,$cookies,$state){
	//获取登录用户的信息
	$scope.cookiesId=$cookies.get("id");
	$scope.cookiesName=$cookies.get("name");
	$scope.cookiesImage=$cookies.get("image");
	//退出登录时清空用户的cookies信息，并跳到主页面
	$scope.loginOut=function(){
		$cookies.remove("id");
		$cookies.remove("name");
		$cookies.remove("image");
		$state.go("main");

	}
	

	

}]);