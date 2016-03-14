package com.tower.service.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.ButtonRoleEntity;
import com.tower.entity.provides.MenuRoleEntity;
import com.tower.resp.MsgEntity;
import com.tower.resp.provides.ButtonResp;

public interface IButtonRoleService {

	/**
	 * 查询知道菜单所属的角色
	 * @param menuId
	 * @return
	 */
	public List<ButtonRoleEntity> queryButtonRoleList(String buttonId);
	/**
	 * 批量新增菜单角色
	 * @param mrList
	 * @return
	 */
	public MsgEntity beathButtonRole(List<ButtonRoleEntity> mrList);
	/**
	 * 查询当前用户用户当前菜单所能操控的按钮
	 * @param menuId
	 * @param roleSet
	 */
	public List<ButtonResp> queryButtonByRoleAndMenu(@Param("menuId")String menuId , @Param("list")Set<String> roleSet);

}
