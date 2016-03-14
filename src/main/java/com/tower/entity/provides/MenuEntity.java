package com.tower.entity.provides;

import java.util.HashSet;
import java.util.Set;

public class MenuEntity {
	/*c菜单序号*/
	private String menuId;
	/*菜单名称*/
	private String menuName;
	/*菜单链接*/
	private String menuUrl;
	/*菜单等级*/
	private String menuLevel = "1";
	/*入库时间*/
	private String modifyTime;
	/*录入人ID*/
	private String modifyNo;
	/*录入人名字*/
	private String modifyName;
	/*修改时间*/
	private String operTime;
	/*修改人ID*/
	private String operNo;
	/*修改人名字*/
	private String operName;
	/*父菜单主键*/
	private String menuParentId = "0";
	/*父菜单名称*/
	private String menuParentName;
	/*所属模块主键*/
	private String moduleId;
	/*所属模块名称*/
	private String moduleName;
	/*状态*/
	private String statusFlag = "1";
	/* 状态 */
	private String needFlag;
	private Set<String> roles = new HashSet<String>(3);
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
	}
	public String getMenuUrl() {
		return menuUrl;
	}
	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}
	public String getMenuLevel() {
		return menuLevel;
	}
	public void setMenuLevel(String menuLevel) {
		this.menuLevel = menuLevel;
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
	public String getOperTime() {
		return operTime;
	}
	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}
	public String getOperNo() {
		return operNo;
	}
	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}
	public String getMenuParentId() {
		return menuParentId;
	}
	public void setMenuParentId(String menuParentId) {
		this.menuParentId = menuParentId;
	}
	public String getMenuParentName() {
		return menuParentName;
	}
	public void setMenuParentName(String menuParentName) {
		this.menuParentName = menuParentName;
	}
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
	public String getModifyName() {
		return modifyName;
	}
	public void setModifyName(String modifyName) {
		this.modifyName = modifyName;
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
		buffer.append("menuId:【").append(menuId).append("】,");
		buffer.append("menuName:【").append(menuName).append("】,");
		buffer.append("menuUrl:【").append(menuUrl).append("】,");
		buffer.append("menuLevel:【").append(menuLevel).append("】,");
		buffer.append("modifyTime:【").append(modifyTime).append("】,");
		buffer.append("modifyNo:【").append(modifyNo).append("】,");
		buffer.append("modifyName:【").append(modifyName).append("】,");
		buffer.append("operTime:【").append(operTime).append("】,");
		buffer.append("operNo:【").append(operNo).append("】,");
		buffer.append("operName:【").append(operName).append("】,");
		buffer.append("menuParentId:【").append(menuParentId).append("】,");
		buffer.append("menuParentName:【").append(menuParentName).append("】,");
		buffer.append("moduleId:【").append(moduleId).append("】,");
		buffer.append("moduleName:【").append(moduleName).append("】,");
		buffer.append("statusFlag:【").append(statusFlag).append("】,");
		return buffer.toString();
	}
}
