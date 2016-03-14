package com.tower.controller;


import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tower.entity.TerminalEntity;
import com.tower.req.TerminalReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.ITerminalService;

import org.springframework.web.bind.annotation.ResponseBody;
/**
 * 终端信息控制层
 * @author my
 *
 */
@RequestMapping("terminal")
@Controller
public class TerminalController {
	@Resource
	private ITerminalService terminalService;
	/**
	 * 分页查询终端基础信息
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="queryTerminalList.action")
	public PageResp searchTerminalList(TerminalReq req){
		return terminalService.searchTerminalPage(req);
	}
	/**
	 * 新增终端基础信息
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="saveTerminal.action")
	public MsgEntity saveTerminalInfo(TerminalEntity terminalEntity){
		return this.terminalService.saveTerminal(terminalEntity);
	}
	/**
	 * 编辑终端基础信息
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="updTerminal.action")
	public MsgEntity updTerminalInfo(TerminalEntity terminalEntity){
		return this.terminalService.updTerminal(terminalEntity);
	}
	
	@RequestMapping(value="updTerminalShow.action")
	public TerminalEntity updTerminalShow(String terminalId , String terminalGuid){
		return this.terminalService.getTerminalInfo(terminalId, terminalGuid);
	}
}
