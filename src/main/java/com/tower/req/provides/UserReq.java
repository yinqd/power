package com.tower.req.provides;

import com.tower.req.BaseReq;

public class UserReq extends BaseReq{

	private String nodeNo;
	private String operName;
	public String getNodeNo() {
		return nodeNo;
	}
	public void setNodeNo(String nodeNo) {
		this.nodeNo = nodeNo;
	}
	public String getOperName() {
		return operName;
	}
	public void setOperName(String operName) {
		this.operName = operName;
	}
	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("nodeNo:【").append(nodeNo).append("】,");
		buffer.append("operName:【").append(operName).append("】,");
		buffer.append("pageIndex:【").append(pageIndex).append("】,");
		buffer.append("pageCount:【").append(pageCount).append("】");
		return buffer.toString();
	}
}
