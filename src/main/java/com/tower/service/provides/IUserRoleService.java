package com.tower.service.provides;

import java.util.List;
import java.util.Set;

import com.tower.entity.provides.UserRoleEntity;
import com.tower.resp.MsgEntity;

public interface IUserRoleService {
	/**
	 * 查询知道用户所属的角色
	 * @param UserId
	 * @return
	 */
	public List<UserRoleEntity> queryUserRoleList(String userId);
	/**
	 * 批量新增用户角色
	 * @param mrList
	 * @return
	 */
	public MsgEntity beathUserRole(List<UserRoleEntity> urList);
	/**
	 * 查询用户角色所能访问的角色
	 * @param roleIdSet
	 * @return
	 */
	public Set<String> queryRoleByUser(String userId);
}
