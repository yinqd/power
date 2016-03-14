package com.tower.req;

import java.io.Serializable;

public class AgentReq extends BaseReq{
	/*代理商编号*/
	private String agentId;
	/*代理商名称*/
	private String agentName;
	/*联系人*/
	private String agentLinkman;
	/*联系电话*/
	private String agentPhone;
	/*联系人地址*/
	private String agentAddr;
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getAgentName() {
		return agentName;
	}
	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}
	public String getAgentLinkman() {
		return agentLinkman;
	}
	public void setAgentLinkman(String agentLinkman) {
		this.agentLinkman = agentLinkman;
	}
	public String getAgentPhone() {
		return agentPhone;
	}
	public void setAgentPhone(String agentPhone) {
		this.agentPhone = agentPhone;
	}
	public String getAgentAddr() {
		return agentAddr;
	}
	public void setAgentAddr(String agentAddr) {
		this.agentAddr = agentAddr;
	}
	 @Override
    public String toString() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("agentId:【").append(this.agentId).append("】,");
    	buffer.append("agentName:【").append(this.agentName).append("】,");
    	buffer.append("agentLinkman:【").append(this.agentLinkman).append("】,");
    	buffer.append("agentPhone:【").append(this.agentPhone).append("】,");
    	buffer.append("agentAddr:【").append(this.agentAddr).append("】,");
    	buffer.append("pageIndex:【").append(this.pageIndex).append("】,");
    	buffer.append("pageCount:【").append(this.pageCount).append("】");
    	return buffer.toString();
    }
}
