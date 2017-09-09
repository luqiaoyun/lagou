'use strict';
app.controller('searchCtrl', ['$http', '$scope',"dict" ,"$filter",function($http, $scope,dict,$filter){
  //获取职位的信息
  $http.get('/data/positionList.json').success(function(res){
    $scope.list = res;
  });
  //初始化导航条
  $scope.tabList = [{
    id: 'city',
    name: '城市'
  }, {
    id: 'salary',
    name: '薪水'
  }, {
    id: 'scale',
    name: '公司规模'
  }];

//定义当前高亮的是哪个选项卡
  $scope.activeId=$scope.tabList[0].id;
  //定义高亮选项卡的下拉菜单内容
  $scope.sheetList=dict[$scope.activeId];
  $scope.filterObject={};
  //控制下拉菜单的显示
  $scope.visiable=false;
  //切换选项卡时执行
  $scope.tClick=function(id,name){
    $scope.activeId=id;
    $scope.sheetList=dict[id];
    $scope.visiable=true;
  }
  //点击下拉菜单的菜单条时执行
  $scope.sClick=function(id,name){
    //点击后下拉菜单消失
    $scope.visiable=false;
    if(id){
        //如果点击的是不限之外的菜单条，则用过菜单条的id过滤显示的职位
        $scope.filterObject[$scope.activeId+"Id"]=id;
        //把点中的菜单条的名字显示到对应的导航条
        for(let i=0;i<$scope.tabList.length;i++){
          if($scope.tabList[i].id==$scope.activeId){
            $scope.tabList[i].name=name;
          }
        }
    }else{
      //如果点击的是不限，则删除对应的过滤对象
        delete $scope.filterObject[$scope.activeId+"Id"];
        //把导航条的名字改成相应的初始化时的名字
        angular.forEach($scope.tabList,function(item){
          if($scope.activeId==item.id){
            switch($scope.activeId){
              case "city":
                item.name="城市";
                break;
              case "salary":
                item.name="资薪";
                break;
              case "scale":
                item.name="公司规模";
                break;


            }
          }
        })
    }
    
    

  }
  
  
}]);