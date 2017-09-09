app.directive("appPositionList",[function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/positionList.html",
		scope:{
			data:"=",
			filterObject:"=",
			showStar:"="
		},
		link:function($scope,$http){
			$scope.click=function(item){

				//向后台传送收藏的信息

			}
		}
	}
	
}])