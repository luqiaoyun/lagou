app.directive("appSheet",[function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/appSheet.html",
		scope:{
			list:"=",
			visiable:"=",
			sheetClick:"&",
		},
		link:function($scope){
			$scope.click=function(item){
				$scope.sheetClick(item);
			}

		}


	}
}])