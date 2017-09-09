'use strict';
app.controller('mainCtrl', ['$http', '$scope',"$cookies" ,function($http, $scope,$cookies){
	//获取用户的用户名
	$scope.cookiesName=$cookies.get("name");
	//获取职位信息
 	$http.get('/data/positionList.json').success(function(res){
   		$scope.list = res;
  	});
}]);
