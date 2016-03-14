<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="UTF-8"%>
<% 
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	response.setContentType("text/html;charset=UTF-8"); 
%>
<!DOCTYPE html>
<html class="bootstrap-admin-vertical-centered">
    <head>
        <title>找药吧后台登录</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" media="screen" href="jsp/common/css/bootstrap.min.css">
        <link rel="stylesheet" media="screen" href="jsp/common/css/bootstrap-theme.min.css">
        <link rel="stylesheet" media="screen" href="jsp/common/css/bootstrap-admin-theme.css">
        
        <script type="text/javascript" src="jsp/common/js/formvalidator/jquery-1.4.4.min.js"></script>
		<script src="jsp/common/js/formvalidator/formValidator-4.1.3.js" type="text/javascript" charset="UTF-8"></script>
		<script src="jsp/common/js/formvalidator/formValidatorRegex.js" type="text/javascript" charset="UTF-8"></script>
        <script type="text/javascript" src="jsp/common/js/jquery-md5.js"></script>
         <script type="text/javascript" src="jsp/common/js/jquery-base64.js"></script>
        <style type="text/css">
            .alert{
                margin: 0 auto 20px;
            }
        </style>
    </head>
    <body class="bootstrap-admin-without-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                   <!--  <div class="alert alert-info">
                        <a class="close" data-dismiss="alert" href="#">&times;</a>
                        Press enter key or click the Submit button
                    </div> -->
                    <form id="form1" method="post" action="about.html" class="bootstrap-admin-login-form">
                        <h1>Login</h1>
                        <div class="form-group">
                            	用户名：<input class="form-control" style="width: 280px;" type="text" name="userName" id="userName" placeholder="用户名" value="admin">
                        </div>
                        <div class="form-group">
                              	密&nbsp;&nbsp;&nbsp;码：<input class="form-control" style="width: 280px;" type="password" id="userPassword" name="userPassword" placeholder="密码" value="123456">
                        </div>
                         <div class="form-group">
	                                                                     验证码：<input type="text" name="verifyCode" id="verifyCode" style="width: 150px;" />  
	                            <img alt="验证码" id="veliateCode" title="看不清换一张" style="cursor: pointer;" src="login/captchaImage.action?clientType=5398" width="100px" height="35px">
                         </div>
                         <div class="form-group">
                         	<span style="color:red" id="sp1">用户名密码错误</span>
                         </div>
                         <!-- 
                        <div class="form-group">
                            <label>
                                <input type="checkbox" name="remember_me">
                                Remember me
                            </label>
                        </div> -->
                        <button class="btn btn-lg btn-primary" type="submit" id="btn">提交</button>
                        <button class="btn btn-lg btn-primary" type="reset" id="btn">重置</button>
                    </form>
                </div>
            </div>
        </div>

        <script type="text/javascript">
		        $.formValidator.initConfig({formID:"form1",submitOnce:true,
		    		onError:function(msg,obj,errorlist){
		    			$("#errorlist").empty();
		    			$.map(errorlist,function(msg){
		    				$("#errorlist").append("<li>" + msg + "</li>")
		    			});
		    			if(msg != null && msg != '')
		    				alert(msg);
		    		},
		    		ajaxPrompt : '有数据正在异步验证，请稍等...'
		    	});
		    	$("#userName").formValidator({onShow:"请输入用户名",onFocus:"至少5个长度",onCorrect:"用户名合法"})
		    				  .inputValidator({min:5,empty:{leftEmpty:false,rightEmpty:false,emptyError:"用户名两边不能有空符号"},onError:"用户名长度至少为5位"});
		    	$("#userPassword").formValidator({onShow:"请输入密码",onFocus:"至少1个长度",onCorrect:"密码合法"}).inputValidator({min:1,empty:{leftEmpty:false,rightEmpty:false,emptyError:"密码两边不能有空符号"},onError:"密码不能为空,请确认"});
		    	$("#verifyCode").formValidator({onShowText:"请输入验证码",onShow:"请输入验证码",onFocus:"",onCorrect:""})
		    	.inputValidator({min:1,onError:"请输入验证码"})//.regexValidator({regExp:"username",dataType:"enum",onError:"用户名格式不正确"})
			    .ajaxValidator({
					dataType : "json",
					async : false,
					url : "login/verityImage.action",
					data:{"verifyCode":this.value,"clientType":"5398"},
					success : function(data){
			            if( $.base64.decode(data.model.stateCode) == "1" ){
			            	var submitFlag = false;
			            	var actionName = null;
			            	$.ajax({
			            		dataType:"json",
			            		type:"post",
			            		async:false,
			            		url:data.viewName,
			            		data:{"userName":$("#userName").val(),"userPassword":$.md5($("#userPassword").val()),"clientType":"5398"},
			            	    success : function(data1){
			            	    	if(data1.model.stateCode == "1"){
			            	    		actionName = data1.viewName;
			            	    		submitFlag = true;
			            	    	}else{
			            	    		submitFlag = false;
			            	    	}
			            	    }
			            	});
			            	if(submitFlag){
			            		$("#form1").attr("action", actionName);
			            	}else{
			            		$("#sp1").show();
			            		$("#veliateCode").click();
						        $("#verifyCode").empty();
			            	}
			            	return submitFlag;
			            }
			            $("#veliateCode").click();
			            $("#verifyCode").empty();
					},
					error: function(jqXHR, textStatus, errorThrown){alert("服务器没有返回数据，可能服务器忙，请重试");},
					onError : "",
					onWait : ""
			});
            $(function() {
            	$("#veliateCode").click(function(){
            		this.src="login/captchaImage.action?clientType=5398";
            	});
                $('input[name="email"]').focus();
                var alert = $('.alert');
                var formWidth = $('.bootstrap-admin-login-form').innerWidth();
                var alertPadding = parseInt($('.alert').css('padding'));
                if (isNaN(alertPadding)) {
                    alertPadding = parseInt($(alert).css('padding-left'));
                }
                $('.alert').width(formWidth - 2 * alertPadding);
            });
            
        </script>
    </body>
</html>
