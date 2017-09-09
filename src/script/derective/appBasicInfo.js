app.directive("appBasicInfo",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/appBasicInfo.html",
		scope:{
			position:"=",
			cookiesName:"=",
			cookiesIsFavorite:"=",
			favorite:"&",
		},
		link:function($scope){
			$scope.click=function(position){
				$scope.favorite(position);

			}

		}
	}
	
}])