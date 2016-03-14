package com.tower.entity.provides;

import java.util.HashSet;
import java.util.Set;

public class ModuleEntity {
	/*模块序号*/
	private String moduleId;
	/*模块名称*/
	private String moduleName;
	/*模块链接*/
	private String moduleUrl;
	/*入库时间*/
	private String modifyTime;
	/*入库人*/
	private String modifyNo;
	/*入库人名字*/
	private String modifyName;
	/*更新时间*/
	private String operTime;
	/*更新人*/
	private String operNo;
	/*更新人名*/
	private String operName;
	private String statusFlag ;
	/* 状态 */
	private String needFlag;
	private Set<String> roles = new HashSet<String>(3);
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public String getModuleUrl() {
		return moduleUrl;
	}
	public void setModuleUrl(String moduleUrl) {
		this.moduleUrl = moduleUrl;
	}
	public String getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	public String getModifyNo() {
		return modifyNo;
	}
	public void setModifyNo(String modifyNo) {
		this.modifyNo = modifyNo;
	}
	public String getModifyName() {
		return modifyName;
	}
	public void setModifyName(String modifyName) {
		this.modifyName = modifyName;
	}
	public String getOperTime() {
		return operTime;
	}
	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}
	public String getOperNo() {
		return operNo;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}
	public String getOperName() {
		return operName;
	}
	public void setOperName(String operName) {
		this.operName = operName;
	}
	public String getStatusFlag() {
		return statusFlag;
	}
	public void setStatusFlag(String statusFlag) {
		this.statusFlag = statusFlag;
	}
	public void setNeedFlag(String needFlag) {
		this.needFlag = needFlag;
	}
	public String getNeedFlag() {
		return needFlag;
	}
	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("moduleId:【").append(moduleId).append("】,");
		buffer.append("moduleName:【").append(moduleName).append("】,");
		buffer.append("moduleUrl:【").append(moduleUrl).append("】,");
		buffer.append("modifyTime:【").append(modifyTime).append("】,");
		buffer.append("modifyNo:【").append(modifyNo).append("】,");
		buffer.append("modifyName:【").append(modifyName).append("】,");
		buffer.append("operTime:【").append(operTime).append("】,");
		buffer.append("operNo:【").append(operNo).append("】,");
		buffer.append("operName:【").append(operName).append("】,");
		return buffer.toString();
	}
}
