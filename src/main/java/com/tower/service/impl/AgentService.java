package com.tower.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.tower.dao.IAgentDAO;
import com.tower.entity.AgentEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.req.AgentReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.BaseService;
import com.tower.service.IAgentService;
@Service("AgentService")
public class AgentService extends BaseService implements IAgentService {
	@Resource
	private IAgentDAO agentDAO;
	/**
	 * 分页查询代理商信息
	 */
	public PageResp searchAgentPage(AgentReq req) {
		logger.info(getMethodPath() + ".info inner:" + req );
		PageResp pr = new PageResp();
		try {
			List<AgentEntity> agentList = this.agentDAO.searchAgentList(req);
			Integer recordCount = this.agentDAO.searchAgentCount(req);
			pr.setData(agentList);
			pr.setRecordCount(recordCount);
		} catch (Exception e) {
			logger.error(getMethodPath() + ".error:" + e );
		}
		
		return pr;
	}

	/**
	 * 获取代理商详细信息
	 * @param id
	 * @return
     */
	public AgentEntity getAgentInfo(String agentId) {
		if(StringUtils.isNotBlank(agentId)){
			return this.getAgentInfo(agentId);
		}else{
			return new AgentEntity();
		}
		
	}

	/**
	 * 新增代理商信息
	 */
	public MsgEntity saveAgent(AgentEntity agentEntity) {
		MsgEntity msg = new MsgEntity();
		if(agentEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".info:AgentEntity is empty");
			return msg;
		}
		try {
			this.agentDAO.saveAgentInfo(agentEntity);
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			e.printStackTrace();
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		return msg;
	}
	/**
	 * 修改代理商基础信息
	 */
	public MsgEntity updAgent(AgentEntity agentEntity) {
		MsgEntity msg = new MsgEntity();
		if(agentEntity == null || agentEntity.getAgentId() == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".info:AgentEntity is empty");
			return msg;
		}
		try {
			this.agentDAO.updAgentInfo(agentEntity);
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		return msg;
	}
	/**
	 * 关闭代理商
	 * @param agentId
	 * @return
	 */
	public MsgEntity delAgent(String agentId) {
		MsgEntity msg = new MsgEntity();
		try {
			AgentEntity agentEntity = new AgentEntity();
			agentEntity.setAgentId(agentId);
			agentEntity.setAgentFlag("0");
			this.agentDAO.updAgentInfo(agentEntity);
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		return msg;
	}

}
