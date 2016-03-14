package com.tower.entity.provides;

import com.tower.entity.BaseEntity;

public class ButtonRoleEntity extends BaseEntity{
	/*按钮主键*/
	private String buttonId;
	/*角色主键*/
	private String roleId;
	/*角色名称*/
	private String roleName;
	/*状态*/
	private String statusFlag;
	public String getButtonId() {
		return buttonId;
	}
	public void setButtonId(String buttonId) {
		this.buttonId = buttonId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getStatusFlag() {
		return statusFlag;
	}
	public void setStatusFlag(String statusFlag) {
		this.statusFlag = statusFlag;
	}
	
}
