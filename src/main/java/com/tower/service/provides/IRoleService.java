package com.tower.service.provides;

import java.util.List;
import com.tower.entity.provides.RoleEntity;
import com.tower.req.provides.RoleReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;

public interface IRoleService {
	/**
	 * 分页查询所有角色
	 * @param req
	 * @return
	 */
	public PageResp queryRolePage(RoleReq req);
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
	public RoleEntity getRole(String roleId);
	/**
	 * 新增权限
	 * @param roleEntity
	 */
	public MsgEntity saveRole(RoleEntity roleEntity);
	/**
	 * 更新权限
	 * @param roleEntity
	 */
	public MsgEntity updRole(RoleEntity roleEntity);
	/**
	 * 删除权限
	 * @param roleEntity
	 */
	public MsgEntity delRole(String roleId);

}
