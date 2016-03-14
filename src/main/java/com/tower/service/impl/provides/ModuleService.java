package com.tower.service.impl.provides;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IModuleDAO;
import com.tower.dao.provides.IModuleRoleDAO;
import com.tower.entity.provides.ModuleEntity;
import com.tower.entity.provides.ModuleRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.resp.MsgEntity;
import com.tower.service.BaseService;
import com.tower.service.provides.IModuleRoleService;
import com.tower.service.provides.IModuleService;
@Service
public class ModuleService extends BaseService implements IModuleService{

	@Resource
	private IModuleDAO moduleDAO;
	@Resource
	private IModuleRoleDAO moduleRoleDAO;
	@Resource
	private IModuleRoleService moduleRoleService;
	/**
	 * 
	 */
	public List<ModuleEntity> queryModuleList() {
		return moduleDAO.queryModuleList();
	}

	public ModuleEntity getModule(String moduleId) {
		logger.info(getMethodPath() + ".INNFO INNER PARAMS : moduleId=" + moduleId); 
		return moduleDAO.getModule(moduleId);
	}

	public MsgEntity saveModule(ModuleEntity moduleEntity) {
		MsgEntity msg = new MsgEntity();
		if(moduleEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".moduleEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + moduleEntity);
		try {
			Long moduleId = System.nanoTime();
			moduleEntity.setModuleId(moduleId.toString());
			moduleEntity.setModifyNo(getLoginUserId().toString());
			moduleEntity.setOperNo(getLoginUserId().toString());
			this.moduleDAO.saveModule(moduleEntity);
			
			/*新增模块权限*/
			if(!CollectionUtils.isEmpty(moduleEntity.getRoles())){
				List<ModuleRoleEntity> menuRoles = new ArrayList<ModuleRoleEntity>(2);
				ModuleRoleEntity moduleRole;
				for(Iterator<String> it = moduleEntity.getRoles().iterator() ; it.hasNext();){
					moduleRole = new ModuleRoleEntity();
					moduleRole.setModuleId(moduleId.toString());
					moduleRole.setRoleId(it.next());
					moduleRole.setStatusFlag("1");
					menuRoles.add(moduleRole);
				}
				
				moduleRoleDAO.beathModuleRole(menuRoles);
			}
			
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

	public MsgEntity updModule(ModuleEntity moduleEntity) {
		MsgEntity msg = new MsgEntity();
		if(moduleEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".moduleEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + moduleEntity);
		try {
			moduleEntity.setModifyNo(getLoginUserId().toString());
			moduleEntity.setOperNo(getLoginUserId().toString());
			this.moduleDAO.updModule(moduleEntity);
			
			/*修改模块权限*/
			if(!CollectionUtils.isEmpty(moduleEntity.getRoles())){
				List<ModuleRoleEntity> menuRoles = new ArrayList<ModuleRoleEntity>(2);
				ModuleRoleEntity moduleRole;
				for(Iterator<String> it = moduleEntity.getRoles().iterator() ; it.hasNext();){
					moduleRole = new ModuleRoleEntity();
					moduleRole.setModuleId(moduleEntity.getModuleId());
					moduleRole.setRoleId(it.next());
					moduleRole.setStatusFlag("1");
					menuRoles.add(moduleRole);
				}
				
				moduleRoleService.beathModuleRole(menuRoles);
			}
			
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

	public MsgEntity delModule(String moduleId) {
		logger.info(getMethodPath() + ".INNFO INNER PARAMS : moduleId=" + moduleId); 
		ModuleEntity moduleEntity = new ModuleEntity();
		moduleEntity.setModuleId(moduleId);
		moduleEntity.setStatusFlag("-1");
		moduleEntity.setOperNo(getLoginUserId().toString());
		return updModule(moduleEntity);
	}

	public ModuleEntity getModuleByUrl(String moduleUrl) {
		return moduleDAO.getModuleByUrl(moduleUrl);
	}

	public Integer getModuleByIdAndRole(String moduleId,
			Set<String> roles) {
		return moduleDAO.getModuleByIdAndRole(moduleId, roles);
	}

}
