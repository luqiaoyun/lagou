app.directive("appTab",[function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/appTab.html",
		scope:{
			list:"=",
			active:"=",
			tabClick:"&",
		},
		link:function($scope){
			$scope.click=function(tab){
				$scope.tabClick(tab);
			}
		}
	}
}])