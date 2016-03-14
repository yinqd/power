package com.tower.service;

import com.tower.entity.provides.UserEntity;
import com.tower.req.LoginReq;
import com.tower.req.provides.UserReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;

/**
 * 用户操作接口
 * @author my
 *
 */
public interface IUserService {

	/**
	 * 根据用户名和密码获取用户代理对象信息
	 * @param req
	 * @return
	 */
	public MsgEntity getUserByNameAndPsd(LoginReq req);
	/**
	 * 分页查询用户信息
	 * @param req
	 * @return
	 */
	public PageResp queryUserPage(UserReq req);
	/**
	 * 获取指定用户信息
	 * @param userId
	 * @return
	 */
	public UserEntity getUser(String userId);
	/**
	 * 新增用户
	 * @param userEntity
	 * @return
	 */
	public MsgEntity saveUser(UserEntity userEntity);
	/**
	 * 修改用户
	 * @param userEntity
	 * @return
	 */
	public MsgEntity updUser(UserEntity userEntity);
	/**
	 * 删除用户
	 * @param userId
	 * @return
	 */
	public MsgEntity delUser(String userId);
	/**
	 * 改变密码
	 * @param userId
	 * @param psd
	 * @param confirmPwd
	 * @return
	 */
	public MsgEntity changePassword (String userId , String psd , String confirmPwd);
}
