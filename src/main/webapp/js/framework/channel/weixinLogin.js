$(function(){
	
	/**
	 * 序列化form
	 * @param formId 
	 * @returns
	 */
	function serializeFormById(formId){
		beforeSerialize(formId);
		var ret=$("#"+formId).serialize();
		afterSerialize(formId);
		return ret;
	}
	
	/**
	 * 调用$("#"+formId).serialize()方法前调用，用于兼容查询时ie8,9不支持html5 placeholder问题
	 * @param formId
	 */
	function beforeSerialize(formId){
		$("#"+formId+" input[placeholder]").each(function(i,e){
			$this=$(this);
			var placeHolder=$this.attr("placeholder");
			var value=$this.val();
			if(placeHolder==value){
				$this.attr("isChange",true);
				$this.val("");
			}
		});
	}

	/**
	 * 调用$("#"+formId).serialize()方法后调用，用于兼容查询时ie8,9不支持html5 placeholder问题
	 * @param formId
	 */
	function afterSerialize(formId){
		$("#"+formId+" input[placeholder]").each(function(i,e){
			$this=$(this);
			var placeHolder=$this.attr("placeholder");
			var value=$this.val();
			var isChange=$this.attr("isChange");
			if(value=="" && isChange){
				$this.removeAttr("isChange");
				$this.val(placeHolder);
			}
		});
	}

	$("#loginButton").on("click",function(e){
		    e.preventDefault();//取消默认事件
		    $("#loginNull").hide();
			$("#loginError").hide();
			$("#netError").hide();
		  //后台ajax校验start
		    
			var cNumber = $(":input[name='cNumber']").val();
			var userName = $(":input[name='userName']").val();
			var password = $(":input[name='password']").val();
			
			if(cNumber.trim() == ""|| userName.trim() == "" || password.trim() == ""){
				$("#loginNull").show();
				return;
			}
			$.ajax({
					type:"POST",
					url:"login/normal/weixin/login",
					data:serializeFormById("loginForm"),
					dataType:"json",
					async:false,
					cache:false,
					success:function(data){
						if(data == "success"){
						    location.href = $("base").attr("href") + "menu/weixin/myShop";
						}else{
							$("#loginError").show();
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						$("#netError").show();
				    },
				});	
			//后台ajax校验end
		});
	
	
	$("#btn-exit").on("click",function(e){//退出登陆
		e.preventDefault();//取消默认事件
		location.href = $("base").attr("href") + "login/normal/weixin/loginOut";
	});
});


