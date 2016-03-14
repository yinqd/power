package com.tower.entity.provides;

import java.util.HashSet;
import java.util.Set;

import com.tower.entity.BaseEntity;
/**
 * 按钮对象
 * @author my
 *
 */
public class ButtonEntity extends BaseEntity{
	/* 按钮主键 */
	private String buttonId;
	/* 按钮标签属性 */
	private String buttonTagAttr;
	/* 按钮Value属性 */
	private String buttonValueAttr;
	/* 按钮Name属性 */
	private String buttonNameAttr;
	/* 按钮所属菜单主键 */
	private String menuId;
	/* 按钮所属菜单名称 */
	private String menuName;
	/* 录入时间 */
	private String modifyTime;
	/* 录入人 */
	private String modifyNo;
	/* 更新时间 */
	private String operTime;
	/* 更新主键 */
	private String operNo;
	/* 状态 */
	private String statusFlag;
	/* 是否需要权限管理 */
	private String needFlag;
	/* 按钮的角色 */
	private Set<String> roles = new HashSet<String>(2);
	public String getButtonId() {
		return buttonId;
	}
	public void setButtonId(String buttonId) {
		this.buttonId = buttonId;
	}
	public String getButtonTagAttr() {
		return buttonTagAttr;
	}
	public void setButtonTagAttr(String buttonTagAttr) {
		this.buttonTagAttr = buttonTagAttr;
	}
	public String getButtonValueAttr() {
		return buttonValueAttr;
	}
	public void setButtonValueAttr(String buttonValueAttr) {
		this.buttonValueAttr = buttonValueAttr;
	}
	public String getButtonNameAttr() {
		return buttonNameAttr;
	}
	public void setButtonNameAttr(String buttonNameAttr) {
		this.buttonNameAttr = buttonNameAttr;
	}
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
	public Set<String> getRoles() {
		return roles;
	}
	public void setRoles(Set<String> roles) {
		this.roles = roles;
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
}
