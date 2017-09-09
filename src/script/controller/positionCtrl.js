app.controller("positionCtrl",["$scope","$http","$state","$cookies",function($scope,$http,$state,$cookies){
	//获取登录用户的同户名
	$scope.cookiesName=$cookies.get("name");
	//根据职位的id获取职位的具体信息
	$http.get('data/position.json',{
		params:{
			id:$state.params.id,
		}
	}).success(function(res){
		$scope.position=res;

	})
	//根据公司的id过去公司的具体信息
	$http.get('data/company.json',{
		params:{
			id:$state.params.id,
		}
	}).success(function(res){
			$scope.company=res;
	});
	//初始化控制某个职位是否被收藏的变量,
	$scope.cookiesIsFavorite=!!$cookies.get("isFavorite"+$state.params.id);
	//点击收藏按钮时执行
	$scope.favorite=function(){
		if(!!$cookies.get("isFavorite"+$state.params.id)){
			//如果已经收藏，则再次点击时删除当前职位标记收藏的变量
			$cookies.remove("isFavorite"+$state.params.id);
			$scope.cookiesIsFavorite=false;

		}else{
			//如果没有被收藏，则再次点击后添加当前职位标记收藏的变量
			$scope.cookiesIsFavorite=true;
			$cookies.put("isFavorite"+$state.params.id,$scope.cookiesIsFavorite);

		}

	 }
	

		

}])