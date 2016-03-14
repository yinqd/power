/**来源公用js */
//订单来源
function orderSource(obj){
	var str="";
	if(obj==20){
		str="未知";
	}else if(obj==21){
		str="代订";
	}else if(obj==22){
		str="到店";
	}else if(obj==23){
		str="大众点评";
	}else if(obj==24){
		str="美团";
	}else if(obj==25){
		str="百度糯米";
	}else if(obj==26){
		str="微信";
	}else if(obj==27){
		str="订餐小秘书";
	}else if(obj==28){
		str="找位";
	}else if(obj==29){
		str="手机";
	}else if(obj==30){
		str="电话";
	}else if(obj==31){
		str="淘点点";
	}else if(obj==32){
		str="百度地图";
	}else if(obj==33){
		str="百度直达号";
	}else if(obj==34){
		str="百度";
	}else if(obj==35){
		str="Enjoy";
	}else if(obj==36){
		str="自助";
	}else if(obj==37){
		str="支付宝";
	}else if(obj==38){
		str="商户官网";
	}else if(obj==39){
		str="百度外卖";
	}else if(obj==40){
		str="电话";
	}else if(obj==41){
		str="到店取号";
	}else if(obj==42){
		str="App取号";
	}else if(obj==43){
		str="百度取号";
	}
	return str;
}
//客户来源
function customerSource(obj){
 var str="";
 if(obj==0){
	 str="未知";
 }else if(obj==1){
	 str="Pad";
 }else if(obj==2){
	 str="手机app";
 }else if(obj==3){
	 str="其它系统";
 }else if(obj==4){
	 str="微信";
 }else if(obj==5){
	 str="支付宝";
 }else if(obj==6){
	 str="商户官网";
 }else if(obj==7){
	 str="百度";
 }else if(obj==8){
	 str="后台";
 }
	return str;
}
