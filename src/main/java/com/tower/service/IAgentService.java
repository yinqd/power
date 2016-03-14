package com.tower.service;

import com.tower.entity.AgentEntity;
import com.tower.req.AgentReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;

public interface IAgentService {
	/**
	 * 分页查询代理商信息
	 * @param pageIndex
	 * @param pageCount
	 * @return
	 */
	public PageResp searchAgentPage(AgentReq req);
	/**
	 * 获取指定代理商信息
	 * @return
	 */
	public AgentEntity getAgentInfo(String agentId);
	/**
	 * 新增代理商
	 * @param agentEntity
	 * @return
	 */
	public MsgEntity saveAgent(AgentEntity agentEntity);
	
	/**
	 * 修改代理商信息
	 * @param agentEntity
	 * @return
	 */
	public MsgEntity updAgent(AgentEntity agentEntity);
	
	/**
	 * 删除代理商信息
	 * @param id
	 * @return
	 */
	public MsgEntity delAgent(String agentId);
}
