package com.tower.service.provides;

import java.util.List;
import java.util.Set;

import com.tower.entity.provides.MenuRoleEntity;
import com.tower.resp.MsgEntity;
import com.tower.resp.provides.MenuResp;

public interface IMenuRoleService {

	/**
	 * 查询知道菜单所属的角色
	 * @param menuId
	 * @return
	 */
	public List<MenuRoleEntity> queryMenuRoleList(String menuId);
	/**
	 * 批量新增菜单角色
	 * @param mrList
	 * @return
	 */
	public MsgEntity beathMenuRole(List<MenuRoleEntity> mrList);
	/**
	 * 查询用户角色所能访问的角色
	 * @param roleIdSet
	 * @return
	 */
	public List<MenuResp> queryMenuByRoleId(Set<String> roleIdSet);
	/**
	 * 查询用户角色所能访问当前模块下的角色
	 * @param roleIdSet
	 * @return
	 */
	public List<MenuResp> queryMenuByRoleAndModule(Set<String> roleIdSet , String moduleId);
}
