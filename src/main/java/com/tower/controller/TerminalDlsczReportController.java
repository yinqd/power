package com.tower.controller;

import com.tower.req.ReportReq;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tower.service.IPosOperatorService;
import com.tower.service.IPosUnitNetService;
import com.tower.service.ITerminalDlsczReportService;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import java.util.Map;

/**
 * 对账明细报表Controller层
 */
@Controller
@RequestMapping("dlscz/report")
public class TerminalDlsczReportController {
    @Resource
    private ITerminalDlsczReportService terminalDlsczReportService;
    @Resource
    private IPosUnitNetService posUnitNetService;
    @Resource
    private IPosOperatorService posOperatorService;

    /**
     * 查询交易明细、日报
     * @param req
     * @return
     */
    @ResponseBody
    @RequestMapping("queryDlsczList.action")
    public Map<String , Object> queryDlsczList(ReportReq req , HttpServletRequest request){
        return terminalDlsczReportService.queryTerminalDlsczDetails(req);
    }

    /**
     * 查询交易月报
     * @param req
     * @return
     */
    @ResponseBody
    @RequestMapping("queryDlsczMonthReport.action")
    public Map<String , Object> queryDlsczMonthReport(ReportReq req){
    	return terminalDlsczReportService.queryTerminalDlsczMonthReport(req);
    }

    /**
     * 查询交易年报
     * @param req
     * @return
     */
    @ResponseBody
    @RequestMapping("queryDlsczYearReport.action")
    public Map<String , Object> queryDlsczYearReport(ReportReq req){
    	if(StringUtils.isNotBlank(req.getStartTime())){
    		req.setStartTime(req.getStartTime().substring(0, 7));
    	}
    	if(StringUtils.isNotBlank(req.getEndTime())){
    		req.setEndTime(req.getEndTime().substring(0, 7));
    	}
    	return terminalDlsczReportService.queryTerminalDlsczYearReport(req);
    }
}
