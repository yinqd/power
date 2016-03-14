package com.tower.resp;

import java.io.Serializable;

public class UserResp  implements Serializable{
	private String operName = null;
	private String operNo = null;
	private String operStationno = null;
	private String operStationname = null;
	
	public String getOperName() {
		return operName;
	}
	public String getOperNo() {
		return operNo;
	}
	public void setOperName(String operName) {
		this.operName = operName;
	}
	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}
	public void setOperStationno(String operStationno) {
		this.operStationno = operStationno;
	}
	public void setOperStationname(String operStationname) {
		this.operStationname = operStationname;
	}
	public String getOperStationno() {
		return operStationno;
	}
	public String getOperStationname() {
		return operStationname;
	}
}
