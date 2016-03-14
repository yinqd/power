<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<HTML>
 <HEAD>
  <TITLE>找药吧后台管理系统</TITLE>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <link rel="stylesheet" href="../jsp/common/css/ztree/zTreeStyle.css" type="text/css">
  <style>
	body {
	background-color: white;
	margin:0; padding:0;
	text-align: center;
	}
	div, p, table, th, td {
		list-style:none;
		margin:0; padding:0;
		color:#333; font-size:12px;
		font-family:dotum, Verdana, Arial, Helvetica, AppleGothic, sans-serif;
	}
	#testIframe {margin-left: 10px;}
	.ztree li span.button.pIcon01_ico_open{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/1_open.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.pIcon01_ico_close{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/1_close.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.pIcon02_ico_open, .ztree li span.button.pIcon02_ico_close{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/2.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.icon01_ico_docu{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/3.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.icon02_ico_docu{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/4.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.icon03_ico_docu{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/5.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.icon04_ico_docu{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/6.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.icon05_ico_docu{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/7.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.icon06_ico_docu{margin-right:2px; background: url(../jsp/common/css/ztree/img/diy/8.png) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}
	</style>
<script type="text/javascript" src="../jsp/common/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="../jsp/common/js/ztree/jquery.ztree.core-3.5.js"></script>
  <SCRIPT type="text/javascript" >
	var zTree;
	var demoIframe;

	var setting = {
		view: {
			dblClickExpand: false,
			showLine: true,
			selectedMulti: false
		},
		data: {
			simpleData: {
				enable:true,
				idKey: "id",
				pIdKey: "pId",
				rootPId: ""
			}
		},
		callback: {
			beforeClick: function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				if (treeNode.isParent) {
					zTree.expandNode(treeNode);
					return false;
				} else {
					demoIframe.attr("src",treeNode.file);
					return true;
				}
			}
		}
	};

	var zNodes =[
		{id:1, pId:0, name:"用户管理", open:true , iconSkin:"pIcon01"},
		{id:11, pId:1, name:"用户管理" , iconSkin:"icon01", file:"../adminuser/searchUserList.action?clientType=5398&t=<%=System.currentTimeMillis()%>"},
		{id:2, pId:0, name:"商家管理" , iconSkin:"pIcon01"},
		{id:21, pId:2, name:"商家信息管理" , iconSkin:"icon02" , file:"../drug/storeListShow.action?clientType=5398&t=<%=System.currentTimeMillis()%>"},
		{id:3, pId:0, name:"药品管理" , iconSkin:"pIcon01"},
		{id:31, pId:3, name:"药品基础信息管理" , iconSkin:"icon03" , file:"../adminuser/goDrugList.action?clientType=5398&t=<%=System.currentTimeMillis()%>"},
		{id:4, pId:0, name:"配送人员管理" , iconSkin:"pIcon01"},
		{id:41, pId:4, name:"配送人员管理" , iconSkin:"icon02" , file:"../delivery/deliveryListShow.action?clientType=5398&t=<%=System.currentTimeMillis()%>"},
		{id:5, pId:0, name:"药厂管理" , iconSkin:"pIcon01"},
		{id:51, pId:5, name:"药厂管理" , iconSkin:"icon02"},
		{id:6, pId:0, name:"系统管理" , iconSkin:"pIcon01"},
		{id:61, pId:6, name:"优惠券管理" , iconSkin:"icon02" , file:"../coupons/couponsListShow.action?clientType=5398&t=<%=System.currentTimeMillis()%>"},
		{id:62, pId:6, name:"用户协议" , iconSkin:"icon02" , file:"../user/userXieYiShow.action?clientType=5398&t=<%=System.currentTimeMillis()%>"}
	];

	$(document).ready(function(){
		$("#body").css("height",($(document).height()));
		var t = $("#tree");
		t = $.fn.zTree.init(t, setting, zNodes);
		demoIframe = $("#testIframe");
		demoIframe.bind("load", loadReady);
		var zTree = $.fn.zTree.getZTreeObj("tree");
		zTree.selectNode(zTree.getNodeByParam("id", 1));
	});

	function loadReady() {
		var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
		htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
		maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
		h = demoIframe.height() >= maxH ? minH:maxH ;
		if (h < 530) h = 530;
		demoIframe.height(h);
	}

  </SCRIPT>
 </HEAD>

<BODY id="body" style="width: 100%;">
<TABLE border=0 align=left width="99%" height="100%">
	<TR>
		<TD width="100%" align=left valign=top colspan="2" height="90px">
		<IFRAME ID="topframe" Name="topIframe" FRAMEBORDER=0 SCROLLING=AUTO width=100%  height="100%" SRC="../jsp/main/top.jsp"></IFRAME>
		</TD>
	</TR>
	<TR>
		<TD width="8%" height="80%" align=left valign=top style="BORDER-RIGHT: #999999 1px dashed">
			<ul id="tree" class="ztree" style="width:260px; overflow:auto;"></ul>
		</TD>
		<TD width="90%" align=left valign=top>
			<IFRAME ID="testIframe" Name="testIframe" FRAMEBORDER=0 SCROLLING=AUTO width=100%  height="100%" SRC=""></IFRAME>
		</TD>
	</TR>
</TABLE>

</BODY>
</HTML>
