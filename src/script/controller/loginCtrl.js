'use strict';
app.controller('loginCtrl', ['$http', '$scope','$cookies','$state', function($http, $scope,$cookies,$state){
	$scope.submit=function(){
		//把用户的数据传给后台验证，理应用post方法，这里为了好模拟，用get方法代替
		$http.get("/data/login.json",{
			params:{
				user:$scope.user,
			}
		}).success(function(res){
			//用cookies存储登录用户的信息
			$cookies.put("id",res.id);
			$cookies.put("name",res.name);
			$cookies.put("image",res.image);
			//登录成功后跳到主页面
			$state.go("main");
		
		})
	}
 
}]);