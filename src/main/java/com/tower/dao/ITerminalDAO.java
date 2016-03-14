package com.tower.dao;

import java.util.*;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.TerminalEntity;
import com.tower.req.TerminalReq;

public interface ITerminalDAO {
	/**
	 * 分页查询终端基本信息
	 * @param req
	 * @return
	 */
	public List<TerminalEntity> searchTermianlList(TerminalReq req);
	/**
	 * 查询终端总数量
	 * @param req
	 * @return
	 */
	public Integer searchTerminalCount(TerminalReq req);
	/**
	 * 获取指定终端基础信息
	 * @param terminalId
	 * @param terminalGuid
	 * @return
	 */
	public TerminalEntity getTerminalInfo(@Param("terminalId")String terminalId , @Param("terminalGuid")String terminalGuid);
	/**
	 * 新增终端基础信息
	 * @param terminalEntity
	 */
	public void saveTerminalInfo(TerminalEntity terminalEntity);
	/**
	 * 修改终端基础信息
	 * @param terminalEntity
	 */
	public void updTerminalInfo(TerminalEntity terminalEntity);
}
