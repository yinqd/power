package com.tower.service.impl.provides;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.tower.dao.provides.IRoleDAO;
import com.tower.entity.provides.RoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.req.provides.RoleReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.BaseService;
import com.tower.service.provides.IRoleService;
@Service("roleService")
public class RoleService extends BaseService implements IRoleService {

	@Resource
	private IRoleDAO roleDAO;
	
	public PageResp queryRolePage(RoleReq req) {
		PageResp pr = new PageResp();
		try {
			pr.setData(roleDAO.queryRoleList(req));
			pr.setRecordCount(roleDAO.queryRoleCount(req));
		} catch (Exception e) {
			logger.error(getMethodPath() + ".error:" + e);
		}
		return pr;
	}

	public List<RoleEntity> queryAllRoleList() {
		return roleDAO.queryAllRoleList();
	}

	public RoleEntity getRole(String roleId) {
		logger.info(getMethodPath() + ".info inner params:roleId=" + roleId);
		if(StringUtils.isNotBlank(roleId)){
			return roleDAO.getRole(roleId);
		}else{
			return new RoleEntity();
		}
		
	}

	public MsgEntity saveRole(RoleEntity roleEntity) {
		MsgEntity msg = new MsgEntity();
		if(roleEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".roleEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + roleEntity);
		try {
			roleEntity.setOperNo(getLoginUserId().toString());
			roleEntity.setModifyNo(getLoginUserId().toString());
			this.roleDAO.saveRole(roleEntity);
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			e.printStackTrace();
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		return msg;
	}

	public MsgEntity updRole(RoleEntity roleEntity) {
		MsgEntity msg = new MsgEntity();
		if(roleEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".roleEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + roleEntity);
		try {
			roleEntity.setOperNo(getLoginUserId().toString());
			roleEntity.setModifyNo(getLoginUserId().toString());
			this.roleDAO.updRole(roleEntity);
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			e.printStackTrace();
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		return msg;
	}

	public MsgEntity delRole(String roleId) {
		logger.info(getMethodPath() + ".info inner params:roleId=" + roleId);
		MsgEntity msg = new MsgEntity();
		try {
			RoleEntity roleEntity = new RoleEntity();
			roleEntity.setOperNo(getLoginUserId().toString());
			roleEntity.setModifyNo(getLoginUserId().toString());
			roleEntity.setRoleId(roleId);
			roleEntity.setStatusFlag("-1");
			roleEntity.setOperNo(getLoginUserId().toString());
			roleEntity.setModifyNo(getLoginUserId().toString());
			this.roleDAO.updRole(roleEntity);
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			e.printStackTrace();
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		
		return msg;
	}

}
