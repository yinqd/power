package com.tower.controller.provides;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tower.controller.BaseController;
import com.tower.entity.provides.UserEntity;
import com.tower.req.provides.UserReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.IUserService;

/**
 * 用户登录验证
 * @author my
 *
 */
@Controller
@RequestMapping("user")
public class UserAction extends BaseController{
	@Resource
	private IUserService userService;
	@ResponseBody
	@RequestMapping("list.action")
	public PageResp list(UserReq req){
		return userService.queryUserPage(req);
	}
	@ResponseBody
	@RequestMapping("saveUser.action")
	public MsgEntity saveUser(UserEntity userEntity){
		return userService.saveUser(userEntity);
	}
	@ResponseBody
	@RequestMapping("updUser.action")
	public MsgEntity updUser(UserEntity userEntity){
		return userService.updUser(userEntity);
	}
	@ResponseBody
	@RequestMapping("delUser.action")
	public MsgEntity delUser(String userId){
		return userService.delUser(userId);
	}
	@ResponseBody
	@RequestMapping("getUser.action")
	public UserEntity getUser(String userId){
		return userService.getUser(userId);
	}
	@ResponseBody
	@RequestMapping("changePsd.action")
	public MsgEntity changePsd(String userId , String psd , String confirmPsd){
		return userService.changePassword(userId, psd, confirmPsd);
	}
}
