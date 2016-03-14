package com.tower.service;

import com.tower.req.ReportReq;

import java.util.Map;

/**
 * 终端对账交易记录Service
 */
public interface ITerminalDlsczReportService {
    /**
     * 查询交易明细信息
     * @return
     */
    public Map<String , Object> queryTerminalDlsczDetails(ReportReq req);
    /**
     * 查询代理商月报表
     * @return
     */
    public Map<String , Object> queryTerminalDlsczMonthReport(ReportReq req);
    
    /**
     * 查询代理商年报表
     * @return
     */
    public Map<String , Object> queryTerminalDlsczYearReport(ReportReq req);
}
