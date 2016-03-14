package com.tower.entity.provides;

import com.tower.entity.BaseEntity;

public class MenuRoleEntity extends BaseEntity{

	/*菜单主键*/
	private String menuId;
	/*角色主键*/
	private String roleId;
	/*角色主键*/
	private String roleName;
	private String statusFlag;
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
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
