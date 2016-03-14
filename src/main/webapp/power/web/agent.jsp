<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
  String path = request.getContextPath();
  String basePath = request.getScheme() + "://"  + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<<script type="text/javascript">
ctxPath = '<%=basePath%>';
</script>
<!--[if IE 8]>
<html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]>
<html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
    <meta charset="utf-8"/>
    <title>后台管理系统</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport"/>
    <meta content="" name="description"/>
    <meta content="" name="author"/>
    <!-- BEGIN GLOBAL MANDATORY STYLES -->
    <link href="http://fonts.useso.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet"
          type="text/css"/>
    <!--<link href="<%=basePath %>power/assets/global/plugins/fonts-opensans/fonts-opensans.css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css"/>-->
    <link href="<%=basePath %>power/font-awesome/font-awesome.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath %>power/simple-line-icons/simple-line-icons.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath %>power/assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <link href=".<%=basePath %>power/assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath %>power/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css" rel="stylesheet"
          type="text/css"/>
    <!-- END GLOBAL MANDATORY STYLES -->
    <!-- BEGIN PAGE LEVEL PLUGIN STYLES -->
    <link href="<%=basePath %>power/assets/global/plugins/gritter/css/jquery.gritter.css" rel="stylesheet" type="text/css"/>
    <!-- END PAGE LEVEL PLUGIN STYLES -->
    <!-- BEGIN THEME STYLES -->
    <link href="<%=basePath %>power/assets/global/css/components.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath %>power/assets/global/css/plugins.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath %>power/assets/admin/layout/css/layout.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath %>power/assets/admin/layout/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
    <link href="<%=basePath %>power/assets/admin/layout/css/custom.css" rel="stylesheet" type="text/css"/>
    <link href="<%=basePath %>power/css/common.css" rel="stylesheet" type="text/css"/>
    <!-- END THEME STYLES -->
    <link rel="shortcut icon" href="favicon.ico"/>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<!-- DOC: Apply "page-header-fixed-mobile" and "page-footer-fixed-mobile" class to body element to force fixed header or footer in mobile devices -->
<!-- DOC: Apply "page-sidebar-closed" class to the body and "page-sidebar-menu-closed" class to the sidebar menu element to hide the sidebar by default -->
<!-- DOC: Apply "page-sidebar-hide" class to the body to make the sidebar completely hidden on toggle -->
<!-- DOC: Apply "page-sidebar-closed-hide-logo" class to the body element to make the logo hidden on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-hide" class to body element to completely hide the sidebar on sidebar toggle -->
<!-- DOC: Apply "page-sidebar-fixed" class to have fixed sidebar -->
<!-- DOC: Apply "page-footer-fixed" class to the body element to have fixed footer -->
<!-- DOC: Apply "page-sidebar-reversed" class to put the sidebar on the right side -->
<!-- DOC: Apply "page-full-width" class to the body element to have full width page without the sidebar menu -->
<body class="page-header-fixed page-quick-sidebar-over-content page-sidebar-closed">
<!-- BEGIN HEADER -->
<div class="page-header navbar navbar-fixed-top">
    <!-- BEGIN HEADER INNER -->
    <div class="page-header-inner">
        <!-- BEGIN LOGO -->
        <div class="page-logo">
            <a href="terminal.html">
                <img src="<%=basePath %>power/assets/admin/layout/img/logo.png" alt="logo" class="logo-default"/>
            </a>
            <div class="menu-toggler sidebar-toggler">
                <!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
            </div>
        </div>
        <!-- END LOGO -->
        <!-- BEGIN RESPONSIVE MENU TOGGLER -->
        <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse"
           data-target=".navbar-collapse">
        </a>
        <!-- END RESPONSIVE MENU TOGGLER -->
        <!-- BEGIN TOP NAVIGATION MENU -->
        <div class="top-menu">
            <ul class="nav navbar-nav pull-right">
                <!-- BEGIN USER LOGIN DROPDOWN -->
                <li class="dropdown dropdown-user">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown"
                       data-close-others="true">
                        <img alt="" class="img-circle hide1" src="<%=basePath %>power/assets/admin/layout/img/avatar3_small.jpg"/>
					<span class="username username-hide-on-mobile">
					任老师 </span>
                        <i class="fa fa-angle-down"></i>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="#">
                                <i class="icon-lock"></i> 锁屏 </a>
                        </li>
                        <li>
                            <a href="login.html">
                                <i class="icon-key"></i> 退出 </a>
                        </li>
                    </ul>
                </li>
                <!-- END USER LOGIN DROPDOWN -->
                <!-- BEGIN QUICK SIDEBAR TOGGLER -->
                <li class="dropdown dropdown-quick-sidebar-toggler hide">
                    <a href="javascript:;" class="dropdown-toggle">
                        <i class="icon-logout"></i>
                    </a>
                </li>
                <!-- END QUICK SIDEBAR TOGGLER -->
            </ul>
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
    <!-- END HEADER INNER -->
