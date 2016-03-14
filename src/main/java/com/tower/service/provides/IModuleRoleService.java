package com.tower.service.provides;

import java.util.List;
import java.util.Set;

import com.tower.entity.provides.ModuleRoleEntity;
import com.tower.resp.MsgEntity;
import com.tower.resp.provides.ModuleResp;

public interface IModuleRoleService {
	/**
	 * 查询知道菜单所属的角色
	 * @param ModuleId
	 * @return
	 */
	public List<ModuleRoleEntity> queryModuleRoleList(String moduleId);
	/**
	 * 批量新增菜单角色
	 * @param mrList
	 * @return
	 */
	public MsgEntity beathModuleRole(List<ModuleRoleEntity> mrList);
	/**
	 * 查询用户角色所能访问的角色
	 * @param roleIdSet
	 * @return
	 */
	public List<ModuleResp> queryModuleByRoleId(Set<String> roleIdSet);
}
