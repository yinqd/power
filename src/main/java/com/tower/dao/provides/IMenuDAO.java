package com.tower.dao.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.MenuEntity;
import com.tower.req.provides.MenuReq;
import com.tower.resp.provides.MenuResp;
/**
 * 菜单操作DAO
 * @author my
 *
 */
public interface IMenuDAO {
	/**
	 * 分页查询菜单
	 * @param req
	 * @return
	 */
	public List<MenuEntity> queryMenuList(MenuReq req);
	/**
	 * 查询菜单数量
	 * @param req
	 * @return
	 */
	public Integer queryMenuCount(MenuReq req);
	/**
	 * 查询获取所有的一级菜单
	 */
	public List<MenuResp> queryOneMenuList();
	/**
	 * 获取指定的菜单
	 * @param menuId
	 * @return
	 */
	public MenuEntity getMenu(@Param("menuId")String menuId);
	
	/**
	 * 获取指定的菜单
	 * @param menuId
	 * @return
	 */
	public List<MenuEntity> getMenuByUrlAndRole(@Param("menuUrl")String menuUrl , Set<String> roles);
	/**
	 * 新增菜单
	 * @param menuEntity
	 */
	public void saveMenu(MenuEntity menuEntity);
	/**
	 * 更新菜单
	 * @param menuEntity
	 */
	public void updateMenu(MenuEntity menuEntity);
}
