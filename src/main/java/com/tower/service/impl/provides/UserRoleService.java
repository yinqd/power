package com.tower.service.impl.provides;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IUserRoleDAO;
import com.tower.entity.provides.UserRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.resp.MsgEntity;
import com.tower.service.BaseService;
import com.tower.service.provides.IUserRoleService;
@Service("userRoleService")
public class UserRoleService extends BaseService implements IUserRoleService{

	@Resource
	private IUserRoleDAO userRoleDAO;
	
	public List<UserRoleEntity> queryUserRoleList(String UserId) {
		return userRoleDAO.queryUserRoleList(UserId);
	}

	public MsgEntity beathUserRole(List<UserRoleEntity> mrList) {
		MsgEntity msg = new MsgEntity();
		msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		if(CollectionUtils.isEmpty(mrList)){
			logger.info(getMethodPath() + ".Info inner param is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info inner param mrList.size" + mrList.size());
		
		try {
			String UserId = mrList.get(0).getUserId();
			/*获取当前模块说包含的模块角色*/
			List<UserRoleEntity> dbList = userRoleDAO.queryUserRoleList(UserId);
			
			if(CollectionUtils.isEmpty(dbList)){
			}else{
				for (Iterator<UserRoleEntity> it = mrList.iterator(); it.hasNext(); ) {
					UserRoleEntity mr = it.next();
					for (Iterator<UserRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
						UserRoleEntity db = dbIt.next();
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
				userRoleDAO.beathUserRole(mrList);
			}
			logger.info(getMethodPath() + "删除数量：" + dbList.size());
			if(!CollectionUtils.isEmpty(dbList)){
				Set<String> roleSet = new HashSet<String>();
				for (Iterator<UserRoleEntity> dbIt = dbList.iterator(); dbIt.hasNext(); ) {
					UserRoleEntity db = dbIt.next();
					roleSet.add(db.getRoleId());
				}
				userRoleDAO.delUserRole(UserId, roleSet);
			}
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
		} catch (Exception e) {
			logger.info(getMethodPath()+".error:" + e.getMessage());
		}
		
		return msg;
	}

	public Set<String> queryRoleByUser(String userId){
		return userRoleDAO.queryRoleByUser(userId);
	}

}
