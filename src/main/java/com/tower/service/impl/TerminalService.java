package com.tower.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.tower.dao.ITerminalDAO;
import com.tower.entity.TerminalEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.req.TerminalReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.BaseService;
import com.tower.service.ITerminalService;
@Service("terminalService")
public class TerminalService extends BaseService implements ITerminalService{

	@Resource
	private ITerminalDAO terminalDAO;
	/**
	 * 分页查询终端信息
	 */
	public PageResp searchTerminalPage(TerminalReq req) {
		logger.info(getMethodPath() + ".Info Inner Params :" + req.toString());
		PageResp pr = new PageResp();
		try {
			List<TerminalEntity> agentList = this.terminalDAO.searchTermianlList(req);
			Integer recordCount = this.terminalDAO.searchTerminalCount(req);
			pr.setData(agentList);
			pr.setRecordCount(recordCount);
		} catch (Exception e) {
			logger.info(getMethodPath() + ".error" + e);
		}
		
		return pr;
	}

	/**
	 * 获取指定的终端信息
	 */
	public TerminalEntity getTerminalInfo(String terminalId, String terminalGuid) {
		logger.info(getMethodPath() + ".Info Inner Params :terminalId=" + terminalId + ",terminalGuid=" + terminalGuid);
		if(StringUtils.isNotBlank(terminalId) && StringUtils.isNotBlank(terminalGuid)){
			return terminalDAO.getTerminalInfo(terminalId, terminalGuid);
		}else{
			return new TerminalEntity();
		}
		
	}
	/**
	 * 保存终端信息
	 */
	public MsgEntity saveTerminal(TerminalEntity terminalEntity) {
		MsgEntity msg = new MsgEntity();
		if(terminalEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".info:AgentEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info inner Params :" + terminalEntity);
		try {
			this.terminalDAO.saveTerminalInfo(terminalEntity);
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
	 * 修改终端信息
	 */
	public MsgEntity updTerminal(TerminalEntity terminalEntity) {
		MsgEntity msg = new MsgEntity();
		if(terminalEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".info:AgentEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info inner Params :" + terminalEntity);
		try {
			this.terminalDAO.updTerminalInfo(terminalEntity);
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
	 * 删除终端信息
	 */
	public MsgEntity delTerminal(String terminalId, String terminalGuid) {
		logger.info(getMethodPath() + ".Info inner Params :terminalId=" + terminalId + ",terminalGuid=" + terminalGuid);
		MsgEntity msg = new MsgEntity();
		try {
			TerminalEntity terminalEntity = new TerminalEntity();
			terminalEntity.setTerminalGuid(terminalGuid);
			terminalEntity.setTerminalId(terminalId);
			terminalEntity.setCloseFlag("0");
			this.terminalDAO.updTerminalInfo(terminalEntity);
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

}
