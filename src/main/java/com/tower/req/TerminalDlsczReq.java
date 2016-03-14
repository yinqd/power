package com.tower.req;

public class TerminalDlsczReq extends BaseReq{

	private String agentId;

	public String getAgentId() {
		return agentId;
	}

	public void setAgentId(String agentId) {
		this.agentId = agentId;
	}
	
	@Override
	public String toString() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("agentId:【").append(this.agentId).append("】,");
    	buffer.append("pageIndex:【").append(this.pageIndex).append("】,");
    	buffer.append("pageCount:【").append(this.pageCount).append("】");
    	return buffer.toString();
	}
}
