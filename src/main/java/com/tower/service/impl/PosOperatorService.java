package com.tower.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tower.dao.IPosOperatorDAO;
import com.tower.resp.PosOperatorResp;
import com.tower.service.IPosOperatorService;
@Service
public class PosOperatorService implements IPosOperatorService{
	@Resource
	private IPosOperatorDAO posOperatorDAO ;
	/**
	 * 查询所有操作人员代理对象
	 * @return
	 */
	public List<PosOperatorResp> queryOperatorRespList() {
		return posOperatorDAO.queryOperatorRespList();
	}

}
