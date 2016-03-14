package com.tower.dao.provides;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.RoleEntity;
import com.tower.req.provides.RoleReq;

/**
 * 角色操作接口
 * @author my
 *
 */
public interface IRoleDAO {

	/**
	 * 分页查询所有角色
	 * @param req
	 * @return
	 */
	public List<RoleEntity> queryRoleList(RoleReq req);
	/**
	 * 查询角色数量
	 * @param req
	 * @return
	 */
	public Integer queryRoleCount(RoleReq req);
	/**
	 * 查询所有角色
	 * @param req
	 * @return
	 */
	public List<RoleEntity> queryAllRoleList();
	/**
	 * 获得权限
	 * @param roleId
	 * @return
	 */
	public RoleEntity getRole(@Param("roleId")String roleId);
	/**
	 * 新增权限
	 * @param roleEntity
	 */
	public void saveRole(RoleEntity roleEntity);
	/**
	 * 更新权限
	 * @param roleEntity
	 */
	public void updRole(RoleEntity roleEntity);
}
