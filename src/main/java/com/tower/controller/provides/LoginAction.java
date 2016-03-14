package com.tower.controller.provides;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tower.controller.BaseController;
import com.tower.enums.MsgCodeEnum;
import com.tower.enums.ValidateEnum;
import com.tower.req.LoginReq;
import com.tower.resp.MsgEntity;
import com.tower.service.IUserService;
@Controller
@RequestMapping("login")
public class LoginAction extends BaseController{

	@Resource
	private IUserService userService;
	/**
	 * 验证用户登录系统
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("login.action")
	public MsgEntity login(LoginReq req){
		if(null != session.getAttribute(ValidateEnum.VALIDATE_SUCCESS_CODE.getBlackDesc()) 
				&& ValidateEnum.VALIDATE_SUCCESS_CODE.getBlackValue().equals(session.getAttribute(ValidateEnum.VALIDATE_SUCCESS_CODE.getBlackDesc()))){
			return userService.getUserByNameAndPsd(req);
		}
		MsgEntity msg = new MsgEntity();
		msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		return msg;
	}
	/**
	 * 验证用户验证码
	 * @param code
	 * @return
	 */
	@ResponseBody
	@RequestMapping("validateCode.action")
	public MsgEntity validateCode(String code){
		MsgEntity msg = new MsgEntity();
		if(StringUtils.isNotBlank(code) || session.getAttribute("code") == null){
			if(code.equals(session.getAttribute("code").toString())){
				msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
				session.setAttribute(ValidateEnum.VALIDATE_SUCCESS_CODE.getBlackDesc(), ValidateEnum.VALIDATE_SUCCESS_CODE.getBlackValue());
			}else{
				msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			}
		}else{
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
		}
		return msg;
	}

}
