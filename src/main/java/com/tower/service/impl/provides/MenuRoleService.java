package com.tower.service.impl.provides;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IMenuRoleDAO;
import com.tower.entity.provides.MenuRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.resp.MsgEntity;
import com.tower.resp.provides.MenuResp;
import com.tower.service.BaseService;
import com.tower.service.provides.IMenuRoleService;
@Service("menuRoleService")
public class MenuRoleService extends BaseService implements IMenuRoleService{

	@Resource
	private IMenuRoleDAO menuRoleDAO;
	
	public List<MenuRoleEntity> queryMenuRoleList(String menuId) {
		return menuRoleDAO.queryMenuRoleList(menuId);
	}

	public MsgEntity beathMenuRole(List<MenuRoleEntity> mrList) {
		MsgEntity msg = new MsgEntity();
		msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		if(CollectionUtils.isEmpty(mrList)){
			logger.info(getMethodPath() + ".Info inner param is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info inner param mrList.size" + mrList.size());
		
		try {
			String menuId = mrList.get(0).getMenuId();
			/*获取当前菜单说包含的菜单角色*/
			List<MenuRoleEntity> dbList = menuRoleDAO.queryMenuRoleList(menuId);
			
			if(CollectionUtils.isEmpty(dbList)){
			}else{
				for (Iterator<MenuRoleEntity> it = mrList.iterator(); it.hasNext(); ) {
					MenuRoleEntity mr = it.next();
					for (Iterator<MenuRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
						MenuRoleEntity db = dbIt.next();
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
				menuRoleDAO.beathMenuRole(mrList);
			}
			logger.info(getMethodPath() + "删除数量：" + dbList.size());
			if(!CollectionUtils.isEmpty(dbList)){
				Set<String> roleSet = new HashSet<String>();
				for (Iterator<MenuRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
					MenuRoleEntity db = dbIt.next();
					roleSet.add(db.getRoleId());
				}
				menuRoleDAO.delMenuRole(menuId, roleSet);
			}
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
		} catch (Exception e) {
			logger.info(getMethodPath()+".error:" + e.getMessage());
		}
		
		return msg;
	}

	/**
	 * 查询当前用户角色所能访问的所有菜单
	 */
	public List<MenuResp> queryMenuByRoleId(Set<String> roleIdSet) {
		return menuRoleDAO.queryMenuByRole(roleIdSet);
	}

	/**
	 * 查询当前用户所能访问当前模块的所有菜单
	 */
	public List<MenuResp> queryMenuByRoleAndModule(Set<String> roleIdSet,
			String moduleId) {
		return menuRoleDAO.queryMenuByRoleAndModule(roleIdSet, moduleId);
	}

}
