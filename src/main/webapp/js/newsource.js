/**来源公用js */
//订单来源
function orderSource(obj){
	var str="";
	if(obj==1){
		str="android";
	}else if(obj==2){
		str="ios";
	}else if(obj==3){
		str="微信";
	}else if(obj==4){
		str="百度外卖";
	}else if(obj==5){
		str="百度直达号";
	}else if(obj==6){
		str="百度糯米";
	}else if(obj==7){
		str="百度地图";
	}else if(obj==8){
		str="呼叫中心";
	}else if(obj==9){
		str="自助终端";
	}else if(obj==10){
		str="商户收银终端";
	}else if(obj==11){
		str="商户官网";
	}
	return str;
}
//交付方式
function deliverytype(obj){
 var str="";
 if(obj==1){
	 str="内用";
 }else if(obj==2){
	 str="外送";
 }else if(obj==3){
	 str="自提";
 }else if(obj==4){
	 str="外带";
 }
	return str;
}
//交易类型
function tradetype(obj){
	var str="";
	if(obj==1){
		str="销货单";
	}else if (obj==2) {
		str="退货单";
	}
	return str;
}