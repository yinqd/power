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

import com.tower.dao.provides.IButtonRoleDAO;
import com.tower.entity.provides.ButtonRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.resp.MsgEntity;
import com.tower.resp.provides.ButtonResp;
import com.tower.service.BaseService;
import com.tower.service.provides.IButtonRoleService;
@Service("buttonRoleService")
public class ButtonRoleService extends BaseService implements IButtonRoleService{

	@Resource
	private IButtonRoleDAO buttonRoleDAO;
	/**
	 * 查询按钮权限
	 */
	public List<ButtonRoleEntity> queryButtonRoleList(String buttonId) {
		if(StringUtils.isNotBlank(buttonId))
			return buttonRoleDAO.queryButtonRoleList(buttonId);
		return new ArrayList<ButtonRoleEntity>();
	}

	public MsgEntity beathButtonRole(List<ButtonRoleEntity> mrList) {
		MsgEntity msg = new MsgEntity();
		msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		if(CollectionUtils.isEmpty(mrList)){
			logger.info(getMethodPath() + ".Info inner param is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info inner param mrList.size" + mrList.size());
		
		try {
			String buttonId = mrList.get(0).getButtonId();
			/*获取当前模块说包含的模块角色*/
			List<ButtonRoleEntity> dbList = buttonRoleDAO.queryButtonRoleList(buttonId);
			
			if(CollectionUtils.isEmpty(dbList)){
			}else{
				for (Iterator<ButtonRoleEntity> it = mrList.iterator(); it.hasNext(); ) {
					ButtonRoleEntity mr = it.next();
					for (Iterator<ButtonRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
						ButtonRoleEntity db = dbIt.next();
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
				buttonRoleDAO.batchButtonRole(mrList);
			}
			logger.info(getMethodPath() + "删除数量：" + dbList.size());
			if(!CollectionUtils.isEmpty(dbList)){
				Set<String> roleSet = new HashSet<String>();
				for (Iterator<ButtonRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
					ButtonRoleEntity db = dbIt.next();
					roleSet.add(db.getRoleId());
				}
				buttonRoleDAO.delButtonRole(buttonId, roleSet);
			}
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
		} catch (Exception e) {
			logger.info(getMethodPath()+".error:" + e.getMessage());
		}
		
		return msg;
	
	}

	public List<ButtonResp> queryButtonByRoleAndMenu(String menuId,
			Set<String> roleSet) {
		if(StringUtils.isNotBlank(menuId) && !CollectionUtils.isEmpty(roleSet))
			return buttonRoleDAO.queryButtonByRoleAndMenu(menuId, roleSet);
		return new ArrayList<ButtonResp>();
	}

}
