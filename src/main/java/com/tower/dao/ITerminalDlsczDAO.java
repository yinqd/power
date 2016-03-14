package com.tower.dao;

import java.util.List;

import com.tower.entity.TerminalDlsczEntity;
import com.tower.req.TerminalDlsczReq;

public interface ITerminalDlsczDAO {
	/**
	 * 分页查询充值详情
	 * @param req
	 * @return
	 */
	public List<TerminalDlsczEntity> queryAgentDlsczList(TerminalDlsczReq req);
	/**
	 * 查询充值数量
	 * @param req
	 * @return
	 */
	public Integer queryAgentDlsczCount(TerminalDlsczReq req);
	/**
	 * 新增充值
	 * @param terminalDlsczEntity
	 */
	public void saveAgentDlscz(TerminalDlsczEntity terminalDlsczEntity);
}
