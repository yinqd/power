package com.tower.dao.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.ButtonRoleEntity;
import com.tower.resp.provides.ButtonResp;

public interface IButtonRoleDAO {

	/**
	 * 查询按钮角色
	 * @return
	 */
	public List<ButtonRoleEntity> queryButtonRoleList(@Param("buttonId")String buttonId);
	/**
	 * 批量新增按钮
	 * @param buttonRoleList
	 */
	public void batchButtonRole(@Param("list")List<ButtonRoleEntity> buttonRoleList);
	/**
	 * 批量删除按钮权限
	 * @param buttonId
	 * @param roles
	 */
	public void delButtonRole(@Param("buttonId")String buttonId , @Param("list")Set<String> roles);
	/**
	 * 查询当前用户用户当前菜单所能操控的按钮
	 * @param menuId
	 * @param roleSet
	 */
	public List<ButtonResp> queryButtonByRoleAndMenu(@Param("menuId")String menuId , @Param("list")Set<String> roleSet);
}
