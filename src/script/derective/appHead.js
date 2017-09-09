app.directive("appHead",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/appHead.html",
		scope:{
			text:"@"
		},
		link:function($scope){
			$scope.back=function(){
			window.history.back();
			}
		}

	}
}])