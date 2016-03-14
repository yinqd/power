package com.tower.service.impl;

import com.tower.dao.ITerminalDlsczReportDAO;
import com.tower.req.ReportReq;
import com.tower.resp.report.DlsczReportResp;
import com.tower.resp.report.DlsczTotalResp;
import com.tower.service.ITerminalDlsczReportService;
import com.tower.util.JacksonUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 对账交易Service
 */
@Service
public class TerminalDlsczReportService implements ITerminalDlsczReportService {

    @Resource
    private ITerminalDlsczReportDAO dlsczDAO;
    @Resource
	private JacksonUtil jacksonUtil;

    public Map<String, Object> queryTerminalDlsczDetails(ReportReq req) {
        Map<String, Object> map = new HashMap<String, Object>(3);
        map.put("data" , dlsczDAO.queryDlsczDetails(req));
        Integer recordCount = dlsczDAO.queryDlsczDetailCount(req);
        map.put("recordCount" , recordCount == null ? 0 : recordCount);
        Double totalCzbzj = dlsczDAO.queryAllCzbzj(req);
        map.put("totalCzbzj" , totalCzbzj == null ? 0 : totalCzbzj);
        return map;
    }
	public Map<String, Object> queryTerminalDlsczMonthReport(ReportReq req) {
		Map<String, Object> map = new HashMap<String, Object>(3);
		List<DlsczReportResp> month = dlsczDAO.queryDlsczMonthReport(req);
		map.put("data" , month);
		Integer recordCount = dlsczDAO.queryDlsczMonthReportCount(req);
		recordCount = recordCount == null ? 0 : recordCount;
        map.put("recordCount" , recordCount);
		DlsczTotalResp monthTotal = dlsczDAO.dlsczDlsczMonthTotalReport(req);
		map.put("monthTotal" , monthTotal);
       
        return map;
	}

	public Map<String, Object> queryTerminalDlsczYearReport(ReportReq req) {
		Map<String, Object> map = new HashMap<String, Object>(3);
        map.put("data" , dlsczDAO.queryDlsczYearReport(req));
        Integer recordCount = dlsczDAO.queryDlsczYearReportCount(req);
        map.put("recordCount" , recordCount == null ? 0 : recordCount);
        map.put("yearTotal" , dlsczDAO.dlsczDlsczYearTotalReport(req));
        return map;
	}
}
