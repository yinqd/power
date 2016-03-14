package com.tower.entity;

public class TerminalEntity {
	  /*终端编号*/
	  private String terminalGuid;
	  /*终端序列号*/
	  private String terminalId;
	  /*终端名称*/
	  private String terminalName;
	  /*所属网点*/
	  private String nodeNo;
	  /*所属代理商*/
	  private String agentId;
	  /*停用标识  0：停用 1：正常*/
	  private String closeFlag;
	  /*终端类型  1：POS 2：ATM*/
	  private String terminalType;
	  /*设备的MAC码*/
	  private String terminalMac;
	  /*设备的IP码*/
	  private String terminalIp;
	  /*更新时间*/
	  private String modifyTime;
	  /*创建时间*/
	  private String createTime;
	  /**/
	  private String bk1;
	  /**/
	  private String bk2;
	  /**/
	  private String bk3;
	public String getTerminalGuid() {
		return terminalGuid;
	}
	public void setTerminalGuid(String terminalGuid) {
		this.terminalGuid = terminalGuid;
	}
	public String getTerminalId() {
		return terminalId;
	}
	public void setTerminalId(String terminalId) {
		this.terminalId = terminalId;
	}
	public String getTerminalName() {
		return terminalName;
	}
	public void setTerminalName(String terminalName) {
		this.terminalName = terminalName;
	}
	public String getNodeNo() {
		return nodeNo;
	}
	public void setNodeNo(String nodeNo) {
		this.nodeNo = nodeNo;
	}
	public String getAgentId() {
		return agentId;
	}
	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	public String getCloseFlag() {
		return closeFlag;
	}
	public void setCloseFlag(String closeFlag) {
		this.closeFlag = closeFlag;
	}
	public String getTerminalType() {
		return terminalType;
	}
	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}
	public String getTerminalMac() {
		return terminalMac;
	}
	public void setTerminalMac(String terminalMac) {
		this.terminalMac = terminalMac;
	}
	public String getTerminalIp() {
		return terminalIp;
	}
	public void setTerminalIp(String terminalIp) {
		this.terminalIp = terminalIp;
	}
	public String getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	public String getCreateTime() {
		return createTime;
	}
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
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
	@Override
    public String toString() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("terminalGuid:【").append(this.terminalGuid).append("】,");
    	buffer.append("terminalId:【").append(this.terminalId).append("】,");
    	buffer.append("terminalName:【").append(this.terminalName).append("】,");
    	buffer.append("nodeNo:【").append(this.nodeNo).append("】,");
    	buffer.append("agentId:【").append(this.agentId).append("】,");
    	buffer.append("closeFlag:【").append(this.closeFlag).append("】,");
    	buffer.append("terminalType:【").append(this.terminalType).append("】,");
    	buffer.append("terminalMac:【").append(this.terminalMac).append("】,");
    	buffer.append("terminalIp:【").append(this.terminalIp).append("】,");
    	buffer.append("modifyTime:【").append(this.modifyTime).append("】,");
    	buffer.append("createTime:【").append(this.createTime).append("】");
    	return buffer.toString();
    }
}
