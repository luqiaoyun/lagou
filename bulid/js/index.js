"use strict";
let app=angular.module("app",['ui.router','ngCookies','validation','ngAnimate'])
app.value("dict",{}).run(["dict","$http",function(dict,$http){
	$http.get("/data/city.json").success(function(res){
		dict.city=res;
	})
	$http.get("/data/salary.json").success(function(res){
		dict.salary=res;
	})
	$http.get("/data/scale.json").success(function(res){
		dict.scale=res;
	})
}])
"use strict";
app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
	$stateProvider.state("main",{
		url:"/main",
		templateUrl:"../view/template/main.html",
		controller:"mainCtrl",
	})
	.state("my",{
		url:"/my",
		templateUrl:"../view/template/my.html",
		controller:"myCtrl",
	})
	.state("search",{
		url:"/search",
		templateUrl:"../view/template/search.html",
		controller:"searchCtrl",
	})
	.state("position",{
		url:"/position/:id",
		templateUrl:"../view/template/position.html",
		controller:"positionCtrl"
	})
	.state("company",{
		url:"/company/:id",
		templateUrl:"../view/template/company.html",
		controller:"companyCtrl"
	})
	.state("login",{
		url:"/login",
		templateUrl:"../view/template/login.html",
		controller:"loginCtrl"
	})
	.state("register",{
		url:"/register",
		templateUrl:"../view/template/register.html",
		controller:"registerCtrl"
	})
	.state("favorite",{
		url:"/favorite",
		templateUrl:"../view/template/favorite.html",
		controller:"favoriteCtrl"
	})
	.state("post",{
		url:"/post",
		templateUrl:"../view/template/post.html",
		controller:"postCtrl"
	});

	$urlRouterProvider.otherwise("main");
}])
app.config(["$validationProvider",function($validationProvider){
	let expression={
		phone:/^1[\d]{10}$/,
		password:function(value){
			let str=value+"";
			return str.length>5;
		},
		required:function(value){
			return !!value;
		}
	};
	let defaultMsg={
		phone:{
			success:"",
			error:"请输入长度为11的手机号"
		},
		password:{
			success:"",
			error:"密码长度必须大于5"
		},
		required:{
			success:"",
			error:"不能为空",
		}
	}
	$validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

}])
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
'use strict';
app.controller('favoriteCtrl', ['$http', '$scope', function($http, $scope){
	//获取收藏用户收藏的职位，实际开发时应把用户id传给后台
	$http.get("/data/myFavorite.json").success(function(res){
		$scope.positionList=res;
	})
	//让收藏呢图标显示
	$scope.showStar=true;

 
}]);
'use strict';
app.controller('loginCtrl', ['$http', '$scope','$cookies','$state', function($http, $scope,$cookies,$state){
	$scope.submit=function(){
		//把用户的数据传给后台验证，理应用post方法，这里为了好模拟，用get方法代替
		$http.get("/data/login.json",{
			params:{
				user:$scope.user,
			}
		}).success(function(res){
			//用cookies存储登录用户的信息
			$cookies.put("id",res.id);
			$cookies.put("name",res.name);
			$cookies.put("image",res.image);
			//登录成功后跳到主页面
			$state.go("main");
		
		})
	}
 
}]);
'use strict';
app.controller('mainCtrl', ['$http', '$scope',"$cookies" ,function($http, $scope,$cookies){
	//获取用户的用户名
	$scope.cookiesName=$cookies.get("name");
	//获取职位信息
 	$http.get('/data/positionList.json').success(function(res){
   		$scope.list = res;
  	});
}]);

'use strict';
app.controller('myCtrl', ['$http', '$scope','$cookies','$state' ,function($http, $scope,$cookies,$state){
	//获取登录用户的信息
	$scope.cookiesId=$cookies.get("id");
	$scope.cookiesName=$cookies.get("name");
	$scope.cookiesImage=$cookies.get("image");
	//退出登录时清空用户的cookies信息，并跳到主页面
	$scope.loginOut=function(){
		$cookies.remove("id");
		$cookies.remove("name");
		$cookies.remove("image");
		$state.go("main");

	}
	

	

}]);
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
'use strict';
app.controller('registerCtrl', ['$http', '$scope','$interval','$state', function($http, $scope,$interval,$state){
	//初始化发送信息哦按钮的文字
	$scope.timeMsg="发送短信";
	//点击发送时执行，60秒后课重新发送
	$scope.send=function(){
		$http.get("/data/handle.json").success(function(res){
			if(res.state==1){
				$scope.time=60;
				let count=60;
				$scope.timeMsg=count+"s";
				let interval=$interval(function(){
					if(count>0){
						count--;
						$scope.timeMsg=count+"s";
					}else{
						$interval.cancel(interval);
						$scope.timeMsg="重新发送";
						$scope.time="";

					}
				},1000)
			}
		})
	};
	$scope.submit=function(){
		//把客户注册的数据用post方法传给后台,这里模拟简单用了get
		$http.get("/data/myPost.json").success(function(res){
			//注册成功后跳到登录页面
			$state.go("login");

		})

	}
 
}]);
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
app.directive("appCompanyInfo",[function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/appCompanyInfo.html",
	}
}])
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
app.directive("appPositionFooter",[function(){
	return{
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/appPositionFooter.html",
		scope:{
			text:"@",
		}
	}
}])
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
app.directive("appFooter",[function(){
	return {
		restrict:"A",
		replace:true,
		templateUrl:"../view/template/footer.html",

	}
}])
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
'use strict';
angular.module('app').filter('filterByObject', [function(){
  return function(list, obj) {
    var result = [];
    angular.forEach(list, function(item){
      var isEqual = true;
      for(var e in obj){
        if(item[e]!==obj[e]) {
          isEqual = false;
        }
      }
      if(isEqual) {
        result.push(item);
      }
    });
    return result;
  };
}]);