package com.tower.req.provides;

import com.tower.req.BaseReq;

public class MenuReq extends BaseReq{
	/*所属模块*/
	private String moduleId;
	/*菜单名称*/
	private String menuName;
	/*菜单等级*/
	private String menuLevel;
	public String getModuleId() {
		return moduleId;
	}
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	public String getMenuName() {
		return menuName;
	}
	public void setMenuName(String menuName) {
		this.menuName = menuName;
	}
	public String getMenuLevel() {
		return menuLevel;
	}
	public void setMenuLevel(String menuLevel) {
		this.menuLevel = menuLevel;
	}
}
