app.directive("appPositionClass",[function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/appPositionClass.html",
		scope:{
			com:"=",
			select:"=",
		},
		link:function($scope){
			$scope.selectPositionClass=function(data){
				$scope.select=data;
			}
		}
	}
	
}])