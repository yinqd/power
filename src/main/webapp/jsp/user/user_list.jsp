<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <title>用户列表</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Bootstrap -->
        <link rel="stylesheet" media="screen" href="../jsp/common/css/bootstrap.min.css">
        <link rel="stylesheet" media="screen" href="../jsp/common/css/bootstrap-theme.min.css">
		<link rel="stylesheet" type="text/css" href="../jsp/common/css/easyui/easyui.css">
		<link rel="stylesheet" type="text/css" href="../jsp/common/css/easyui/icon.css">
		<link rel="stylesheet" type="text/css" href="../jsp/common/css/easyui/demo.css">
		<script src="../jsp/common/js/jquery-1.9.1.js"></script>
		<script type="text/javascript" src="../jsp/common/js/easyui/jquery.easyui.min.js"></script>
		<script type="text/javascript" src="../jsp/common/js/easyui/datagrid-detailview.js"></script>
		<script type="text/javascript" src="../jsp/common/js/easyui/easyui-lang-zh_CN.js"></script>
		<script type="text/javascript" src="../jsp/common/js/ajax.js"></script>
    </head>
    <body id="body" style="width: 100%; height: 100%;">
			<table id="dg" cellspacing="0" cellpadding="0" style="width:100%;height:100%;"  data-options="
				title:'用户列表',
				rownumbers:true,
				singleSelect:true,
				autoRowHeight:false,
				pageList:[5,10,15,20],
				pagination:true,
				pageSize:10,
				loadMsg:'数据加载中,请稍候片刻...',
				pageNumber:1,
				method:'post',
				toolbar:'#tb'">
			<thead>
				<tr>
					<th field="userId" hidden="true"></th>
					<th data-options="field:'userName',width:80,align:'center'" width="25%">用户名称</th>
					<th data-options="field:'userState',width:80,align:'center',formatter:formatState" width="20%">用户状态</th>
					<th data-options="field:'userScore',width:80,align:'center'" width="10%">用户积分</th>
					<th data-options="field:'userSex',width:80,align:'center',formatter:formatSex" width="10%">用户性别</th>
					<th data-options="field:'shutupState',width:80,align:'center',formatter:formatShutup" width="10%">是否被禁言</th>
					<th data-options="field:'_operate',width:80,align:'center',formatter:formatOper" width="24%">操作</th>
				</tr>
			</thead>
	    </table>
	<div id="tb" style="padding:2px 5px;">
		用户名: <input class="easyui-textbox" style="width:110px" id="userName">
		<a href="javascript:search();" class="easyui-linkbutton" iconCls="icon-search">查询</a>
	</div>
	
	<script>
		var formatOper = function(val,row,index){  
			var oper = 
				'<a href=\"javascript:commentDetail(' + row.userId + ')\" class=\"easyui-linkbutton\" >查看用户历史评价</a>&nbsp;&nbsp;' + 
				'<a href=\"javascript:close(' + row.userId + ')\" class=\"easyui-linkbutton\" >关闭用户</a>';
			if(row.shutupState != '1')	
				oper += '&nbsp;&nbsp;<a href=\"javascript:shutup(1,' + row.userId + ')\" class=\"easyui-linkbutton\" >禁言</a>' ;
			else
				oper += '&nbsp;&nbsp;<a href=\"javascript:shutup(0,' + row.userId + ')\" class=\"easyui-linkbutton\" >停止禁言</a>' ;
		    return oper;
		}  
		
		var commentDetail = function(userId){
			window.location.href = "../book/userCommentShow.action?clientType=5398&userId=" + userId;
		}
		
		var formatDetail = function(val,row,index){
			val = val == null || val == '' ? "暂无个人信息" : val;
			return '<a href=\"javascript:detail()\" class=\"easyui-linkbutton\" >'+val+'</a>';  
		}
		
		var formatSex = function(val,row,index){
			val = val == null || val == '' || val == 0 ? "男" : "女";
			return val;
		}
		
		var formatShutup = function(val,row,index){
			val = val == '1' ? "是" : "否";
			return val;
		}
	
		var formatState = function(val,row,index){
			val = val == null || val == '' || val == '0' ? "离线" : "在线";
			return val;
		}
		
		$(function(){
			$("#body").css("height" , ($(document).height() - 20));
			//alert($("#body").css("height"));
			$('#dg').datagrid({
				pageNumber:1,
				url:'../adminuser/searchUserVoList.action',
				queryParams:{clientType : 5398}	
			});
		});
		var search = function(){
			$('#dg').datagrid({
				pageNumber:$('#dg').datagrid('options').pageNumber,
				url:'../adminuser/searchUserVoList.action',
				queryParams:{clientType : 5398,userName:$("#userName").val()}	
			});
		}
		var flush = function(){
			 $('#dg').datagrid(
				{
					pageNumber:$('#dg').datagrid('options').pageNumber,
					url:'../adminuser/searchUserVoList.action',
					queryParams:{clientType : 5398,userName:$("#userName").val()}	
				}
		     );
		}
	</script>
    <script type="text/javascript">
        var shutup = function(shutupState,userId){
        	var row = $("#dg").datagrid('getSelected');
        	if(row == null){
        		$.messager.alert('错误操作提示！','请选择要操作的数据行!','warning');
        	}else{
        		$.messager.defaults = { ok: "是", cancel: "否" };
       	        $.messager.confirm("操作提示", "您确定要执行操作吗？", function (data) {
       	            if (data) {
       	            	post("../user/shutupUser.action",{"shutupState":shutupState,"clientType":"5398","userId":userId},function(data){
       	            		data = eval('(' + data + ')');
       	            		if(data.stateCode == 1){
       	            			$.messager.alert('操作提示！','操作成功!','info');
       	            			flush();
       	            		}
       	            	});
       	            }
       	        });
        	}
        }
        var close = function(userId){
        	var row = $("#dg").datagrid('getSelected');
        	if(row == null){
        		$.messager.alert('错误操作提示！','请选择要操作的数据行!','warning');
        	}else{
        		$.messager.defaults = { ok: "是", cancel: "否" };
       	        $.messager.confirm("操作提示", "您确定要执行操作吗？", function (data) {
       	            if (data) {
       	            	post("../user/closeUser.action",{"clientType":"5398","userId":userId},function(data){
       	            		data = eval('(' + data + ')');
       	            		if(data.stateCode == 1){
       	            			$.messager.alert('操作提示！','操作成功!','info');
       	            			flush();
       	            		}
       	            	});
       	            }
       	        });
        	}
        }
    </script>
    </body>
</html>
