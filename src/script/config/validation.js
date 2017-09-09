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