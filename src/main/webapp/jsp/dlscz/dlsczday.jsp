<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://"  + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <!-- Bootstrap -->
<link rel="stylesheet" href="<%=basePath %>/js/bootstrap/css/bootstrap.css?v1.0" />
<link rel="stylesheet" href="<%=basePath %>/js/bootstrap/css/bootstrap-switch.css?v1.0"/>
<link rel="stylesheet" href="<%=basePath %>/js/jquery-ui/jquery-ui-1.9.2.custom.css?v1.0"/>
<link rel="stylesheet" href="<%=basePath %>/js/umeditor/themes/default/css/umeditor.min.css?v1.0"/>
<link rel="stylesheet" href="<%=basePath %>/js/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css?v1.0"/>
<link rel="stylesheet" href="<%=basePath %>/js/jquery.validate/cmxform.css?v1.0"/>
<link rel="stylesheet" href="<%=basePath %>/themes/style/css/base.css?v1.0"/>
    <link rel="stylesheet" href="<%=basePath %>/themes/style/css/ie.css"/>
<script src="<%=basePath %>/js/jquery-1.10.2.min.js?v1.0"></script>
<script src="<%=basePath %>/js/jquery.PrintArea.js?v1.0"></script>
<script type="text/javascript">var _loginUrl='${loginUrl}';var ctxPath="<%=basePath %>";</script>
<script src="<%=basePath %>/js/bootstrap/js/bootstrap.js?v1.0"></script>
<script src="<%=basePath %>/js/bkeruyun.js?v1.0"></script>
<script src="<%=basePath %>/js/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js?v1.0"></script>
<script src="<%=basePath %>/js/bootstrap-datetimepicker/locales/bootstrap-datetimepicker.zh-CN.js?v1.0"></script>
<script src="<%=basePath %>/js/jquery-ui/jquery-ui-1.9.2.custom.min.js?v1.0"></script>
<script src="<%=basePath %>/js/umeditor/umeditor.config.js?v1.0"></script>
<script src="<%=basePath %>/js/umeditor/umeditor.min.js?v1.0"></script>
<script src="<%=basePath %>/js/jquery-json-2.4.js?v1.0"></script>
<script src="<%=basePath %>/js/messageBox.js?v1.0"></script>
<script src="<%=basePath %>/js/ajaxfileupload-2.1GD.js?v1.0"></script>
<script src="<%=basePath %>/js/pageQuery.js?v1.0"></script>
<title>代理商充值日报表</title>
</head>

<body>
<div id="header">
  <!-- 导入导航信息 -->
  <!-- 标题 -->
  <div class="article-header">
    <div class="center-block">
      <h1>代理商充值日报表</h1>
    </div>
  </div>
</div>
<div class="center-block panel-group mt20" >
  <!-- 左栏 start -->
  <div class="aside">
    <form action="#" method="post" id="queryForm">
	   <div class="aside-column panel-search">
		     <h2>营业点</h2>
		     <div>
		     <select class="form-control" id="nodeNo" name="nodeNo"></select>
		     </div>
	  </div>
      <div class="aside-column">
        <h2>代理商编号</h2>
        <div class="search-box">
          <input data-format="database" type="text" name="agentId" class="form-control" id="agentId">
          <button type="button" class="close" aria-hidden="true">&times;</button>
        </div>
        <h2>代理商名称</h2>
        <div class="search-box">
          <input data-format="database" type="text" name="agentName" class="form-control" id="agentName">
          <button type="button" class="close" aria-hidden="true">&times;</button>
        </div>
      </div>

      <!-- 下单日期 start -->
      <div class="aside-column panel-search">
        <h2 id="reg-time">起始日期</h2>
        <div class="search-box">
          <input name="startTime" type="text" class="form-control datepicker-start" id="date-start" placeholder="开始日期" readonly="">
          <button type="button" class="close" id="empty-date-start" aria-hidden="true">×</button>
        </div>
        <h2 id="reg-time">终止日期</h2>
        <div class="search-box mt10">
          <input name="endTime" type="text" class="form-control datepicker-end" id="date-end" placeholder="结束日期" readonly="">
          <button type="button" class="close" aria-hidden="true">×</button>
        </div>
      </div>
      <div class="aside-column panel-search">
        <h2 id="reg-time">操作员</h2>
        <div>
		     <select class="form-control" id="operatorId" name="operatorId"></select>
		</div>
      </div>
      <!-- 下单日期 end -->
      <a class="btn-blue btn-search" onclick="doQuery()" role="button" >查   询</a>
      <a class="btn-blue btn-search" onclick="printDlscz()" role="button" >打  印</a>
    </form>
  </div>
  <div class="main" id="main">
    <div class="panel" style="margin-bottom:0;" id="panel">
      <div class="panel-body" style="padding:0 20px;">
        <table cellpadding="0" cellspacing="0" class="table table-fixed table-hover text-center" >
          <thead>
          <tr>
            <th style="display: none;"></th>
            <th>序号</th>
            <th>代理商编号</th>
            <th>代理商名称</th>
            <th>充值日期时间</th>
            <th>充值金额(元)</th>
            <th>收费网点</th>
            <th>操作员</th>
          </tr>
          </thead>
          	
          <tbody id="tbody-1">
          </tbody>
        </table>
		
      </div>
    </div>
  </div>
</div>


<script src="<%=basePath %>/js/terminaldlscz/dlsczday.js"></script>
<script src="<%=basePath %>/js/common/common.js"></script>
<script>
  $(function(){
	  $('#date-start').datetimepicker({
		    format: 'yyyy-mm-dd hh:ii'
	  });
	  $('#date-end').datetimepicker({
		    format: 'yyyy-mm-dd hh:ii'
	  });
    var today = new Date().Format("yyyy-MM-dd hh:mm");
    $("#date-start").val(today);
    $("#date-end").val(today);
    if(window.JPlaceHolder){
      $("#date-start,#date-end").parent(".placeholderBox").find(".holder").hide();
    }
    doQuery();
  });
  
  function printDlscz(){
  	$("div#main").printArea(); 
  }
</script>
</body>
</html>