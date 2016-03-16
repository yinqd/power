package com.tower.service.impl;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tower.dao.ITerminalDlsczDAO;
import com.tower.entity.TerminalDlsczEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.req.TerminalDlsczReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.BaseService;
import com.tower.service.ITerminalDlsczService;
@Service("terminalDlsczService")
public class TerminalDlsczService extends BaseService implements ITerminalDlsczService{
	@Resource
	private ITerminalDlsczDAO dlsczDAO;
	
	/**
	 * 查询指定代理商的充值信息
	 */
	public PageResp searchTerminalDlsczPage(TerminalDlsczReq req) {
		logger.info(getMethodPath() + ".Info inner params :" + req);
		PageResp pr = new PageResp();
		try{
			pr.setData(dlsczDAO.queryAgentDlsczList(req));
	        Integer recordCount = dlsczDAO.queryAgentDlsczCount(req);
	        pr.setRecordCount(recordCount == null ? 0 : recordCount);
		}catch(Exception e){
			logger.info(getMethodPath() + ".error" + e);
		}
        return pr;
	}
	/**
	 * 充值
	 */
	public MsgEntity saveTerminal(TerminalDlsczEntity terminalEntity) {
		MsgEntity msg = new MsgEntity();
		if(terminalEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".terminalEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info inner params:" + terminalEntity);
		try {
			this.dlsczDAO.saveAgentDlscz(terminalEntity);
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
