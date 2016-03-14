package com.tower.dao.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.ModuleRoleEntity;
import com.tower.resp.provides.ModuleResp;

public interface IModuleRoleDAO {
	/**
	 * 查询指定菜单归属的角色
	 * @param ModuleId
	 * @return
	 */
	public List<ModuleRoleEntity> queryModuleRoleList(@Param("moduleId")String moduleId);
	/**
	 * 批量提交菜单角色
	 * @param list
	 */
	public void beathModuleRole(List<ModuleRoleEntity> list);
	/**
	 * 删除指定菜单指定角色的记录
	 * @param ModuleId
	 * @param roleIdList
	 */
	public void delModuleRole(@Param("moduleId")String moduleId , @Param("list")Set<String> roleIdList);
	/**
	 * 查询操作人员角色所能操作的菜单
	 * @param roleIdList
	 * @return
	 */
	public List<ModuleResp> queryModuleByRole(@Param("list")Set<String> roleIdList);
}
