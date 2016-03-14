package com.tower.req.provides;

import java.util.Set;

public class MenuRoleReq {

	/**
	 * 菜单主键
	 */
	private String menuId;
	/**
	 * 角色集合
	 */
	private Set<String> roleSet;
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public Set<String> getRoleSet() {
		return roleSet;
	}
	public void setRoleSet(Set<String> roleSet) {
		this.roleSet = roleSet;
	}
	
}
