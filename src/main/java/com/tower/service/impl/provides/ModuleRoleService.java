package com.tower.service.impl.provides;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IModuleRoleDAO;
import com.tower.entity.provides.ModuleRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.resp.MsgEntity;
import com.tower.resp.provides.ModuleResp;
import com.tower.service.BaseService;
import com.tower.service.provides.IModuleRoleService;
@Service("moduleRoleService")
public class ModuleRoleService extends BaseService implements IModuleRoleService{

	@Resource
	private IModuleRoleDAO moduleRoleDAO;
	
	public List<ModuleRoleEntity> queryModuleRoleList(String moduleId) {
		if(StringUtils.isNotBlank(moduleId)){
			return moduleRoleDAO.queryModuleRoleList(moduleId);
		}
		return new ArrayList<ModuleRoleEntity>();
	}

	public MsgEntity beathModuleRole(List<ModuleRoleEntity> mrList) {
		MsgEntity msg = new MsgEntity();
		msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		if(CollectionUtils.isEmpty(mrList)){
			logger.info(getMethodPath() + ".Info inner param is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info inner param mrList.size" + mrList.size());
		
		try {
			String moduleId = mrList.get(0).getModuleId();
			/*获取当前模块说包含的模块角色*/
			List<ModuleRoleEntity> dbList = moduleRoleDAO.queryModuleRoleList(moduleId);
			
			if(CollectionUtils.isEmpty(dbList)){
			}else{
				for (Iterator<ModuleRoleEntity> it = mrList.iterator(); it.hasNext(); ) {
					ModuleRoleEntity mr = it.next();
					for (Iterator<ModuleRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
						ModuleRoleEntity db = dbIt.next();
						if(mr.getRoleId().equals(db.getRoleId())){
							it.remove();
							dbIt.remove();
							break;
						}
					}
				}
			}
			logger.info(getMethodPath() + "新增数量：" + mrList.size());
			if(!CollectionUtils.isEmpty(mrList)){
				moduleRoleDAO.beathModuleRole(mrList);
			}
			logger.info(getMethodPath() + "删除数量：" + dbList.size());
			if(!CollectionUtils.isEmpty(dbList)){
				Set<String> roleSet = new HashSet<String>();
				for (Iterator<ModuleRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
					ModuleRoleEntity db = dbIt.next();
					roleSet.add(db.getRoleId());
				}
				moduleRoleDAO.delModuleRole(moduleId, roleSet);
			}
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
		} catch (Exception e) {
			logger.info(getMethodPath()+".error:" + e.getMessage());
		}
		
		return msg;
	}

	/**
	 * 查询当前用户角色所能访问的所有模块
	 */
	public List<ModuleResp> queryModuleByRoleId(Set<String> roleIdSet) {
		return moduleRoleDAO.queryModuleByRole(roleIdSet);
	}

}
