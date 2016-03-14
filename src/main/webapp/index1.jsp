<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://"  + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="<%=basePath %>js/echarts/echarts.js"></script>
</head>
<body>
    <div id="main" style="width: 1000px;height: 1000px;">
    </div>
    <input type="button" value="添加一行" onclick="addOne();">
    <input type="button" value="获取值" onclick="get();">
    <script type="text/javascript">
    	function addOne(){
    		document.getElementById("main").innerHTML += "<input type='text' id='t' />";
    	}
    	function get(){
    		alert(document.getElementById("t").value);
    	}
    </script>
</body>
</html>