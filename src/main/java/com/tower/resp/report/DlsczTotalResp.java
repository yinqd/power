package com.tower.resp.report;

import java.io.Serializable;

public class DlsczTotalResp implements Serializable{
	/*充值笔数*/
	private String rechargeCount;
	/*充值数量*/
	private Double rechargePrice;
	
	public String getRechargeCount() {
		return rechargeCount;
	}
	public void setRechargeCount(String rechargeCount) {
		this.rechargeCount = rechargeCount;
	}
	public Double getRechargePrice() {
		return rechargePrice;
	}
	public void setRechargePrice(Double rechargePrice) {
		this.rechargePrice = rechargePrice;
	} 
}
