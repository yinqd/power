package com.tower.controller;


import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tower.entity.AgentEntity;
import com.tower.req.AgentReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.IAgentService;

import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping("agent")
@Controller
public class AgentController {

	@Resource
	private IAgentService agentService;
	
	/**
	 * 分页查询代理商基础信息
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="queryAgentList.action")
	public PageResp searchAgentList(AgentReq req){
		return agentService.searchAgentPage(req);
	}
	/**
	 * 新增代理商基础信息
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="saveAgent.action")
	public MsgEntity saveAgentInfo(AgentEntity agentEntity){
		return this.agentService.saveAgent(agentEntity);
	}
	/**
	 * 编辑查询代理商基础信息
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="updAgent.action")
	public MsgEntity updAgentInfo(AgentEntity agentEntity){
		return this.agentService.updAgent(agentEntity);
	}
	@ResponseBody
	@RequestMapping(value="getAgent.action")
	public AgentEntity updAgentShow(String id){
		return this.agentService.getAgentInfo(id);
	}
}
