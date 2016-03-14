package com.tower.service.provides;

import java.util.List;
import java.util.Set;

import com.tower.entity.provides.MenuEntity;
import com.tower.req.provides.MenuReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.resp.provides.MenuResp;

/**
 * 菜单Service
 * @author my
 *
 */
public interface IMenuService {

	/**
	 * 分页查询菜单
	 * @param req
	 * @return
	 */
	public PageResp queryMenuPage(MenuReq req);
	/**
	 * 新增菜单
	 * @param menuEntity
	 * @return
	 */
	public MsgEntity saveMenu(MenuEntity menuEntity);
	/**
	 * 更新菜单
	 * @param menuEntity
	 * @return
	 */
	public MsgEntity updMenu(MenuEntity menuEntity);
	
	/**
	 * 更新菜单
	 * @param menuEntity
	 * @return
	 */
	public MsgEntity delMenu(String menuId);
	/**
	 * 查询获取所有的一级菜单
	 */
	public List<MenuResp> queryOneMenuList();
	/**
	 * 获取指定的菜单
	 * @param menuId
	 * @return
	 */
	public MenuEntity getMenu(String menuId);
	/**
	 * 获取指定Url的菜单
	 * @param menuId
	 * @return
	 */
	public MenuEntity getMenuByUrl(String menuUrl);
	/**
	 * 根据链接和权限获取菜单
	 * @param menuUrl
	 * @param roles
	 * @return
	 */
	public Integer getMenuByIdAndRole (String menuId , Set<String> roles);
}
