package com.tower.resp.report;

import java.io.Serializable;

public class DlsczReportResp implements Serializable{
	/*日期*/
	private String operateDate;
	/*代理商名称*/
	private String agentName;
	/*充值笔数*/
	private String rechargeCount;
	/*充值数量*/
	private Double rechargePrice;
	public String getOperateDate() {
		return operateDate;
	}
	public void setOperateDate(String operateDate) {
		this.operateDate = operateDate;
	}
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}
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
