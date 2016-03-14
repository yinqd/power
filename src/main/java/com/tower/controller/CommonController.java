package com.tower.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tower.service.IPosOperatorService;
import com.tower.service.IPosUnitNetService;

/**
 * 通用配置项
 * @author my
 *
 */
@RequestMapping("common")
@Controller
public class CommonController {
	@Resource
    private IPosUnitNetService posUnitNetService;
	@Resource
	private IPosOperatorService posOperatorService;
	/**
	 * 通用配置-----网点信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping("queryUnit.action")
	public Map<String , Object> queryUnitList(){
		Map<String , Object> map = new HashMap<String , Object>();
		map.put("unit", posUnitNetService.queryUnitNetRespList());
		return map;
	}
	/**
	 * 通用配置-----操作人信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping("queryOperator.action")
	public Map<String , Object> queryOperatorList(){
		Map<String , Object> map = new HashMap<String , Object>();
		map.put("operator", posOperatorService.queryOperatorRespList());
		return map;
	}
}
