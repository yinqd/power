package com.tower.controller.provides;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tower.service.provides.IHomeService;
@Controller
@RequestMapping("home")
public class HomeAction {

	@Resource
	private IHomeService homeService;
	/**
	 * 跳转到首页
	 * @return
	 */
	@RequestMapping("home.action")
	public ModelAndView toHome(){
		ModelAndView mav = new ModelAndView();
		mav.addAllObjects(homeService.toHome());
		return mav;
	}
	/**
	 * 切换模块
	 * @return
	 */
	@ResponseBody
	@RequestMapping("changeModule.action")
	public ModelAndView changeModule(String moduleId){
		ModelAndView mav = new ModelAndView();
		mav.addAllObjects(homeService.changeModule(moduleId));
		return mav;
	}
}
