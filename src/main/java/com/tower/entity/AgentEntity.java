package com.tower.entity;

public class AgentEntity {
	private String agentId;
	private String agentName;
	private String agentLinkman;
	private String agentPhone;
	private String agentAddr;
	private String agentFlag;
	private String operateDate;
	private String operateId;
	private String remark;
	private String modifyTime;
	private String bk1;
	private String bk2;
	private String bk3;
	private String nodeNo;

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

	public String getAgentFlag() {
		return agentFlag;
	}

	public void setAgentFlag(String agentFlag) {
		this.agentFlag = agentFlag;
	}

	public String getOperateDate() {
		return operateDate;
	}

	public void setOperateDate(String operateDate) {
		this.operateDate = operateDate;
	}

	public String getOperateId() {
		return operateId;
	}

	public void setOperateId(String operateId) {
		this.operateId = operateId;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getModifyTime() {
		return modifyTime;
	}

	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}

	public String getBk1() {
		return bk1;
	}

	public void setBk1(String bk1) {
		this.bk1 = bk1;
	}

	public String getBk2() {
		return bk2;
	}

	public void setBk2(String bk2) {
		this.bk2 = bk2;
	}

	public String getBk3() {
		return bk3;
	}

	public void setBk3(String bk3) {
		this.bk3 = bk3;
	}

	public String getNodeNo() {
		return nodeNo;
	}

	public void setNodeNo(String nodeNo) {
		this.nodeNo = nodeNo;
	}
	@Override
    public String toString() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("agentId:【").append(this.agentId).append("】,");
    	buffer.append("agentName:【").append(this.agentName).append("】,");
    	buffer.append("agentLinkman:【").append(this.agentLinkman).append("】,");
    	buffer.append("agentPhone:【").append(this.agentPhone).append("】,");
    	buffer.append("agentAddr:【").append(this.agentAddr).append("】,");
    	buffer.append("agentFlag:【").append(this.agentFlag).append("】,");
    	buffer.append("operateDate:【").append(this.operateDate).append("】,");
    	buffer.append("operateId:【").append(this.operateId).append("】,");
    	buffer.append("remark:【").append(this.remark).append("】,");
    	buffer.append("modifyTime:【").append(this.modifyTime).append("】,");
    	buffer.append("nodeNo:【").append(this.nodeNo).append("】");
    	return buffer.toString();
    }
}
