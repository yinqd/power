package com.tower.entity.provides;

import com.tower.entity.BaseEntity;

public class UserRoleEntity extends BaseEntity{

	/*菜单主键*/
	private String userId;
	/*角色主键*/
	private String roleId;
	/*角色主键*/
	private String roleName;
	private String statusFlag;
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
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
