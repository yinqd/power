package com.tower.service;

import com.tower.entity.TerminalDlsczEntity;
import com.tower.req.TerminalDlsczReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;

public interface ITerminalDlsczService {
	/**
	 * 分页查询充值信息
	 * @param pageIndex
	 * @param pageCount
	 * @return
	 */
	public PageResp searchTerminalDlsczPage(TerminalDlsczReq req);
	/**
	 * 新增充值
	 * @param agentEntity
	 * @return
	 */
	public MsgEntity saveTerminal(TerminalDlsczEntity terminalEntity);
}
