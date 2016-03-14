package com.tower.dao.provides;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.UserEntity;
import com.tower.req.LoginReq;
import com.tower.req.provides.UserReq;
import com.tower.resp.UserResp;

public interface IUserDAO {

	/**
	 * 根据用户名和密码获取指定的对象
	 * @return
	 */
	public UserResp getUserReqByNameAndPsd(LoginReq req);
	/**
	 * 分页查询用户信息
	 * @param req
	 * @return
	 */
	public List<UserEntity> queryUserList(UserReq req);
	/**
	 * 查询用户数量
	 * @param req
	 * @return
	 */
	public Integer queryUserCount(UserReq req);
	/**
	 * 新增用户
	 * @param userEntity
	 */
	public void saveUser(UserEntity userEntity);
	/**
	 * 修改用户
	 * @param userEntity
	 */
	public void updUser(UserEntity userEntity);
	/**
	 * 获取指定用户信息
	 * @param operNo
	 * @return
	 */
	public UserEntity getUser(@Param("operNo")String operNo);
	
}
