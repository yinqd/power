package com.tower.service;

import com.tower.entity.TerminalEntity;
import com.tower.req.TerminalReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;

public interface ITerminalService {
	/**
	 * 分页查询终端信息
	 * @param pageIndex
	 * @param pageCount
	 * @return
	 */
	public PageResp searchTerminalPage(TerminalReq req);
	/**
	 * 获取指定终端信息
	 * @return
	 */
	public TerminalEntity getTerminalInfo(String terminalId , String terminalGuid);
	/**
	 * 新增终端
	 * @param agentEntity
	 * @return
	 */
	public MsgEntity saveTerminal(TerminalEntity terminalEntity);
	
	/**
	 * 修改终端
	 * @param agentEntity
	 * @return
	 */
	public MsgEntity updTerminal(TerminalEntity terminalEntity);
	
	/**
	 * 删除终端
	 * @param id
	 * @return
	 */
	public MsgEntity delTerminal(String terminalId , String terminalGuid);
}
