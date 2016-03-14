package com.tower.req;

public class TerminalReq extends BaseReq{

	/*终端序列号*/
	private String terminalId;
	/*终端名称*/
	private String terminalName;
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
	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("terminalId:【").append(terminalId).append("】  , ");
		buffer.append("terminalName:【").append(terminalName).append("】  , ");
		buffer.append("pageIndex:【").append(pageIndex).append("】  , ");
		buffer.append("pageCount:【").append(pageCount).append("】  , ");
		return buffer.toString();
	}
}
