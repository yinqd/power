package com.tower.controller.provides;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
/**
 * 权限管理---导航链接
 * @author my
 *
 */
@RequestMapping("pro")
@Controller
public class ProController {

	@RequestMapping("home.action")
	public ModelAndView home(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("moduleList.action")
	public ModelAndView moduleList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("menuList.action")
	public ModelAndView menuList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("roleList.action")
	public ModelAndView roleList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("buttonList.action")
	public ModelAndView buttonList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("userList.action")
	public ModelAndView userList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
}
