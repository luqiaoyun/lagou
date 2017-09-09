app.controller("companyCtrl",["$scope","$http","$state",function($scope,$http,$state){
	//根据公司的id获取公司的信息
	$http.get("/data/company.json",{
		params:{
			id:$state.params.id,
		}
	}).success(function(res){
		$scope.company=res;
		//把公司职位的第一个类型设置为默认显示的
		$scope.select=$scope.company.positionClass[0];
	})
		
	

	
}])