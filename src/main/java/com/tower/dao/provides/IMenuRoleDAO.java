package com.tower.dao.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.MenuRoleEntity;
import com.tower.resp.provides.MenuResp;

public interface IMenuRoleDAO {
	/**
	 * 查询指定菜单归属的角色
	 * @param menuId
	 * @return
	 */
	public List<MenuRoleEntity> queryMenuRoleList(@Param("menuId")String menuId);
	/**
	 * 批量提交菜单角色
	 * @param list
	 */
	public void beathMenuRole(List<MenuRoleEntity> list);
	/**
	 * 删除指定菜单指定角色的记录
	 * @param menuId
	 * @param roleIdList
	 */
	public void delMenuRole(@Param("menuId")String menuId , @Param("list")Set<String> roleIdList);
	/**
	 * 查询操作人员角色所能操作的菜单
	 * @param roleIdList
	 * @return
	 */
	public List<MenuResp> queryMenuByRole(@Param("list")Set<String> roleIdList);
	
	/**
	 * 查询操作人员角色所能操作的菜单
	 * @param roleIdList
	 * @return
	 */
	public List<MenuResp> queryMenuByRoleAndModule(@Param("list")Set<String> roleIdList , @Param("moduleId")String moduleId);
}
