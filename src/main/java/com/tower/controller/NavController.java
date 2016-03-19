package com.tower.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
/**
 * 非权限---导航链接
 * @author my
 *
 */
@Controller
@RequestMapping("menu")
public class NavController {

	@RequestMapping("home.action")
	public ModelAndView home(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("agentList.action")
	public ModelAndView agentList(){
		ModelAndView mav = new ModelAndView("/agent/agent_list.jsp");
		return mav;
	}
	
	@RequestMapping("agentAdd.action")
	public ModelAndView agentAdd(){
		ModelAndView mav = new ModelAndView("/agent/agent_add.jsp");
		return mav;
	}
	
	@RequestMapping("terminalList.action")
	public ModelAndView terminalList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("terminalDayList.action")
	public ModelAndView terminalDayList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("terminalMonthList.action")
	public ModelAndView terminalMonthList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("terminalYearList.action")
	public ModelAndView terminalYearList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
	
	@RequestMapping("terminalDetailList.action")
	public ModelAndView terminalDetailList(){
		ModelAndView mav = new ModelAndView("");
		return mav;
	}
}
