package com.tower.dao;

import com.tower.entity.TerminalDlsczEntity;
import com.tower.req.ReportReq;
import com.tower.resp.report.DlsczReportResp;
import com.tower.resp.report.DlsczTotalResp;

import java.util.List;

/**
 * 终端对账交易记录Service
 */
public interface ITerminalDlsczReportDAO {
    /*-----------------------------------对账交易明细-----------------------------------*/
    /*分页获取对账交易明细信息*/
   public List<TerminalDlsczEntity> queryDlsczDetails(ReportReq req);
    /*获取对账交易明细数量*/
   public Integer queryDlsczDetailCount(ReportReq req);
    /*获取对账交易明细总计*/
   public Double queryAllCzbzj(ReportReq req);
   
   /*-----------------------------------对账交易月报-----------------------------------*/
   /*分页获取代理商充值月报*/
   public List<DlsczReportResp> queryDlsczMonthReport(ReportReq req);
   /*分页获取代理商充值月报数量*/
   public Integer queryDlsczMonthReportCount(ReportReq req);
   /*分页获取代理商充值月报总计*/
   public DlsczTotalResp dlsczDlsczMonthTotalReport(ReportReq req);
   
   /*-----------------------------------对账交易月报-----------------------------------*/
   /*分页获取代理商充值月报*/
   public List<DlsczReportResp> queryDlsczYearReport(ReportReq req);
   /*分页获取代理商充值月报数量*/
   public Integer queryDlsczYearReportCount(ReportReq req);
   /*分页获取代理商充值月报总计*/
   public DlsczTotalResp dlsczDlsczYearTotalReport(ReportReq req);
}
