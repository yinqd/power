package com.tower.service.impl.provides;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IUserDAO;
import com.tower.dao.provides.IUserRoleDAO;
import com.tower.entity.provides.UserEntity;
import com.tower.entity.provides.UserRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.req.LoginReq;
import com.tower.req.provides.UserReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.resp.UserResp;
import com.tower.service.BaseService;
import com.tower.service.IUserService;
import com.tower.service.provides.IUserRoleService;
@Service("userService")
public class UserService extends BaseService implements IUserService{

	@Resource
	private IUserDAO userDAO;
	@Resource
	private IUserRoleDAO userRoleDAO;
	@Resource
	private IUserRoleService userRoleService;
	/**
	 * 根据用户名密码获取用户代理对象
	 */
	public MsgEntity getUserByNameAndPsd(LoginReq req) {
		logger.info(getMethodPath() + ".info inner : " +req);
		MsgEntity msg = new MsgEntity();
		try {
			UserResp resp = userDAO.getUserReqByNameAndPsd(req);
			/*验证用户不存在*/
			if(resp == null){
				msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
				msg.setMsg("用户名密码错误");
			}else{
				msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
				/*向session中存储用户的一些基础信息*/
				HttpSession session = request.getSession();
				session.setAttribute("operName", resp.getOperName());
				session.setAttribute("userId", resp.getOperNo());
				session.setAttribute("operStationno", resp.getOperStationno());
				session.setAttribute("operStationname", resp.getOperStationname());
			}
		} catch (Exception e) {
			logger.error(getMethodPath() + ".error : " + e);
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		}
		
		return msg;
	}
	/**
	 * 分页查询用户信息
	 */
	public PageResp queryUserPage(UserReq req) {
		PageResp pr = new PageResp();
		try{
			pr.setData(userDAO.queryUserList(req));
			pr.setRecordCount(userDAO.queryUserCount(req));
		}catch(Exception e){
			logger.error(getMethodPath() + ".error:" + e);
		}
		
		return pr;
	}
	/**
	 * 获取指定用户的信息
	 */
	public UserEntity getUser(String userId) {
		if(StringUtils.isNotBlank(userId)){
			return userDAO.getUser(userId);
		}else{
			return new UserEntity();
		}
		
	}
	/**
	 * 新增用户
	 */
	public MsgEntity saveUser(UserEntity userEntity) {
		MsgEntity msg = new MsgEntity();
		if(userEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".userEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + userEntity);
		try {
			/*新增用户的基础信息*/
			Long operNo = System.nanoTime();
			userEntity.setOperNo(operNo.toString());
			this.userDAO.saveUser(userEntity);
			/*新增用户基础信息成功后，新增用户角色*/
			if(!CollectionUtils.isEmpty(userEntity.getRoles())){
				List<UserRoleEntity> userRoles = new ArrayList<UserRoleEntity>(2);
				UserRoleEntity userRole;
				for(Iterator<String> it = userEntity.getRoles().iterator() ; it.hasNext();){
					userRole = new UserRoleEntity();
					userRole.setUserId(operNo.toString());
					userRole.setRoleId(it.next());
					userRole.setStatusFlag("1");
					userRoles.add(userRole);
				}
				
				userRoleDAO.beathUserRole(userRoles);
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
	/**
	 * 修改用户
	 */
	public MsgEntity updUser(UserEntity userEntity) {
		MsgEntity msg = new MsgEntity();
		if(userEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".userEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + userEntity);
		try {
			this.userDAO.updUser(userEntity);
			
			/*更新用户权限*/
			if(!CollectionUtils.isEmpty(userEntity.getRoles())){
				List<UserRoleEntity> userRoles = new ArrayList<UserRoleEntity>(2);
				UserRoleEntity userRole;
				for(Iterator<String> it = userEntity.getRoles().iterator() ; it.hasNext();){
					userRole = new UserRoleEntity();
					userRole.setUserId(userEntity.getOperNo());
					userRole.setRoleId(it.next());
					userRole.setStatusFlag("1");
					userRoles.add(userRole);
				}
				
				userRoleService.beathUserRole(userRoles);
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
	/**
	 * 删除用户
	 */
	public MsgEntity delUser(String userId) {
		logger.info(getMethodPath() + ".Info Inner Params userId=" + userId);
		MsgEntity msg = new MsgEntity();
		try {
			UserEntity userEntity = new UserEntity();
			userEntity.setOperNo(userId);
			userEntity.setUpFlag(1);
			userEntity.setOperState("-1");
			this.userDAO.updUser(userEntity);
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
	/**
	 * 修改用户密码
	 */
	public MsgEntity changePassword(String userId, String psd, String confirmPwd) {
		logger.info(getMethodPath() + ".Info Inner Params userId=" + userId + ",psd=" + psd + " , confirmPwd=" + confirmPwd);
		MsgEntity msg = new MsgEntity();
		msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		if(StringUtils.isBlank(userId)){
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".userId is empty");
			return msg;
		}else if(StringUtils.isBlank(psd)){
			msg.setMsg("密码不能为空");
			logger.info(getMethodPath() + ".psd is empty");
			return msg;
		}else if(StringUtils.isBlank(confirmPwd)){
			msg.setMsg("确认密码不能为空");
			logger.info(getMethodPath() + ".confirmPwd is empty");
			return msg;
		}else if(!psd.equals(confirmPwd)){
			msg.setMsg("密码，确认密码不一致");
			logger.info(getMethodPath() + ".psd not equals confirmPwd");
			return msg;
		}
		try {
			UserEntity userEntity = new UserEntity();
			userEntity.setOperNo(userId);
			userEntity.setOperPsd(psd);
			this.userDAO.updUser(userEntity);
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
