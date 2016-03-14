package com.tower.req.provides;

import com.tower.req.BaseReq;
/**
 * 按钮入参接收类
 * @author my
 *
 */
public class ButtonReq extends BaseReq{

	/**
	 * 菜单主键
	 */
	private String menuId;

	public String getMenuId() {
		return menuId;
	}

	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	
}
