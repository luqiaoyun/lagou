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