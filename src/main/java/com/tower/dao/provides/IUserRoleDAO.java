package com.tower.dao.provides;

import java.util.List;
import java.util.Set;

import com.tower.entity.provides.UserRoleEntity;

public interface IUserRoleDAO {
	/**
	 * 查询用户的角色
	 * @param userId
	 * @return
	 */
	public List<UserRoleEntity> queryUserRoleList(String userId);
	/**
	 * 批量新增用户角色
	 * @param urList
	 */
	public void beathUserRole(List<UserRoleEntity> urList);
	/**
	 * 删除用户角色
	 * @param userId
	 * @param roleSet
	 */
	public void delUserRole(String userId , Set<String> roleSet);
	/**
	 * 查询用户角色
	 * @param userId
	 * @return
	 */
	public Set<String> queryRoleByUser(String userId);
}
