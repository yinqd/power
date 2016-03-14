package com.tower.dao;

import java.util.List;

import com.tower.resp.PosOperatorResp;

public interface IPosOperatorDAO {
	/**
	 * 查询所有操作人员代理对象
	 * @return
	 */
	public List<PosOperatorResp> queryOperatorRespList();
}
