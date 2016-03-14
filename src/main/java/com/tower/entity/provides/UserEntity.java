package com.tower.entity.provides;

import java.util.HashSet;
import java.util.Set;

import com.tower.entity.BaseEntity;

public class UserEntity extends BaseEntity{
	private String operName = null;
	private String operNo = null;
	private String operPsd = null;
	private String operState = "1";
	private String operStationno = null;
	private String operPurview = null;
	private String operRemark = null;
	private String operDate = null;
	private Integer upFlag = 0;
	private String upDate = null;
	private Set<String> roles = new HashSet<String>(3);
	private String operStationname ;
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
	public void setOperPsd(String operPsd) {
		this.operPsd = operPsd;
	}
	public void setOperState(String operState) {
		this.operState = operState;
	}
	public void setOperStationno(String operStationno) {
		this.operStationno = operStationno;
	}
	public void setOperPurview(String operPurview) {
		this.operPurview = operPurview;
	}
	public void setOperRemark(String operRemark) {
		this.operRemark = operRemark;
	}
	public void setOperDate(String operDate) {
		this.operDate = operDate;
	}
	public void setUpFlag(Integer upFlag) {
		this.upFlag = upFlag;
	}
	public void setUpDate(String upDate) {
		this.upDate = upDate;
	}
	public String getOperPsd() {
		return operPsd;
	}
	public String getOperState() {
		return operState;
	}
	public String getOperStationno() {
		return operStationno;
	}
	public String getOperPurview() {
		return operPurview;
	}
	public String getOperRemark() {
		return operRemark;
	}
	public String getOperDate() {
		return operDate;
	}
	public Integer getUpFlag() {
		return upFlag;
	}
	public String getUpDate() {
		return upDate;
	}
	public String getOperStationname() {
		return operStationname;
	}
	public void setOperStationname(String operStationname) {
		this.operStationname = operStationname;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("operName:【").append(operName).append("】,");
		buffer.append("operNo:【").append(operNo).append("】,");
		buffer.append("operPsd:【").append(operPsd).append("】,");
		buffer.append("operState:【").append(operState).append("】,");
		buffer.append("operStationno:【").append(operStationno).append("】,");
		buffer.append("operPurview:【").append(operPurview).append("】,");
		buffer.append("operRemark:【").append(operRemark).append("】,");
		buffer.append("operDate:【").append(operDate).append("】,");
		buffer.append("upFlag:【").append(upFlag).append("】,");
		buffer.append("upDate:【").append(upDate).append("】,");
		return buffer.toString();
	}
	
}
