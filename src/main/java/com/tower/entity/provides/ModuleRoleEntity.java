package com.tower.entity.provides;

import com.tower.entity.BaseEntity;

public class ModuleRoleEntity extends BaseEntity{
	/*模块主键*/
	private String moduleId;
	/*角色主键*/
	private String roleId;
	/*状态*/
	private String statusFlag;
	/*角色名称*/
	private String roleName;
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getStatusFlag() {
		return statusFlag;
	}
	public void setStatusFlag(String statusFlag) {
		this.statusFlag = statusFlag;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
}
