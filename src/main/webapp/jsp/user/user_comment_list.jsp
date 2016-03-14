<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <title>用户评论列表</title>
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
		<script type="text/javascript" src="../jsp/common/js/dialog/jquery.multiDialog.js"></script>
    </head>
    <body id="body" style="width: 100%; height: 100%;">
			<table id="dg" cellspacing="0" cellpadding="0" style="width:100%;height:100%;"  data-options="
				title:'用户评论列表',
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
					<th data-options="field:'createTime',width:80,align:'center'" width="25%">评论时间</th>
					<th data-options="field:'commentDesc',width:80,align:'center'" width="49%">评论内容</th>
					<th data-options="field:'drugCnName',width:80,align:'center'" width="10%">药品</th>
					<th data-options="field:'drugStoreName',width:80,align:'center'" width="15%">药店</th>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<a href="${backUrl }" class="easyui-linkbutton" iconCls="icon-remove" plain="true">关闭</a>
				</tr>
			</tfoot>
	    </table>
	    <script type="text/javascript">
		    $(function(){
				$("#body").css("height" , ($(document).height() - 20));
				//alert($("#body").css("height"));
				$('#dg').datagrid({
					pageNumber:1,
					url:'../book/searchUserCommentList.action',
					queryParams:{clientType : 5398 , userId : '${userId}'}	
				});
			});
	    </script>
    </body>
</html>
