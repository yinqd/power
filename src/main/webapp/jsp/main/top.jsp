<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="../common/css/style.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" src="../common/js/jquery-1.9.1.js"></script>
<script type="text/javascript">
$(function(){	
	//顶部导航切换
	$(".nav li a").click(function(){
		$(".nav li a.selected").removeClass("selected")
		$(this).addClass("selected");
	})	
})	
</script>


</head>

<body style="background:url(../common/images/topbg.gif) repeat-x;">

    <div class="topleft">
    <a href="main.html" target="_parent"><img src="../common/images/logo.png" title="系统首页" /></a>
    </div>
    <ul class="nav">
    <li><a href="default.html" target="rightFrame" class="selected"><img src="../common/images/icon01.png" title="工作台" /><h2>首页</h2></a></li>
    <li><a href="tab.html"  target="rightFrame"><img src="../common/images/icon01.png" title="系统设置" /><h2>系统设置</h2></a></li>
    </ul>
    <div class="topright">    
    <ul>
    <li><span><img src="../common/images/help.png" title="帮助"  class="helpimg"/></span>帮助</li>
    <li><a href="#">关于</a></li>
    <li><a href="login.html" target="_parent">退出</a></li>
    </ul>
     
    <div class="user">
    <span>admin</span>
    <!-- <i>消息</i>
    <b>5</b> -->
    </div>    
    
    </div>

</body>
</html>
