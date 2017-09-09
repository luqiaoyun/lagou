'use strict';
app.controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){
	//获取收藏用户收藏的职位，实际开发时应把用户id传给后台
	$http.get("/data/myFavorite.json").success(function(res){
		$scope.positionList=res;
	})
	//让收藏呢图标显示
	$scope.showStar=true;

 
}]);