package com.tower.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.tower.entity.AgentEntity;
import com.tower.req.AgentReq;

@Repository
public interface IAgentDAO {
	/**
	 * 分页查询代理商信息
	 */
	public List<AgentEntity> searchAgentList(AgentReq req);

	/**
	 * 查询代理商数量
	 * @return
	 */
	public Integer searchAgentCount(AgentReq req);
	/**
	 * 获取最大ID
	 * @return
	 */
	public String getMaxId();
	/**
	 * 获取代理商详细信息
	 * @param id
	 * @return
     */
	public AgentEntity getAgentInfo(@Param("agentId") String agentId);

	/**
	 * 新增代理商信息
	 * @param agentEntity
	 */
	public void saveAgentInfo(AgentEntity agentEntity);

	/**
	 * 修改代理商信息
	 * @param agentEntity
	 */
	public void updAgentInfo(AgentEntity agentEntity);
}
