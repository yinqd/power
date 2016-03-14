package com.tower.req;

public class LoginReq {
	/*操作人员名称*/
	private String operName;
	/*操作人员编号*/
	private String operNo;
	/*密码*/
	private String operPsd;
	
	public String getOperName() {
		return operName;
	}
	public void setOperName(String operName) {
		this.operName = operName;
	}
	public String getOperNo() {
		return operNo;
	}
	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}
	public String getOperPsd() {
		return operPsd;
	}
	public void setOperPsd(String operPsd) {
		this.operPsd = operPsd;
	}
}
