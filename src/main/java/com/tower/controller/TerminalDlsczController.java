package com.tower.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tower.entity.TerminalDlsczEntity;
import com.tower.req.TerminalDlsczReq;
import com.tower.req.TerminalReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.impl.TerminalDlsczService;

@Controller()
@RequestMapping("terminal/dlscz")
public class TerminalDlsczController {

	@Resource
	private TerminalDlsczService terminalDlsczService;
	/**
	 * 获取代理商充值信息
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("quertDlsczList.action")
	public PageResp queryTerminalDlsczList(TerminalDlsczReq req){
		return terminalDlsczService.searchTerminalDlsczPage(req);
	}
	/**
	 * 新增充值记录
	 * @param terminalDlscz
	 * @return
	 */
	@ResponseBody
	@RequestMapping("saveDlscz.action")
	public MsgEntity saveTerminalDlscz(TerminalDlsczEntity terminalDlscz){
		return terminalDlsczService.saveTerminal(terminalDlscz);
	}
}