</div>
<!-- END HEADER -->
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
    <!-- BEGIN SIDEBAR -->
    <div class="page-sidebar-wrapper">
        <!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
        <!-- DOC: Change data-auto-speed="200" to adjust the sub menu slide up/down speed -->
        <div class="page-sidebar navbar-collapse collapse">
            <!-- BEGIN SIDEBAR MENU -->
            <ul class="page-sidebar-menu page-sidebar-menu-closed" data-auto-scroll="true" data-slide-speed="200">
                <!-- DOC: To remove the sidebar toggler from the sidebar you just need to completely remove the below "sidebar-toggler-wrapper" LI element -->
                <li class="sidebar-toggler-wrapper">
                    <!-- BEGIN SIDEBAR TOGGLER BUTTON -->
                    <div class="sidebar-toggler">
                    </div>
                    <!-- END SIDEBAR TOGGLER BUTTON -->
                </li>
                <!-- DOC: To remove the search box from the sidebar you just need to completely remove the below "sidebar-search-wrapper" LI element -->
                <li class="sidebar-search-wrapper">
                    <!-- BEGIN RESPONSIVE QUICK SEARCH FORM -->
                    <!-- DOC: Apply "sidebar-search-bordered" class the below search form to have bordered search box -->
                    <!-- DOC: Apply "sidebar-search-bordered sidebar-search-solid" class the below search form to have bordered & solid search box -->
                    <form class="sidebar-search " action="extra_search.html" method="POST">
                        <a href="javascript:;" class="remove">
                            <i class="icon-close"></i>
                        </a>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="搜索">
							<span class="input-group-btn">
							<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
							</span>
                        </div>
                    </form>
                    <!-- END RESPONSIVE QUICK SEARCH FORM -->
                </li>
                <li >
                    <a href="terminal.html"> <i class="icon-home"></i> <span class="title">终端管理</span></a>
                </li>
                <li class="active">
                    <a href="agent.html"><i class="glyphicon glyphicon-tag"></i> <span class="title">代理商管理</span></a>
                </li>
                <li class="hide">
                    <a href=""><i class="glyphicon glyphicon-tags"></i> <span class="title">保证金充值</span></a>
                </li>
                <li class="hide">
                    <a href=""> <i class="glyphicon glyphicon-road"></i> <span class="title">终端交易明细报表</span></a>
                </li>
                <li>
                    <a href="recharge.html"> <i class="icon-pencil"></i> <span class="title">充值明细报表</span></a>
                </li>
            </ul>
            <!-- END SIDEBAR MENU -->
        </div>
    </div>
    <!-- END SIDEBAR -->
    <!-- BEGIN CONTENT -->
    <div class="page-content-wrapper">
        <div class="page-content">
            <!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
            <div id="endModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                            <h4 class="modal-title">代理商信息编辑</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form" id="form1">
                               <!--  <div class=" form-group">
                                    <label for="code" class="col-md-4 control-label">代理商编号:</label>
                                    <div class="col-md-6">
                                        <div class="right">
                                            <input id="code" class="form-control" type="text" placeholder="请输入代理商编号" value="">
                                        </div>
                                    </div>
                                </div> -->
                                <div class=" form-group">
                                    <label for="agent" class="col-md-4 control-label">所属网点:</label>
                                    <div class="col-md-6">
                                        <div class="right">
                                            <select id="nodeNo" name="nodeNo" class="form-control"></select>
                                        </div>
                                    </div>
                                </div>
                                <div class=" form-group">
                                    <label for="agentName" class="col-md-4 control-label">代理商名称:</label>
                                    <div class="col-md-6">
                                        <div class="right">
                                            <input id="agentName" name="agentName" class="form-control" type="text" placeholder="请输入代理商名称" value="">
                                        </div>
                                    </div>
                                </div>
                                <div class=" form-group">
                                    <label for="contacts" class="col-md-4 control-label">联系人:</label>
                                    <div class="col-md-6">
                                        <div class="right">
                                            <input id="contacts" id="agentLinkman" name="agentLinkman" class="form-control" type="text" placeholder="请输入联系人" value="">
                                        </div>
                                    </div>
                                </div>
                                <div class=" form-group">
                                    <label for="phone" class="col-md-4 control-label">联系人电话:</label>
                                    <div class="col-md-6">
                                        <div class="right">
                                            <input id="phone" id="agentPhone" name="agentPhone" class="form-control" type="text" placeholder="请输入联系人电话" value="">
                                        </div>
                                    </div>
                                </div>
                                <div class=" form-group">
                                    <label for="address" class="col-md-4 control-label">联系地址:</label>
                                    <div class="col-md-6">
                                        <div class="right">
                                            <input id="address" id="agentAddr" name="agentAddr"  class="form-control" type="text" placeholder="请输入联系地址" value="">
                                        </div>
                                    </div>
                                </div>
                                <div class=" form-group">
                                    <label for="remarks" class="col-md-4 control-label">备注信息:</label>
                                    <div class="col-md-6">
                                        <div class="right">
                                            <input id="remark" name="remark" class="form-control" type="text" placeholder="请输入备注信息" value="">
                                        </div>
                                    </div>
                                </div>
                                <div class=" form-group">
                                    <label class="col-md-4 control-label">客户状态:</label>
                                    <div class="col-md-6">
                                        <div class="right radio-list">
                                            <label class="radio-inline">
                                                <input type="radio" name="statusFlag" value="0"> 停用
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" name="statusFlag" value="1"> 正常
                                            </label>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="btnSaveEnd" type="button" class="btn blue">保存</button>
                            <button type="button" class="btn default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <!-- /.modal -->
            <!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
            <!-- BEGIN STYLE CUSTOMIZER -->
            <div class="theme-panel hidden-xs hidden-sm">
                <div class="toggler hide">
                </div>
                <div class="toggler-close">
                </div>
                <div class="theme-options">
                    <div class="theme-option theme-colors clearfix">
						<span>
						THEME COLOR </span>
                        <ul>
                            <li class="color-default current tooltips" data-style="default" data-container="body"
                                data-original-title="Default">
                            </li>
                            <li class="color-darkblue tooltips" data-style="darkblue" data-container="body"
                                data-original-title="Dark Blue">
                            </li>
                            <li class="color-blue tooltips" data-style="blue" data-container="body"
                                data-original-title="Blue">
                            </li>
                            <li class="color-grey tooltips" data-style="grey" data-container="body"
                                data-original-title="Grey">
                            </li>
                            <li class="color-light tooltips" data-style="light" data-container="body"
                                data-original-title="Light">
                            </li>
                            <li class="color-light2 tooltips" data-style="light2" data-container="body" data-html="true"
                                data-original-title="Light 2">
                            </li>
                        </ul>
                    </div>
                    <div class="theme-option">
						<span>
						Layout </span>
                        <select class="layout-option form-control input-small">
                            <option value="fluid" selected="selected">Fluid</option>
                            <option value="boxed">Boxed</option>
                        </select>
                    </div>
                    <div class="theme-option">
						<span>
						Header </span>
                        <select class="page-header-option form-control input-small">
                            <option value="fixed" selected="selected">Fixed</option>
                            <option value="default">Default</option>
                        </select>
                    </div>
                    <div class="theme-option">
						<span>
						Sidebar Mode</span>
                        <select class="sidebar-option form-control input-small">
                            <option value="fixed">Fixed</option>
                            <option value="default" selected="selected">Default</option>
                        </select>
                    </div>
                    <div class="theme-option">
						<span>
						Sidebar Menu </span>
                        <select class="sidebar-menu-option form-control input-small">
                            <option value="accordion" selected="selected">Accordion</option>
                            <option value="hover">Hover</option>
                        </select>
                    </div>
                    <div class="theme-option">
						<span>
						Sidebar Style </span>
                        <select class="sidebar-style-option form-control input-small">
                            <option value="default" selected="selected">Default</option>
                            <option value="light">Light</option>
                        </select>
                    </div>
                    <div class="theme-option">
						<span>
						Sidebar Position </span>
                        <select class="sidebar-pos-option form-control input-small">
                            <option value="left" selected="selected">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>
                    <div class="theme-option">
						<span>
						Footer </span>
                        <select class="page-footer-option form-control input-small">
                            <option value="fixed">Fixed</option>
                            <option value="default" selected="selected">Default</option>
                        </select>
                    </div>
                </div>
            </div>
            <!-- END STYLE CUSTOMIZER -->
            <!-- BEGIN PAGE HEADER-->
            <h3 class="page-title">
                代理商管理
                <small class="hide">dashboard & statistics</small>
            </h3>
            <div class="page-bar hide">
                <ul class="page-breadcrumb">
                    <li>
                        <i class="fa fa-home"></i>
                        <a href="terminal.html">终端管理</a>
                        <i class="fa fa-angle-right"></i>
                    </li>
                    <li>
                        <a href="#">终端管理列表</a>
                    </li>
                </ul>
                <div class="page-toolbar hide">
                    <div id="dashboard-report-range" class="pull-right tooltips btn btn-fit-height grey-salt"
                         data-placement="top" data-original-title="Change dashboard date range">
                        <i class="icon-calendar"></i>&nbsp; <span class="thin uppercase visible-lg-inline-block"></span>&nbsp;
                        <i class="fa fa-angle-down"></i>
                    </div>
                </div>
            </div>
            <!-- END PAGE HEADER-->
            <!-- BEGIN PAGE CONTENT-->
            <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN EXAMPLE TABLE PORTLET-->
                    <div class="portlet box blue" style="border: none;">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-gift"></i> 列表
                            </div>
                            <div class="tools">
                                <a href="" class="collapse">
                                </a>

                                <a href="" class="reload">
                                </a>
                                <a href="" class="remove">
                                </a>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="table-toolbar">
                                <div class="row">
                                    <div class="col-md-12 text-right">
                                        <input id="search" type="text" class="form-control search" placeholder="请输入序列号">

                                        <a id="searchRole" class="btn btn-primary green" href="#">
                                            <i class="icon-magnifier"></i> 查询
                                        </a>
                                        <a id="addEnd" class="btn btn-primary green updateEnd" href="javascript:void(0);">
                                            <i class="fa fa-plus"></i> 添加
                                        </a>
                                        <a class="btn btn-primary green updateEnd" href="javascript:void(0);">
                                            <i class="fa fa-pencil"></i> 修改
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <table id="roleList" class="table table-striped table-hover table-bordered" >
                                <thead>
                                <tr>
                                    <th class="table-checkbox">
                                    </th>
                                    <th>编号</th>
                                    <th>代理商名称</th>
                                    <th>联系人</th>
                                    <th>联系地址</th>
                                    <th>所属网点</th>
                                    <th>录入时间</th>
                                    <th>录入人</th>
                                    <th>备注</th>
                                </tr>
                                </thead>
                                <tbody id="tbody-1">
                                    <tr class="odd gradeX">
                                        <td>1</td>
                                        <td>00001</td>
                                        <td>中国移动</td>
                                        <td>沈先生</td>
                                        <td>13066662988</td>
                                        <td>四川省成都市</td>
                                        <td>00012</td>
                                        <td>2016-03-15 12:12:00</td>
                                        <td>备注信息.... </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="pageSize">
                                        <select id="pageSize" name="pageSize">
                                            <option>10</option>
                                            <option>20</option>
                                            <option>30</option>
                                            <option>50</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-9 text-right">
                                    <div class="dataTables_paginate paging_bootstrap pagination ">
                                        <ul class="pagination">
                                            <li class="prev disabled"><a href="#"> &laquo;上一页</a></li>
                                            <li class="active"><a href="#">1</a></li>
                                            <li><a href="#">2</a></li>
                                            <li><a href="#">3</a></li>
                                            <li><a href="#">...</a></li>
                                            <li><a href="#">6</a></li>
                                            <li><a href="#">7</a></li>
                                            <li><a href="#">8</a></li>
                                            <li><a href="#">9</a></li>
                                            <li><a href="#">10</a></li>
                                            <li><a href="#">...</a></li>
                                            <li><a href="#">18</a></li>
                                            <li><a href="#">19</a></li>
                                            <li><a href="#">20</a></li>
                                            <li class="next"><a href="#">下一页 &raquo; </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END EXAMPLE TABLE PORTLET-->
                </div>
            </div>
            <!-- END PAGE CONTENT -->
        </div>
    </div>
    <!-- END CONTENT -->
    <!-- BEGIN QUICK SIDEBAR -->
    <a href="javascript:;" class="page-quick-sidebar-toggler"><i class="icon-close"></i></a>
    <!-- END QUICK SIDEBAR -->
</div>
<!-- END CONTAINER -->
<!-- BEGIN FOOTER -->
<div class="page-footer">
    <div class="page-footer-inner">
        2015 &copy; PM by reny.
    </div>
    <div class="page-footer-tools">
		<span class="go-top">
		<i class="fa fa-angle-up"></i>
		</span>
    </div>
</div>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="<%=basePath %>power/assets/global/plugins/respond.min.js"></script>
<![endif]-->
<script src="<%=basePath %>power/assets/global/plugins/jquery-1.11.0.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/jquery-migrate-1.2.1.min.js" type="text/javascript"></script>
<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="<%=basePath %>power/assets/global/plugins/jquery-ui/jquery-ui-1.10.3.custom.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"  type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<%=basePath %>power/assets/global/plugins/jquery.pulsate.min.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/global/plugins/gritter/js/jquery.gritter.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<%=basePath %>power/assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<script src="<%=basePath %>power/assets/admin/pages/scripts/index.js" type="text/javascript"></script>

<script src="<%=basePath %>power/js/common.js" type="text/javascript"></script>
<script src="<%=basePath %>power/js/agent.js" type="text/javascript"></script>
<!-- END JAVASCRIPTS -->

</body>

<!-- END BODY -->
</html>