package com.tower.resp.chart;

import java.util.List;

public class ChartResp extends BaseChartResp{
	
	/*数值*/
	private List <Long> data;
	public List<Long> getData() {
		return data;
	}
	public void setData(List<Long> data) {
		this.data = data;
	}
}
