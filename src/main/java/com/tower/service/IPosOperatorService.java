package com.tower.service;

import java.util.List;

import com.tower.resp.PosOperatorResp;

public interface IPosOperatorService {
	/**
	 * 查询所有操作人员代理对象
	 * @return
	 */
	public List<PosOperatorResp> queryOperatorRespList();
}
