'use strict';
app.controller('postCtrl', ['$http', '$scope', function($http, $scope){
	//初始化导航条的数据
	$scope.tabList=[
	{id:"all",name:"全部"},
	{id:"pass",name:"面试邀请"},
	{id:"fail",name:"不合适"}
	];
	//记录当前导航条选择的选项卡的id
	$scope.activeId=$scope.tabList[0]['id'];
	//初始化记录投递状态的变量
	$scope.state="";
	//初始化过滤对的对象
	$scope.filterObj={};
	//获取投递过的职位信息
	$http.get("/data/myPost.json").success(function(res){
		$scope.positionList=res;
	});
	//切换导航条的选项卡时执行
	$scope.tClick=function(id,name){
		//当前选中的选项卡为点击的选项卡 
		$scope.activeId=id;
		//根据点击的选项卡的id给state赋值
		switch(id){
			case "all":
				$scope.state="";
				break;
			case "pass":
				$scope.state=1;
				break;
			case "fail":
				$scope.state=-1;
				break;

		};
		if($scope.state){
			//如果选中的是通过和不合适，则把过滤的对象设置为当前选中的选项卡
			for(let i=0;i<$scope.positionList.length;i++){
				if($scope.positionList[i].state==$scope.state){
					$scope.filterObj['id']=$scope.positionList[i].id;
				}
			}
		}else{
			//若果选中的是全部，则删除过滤对象，即不进行过滤
			delete $scope.filterObj['id'];
		}
		


	}
 
}]);