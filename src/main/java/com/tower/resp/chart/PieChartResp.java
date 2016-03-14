package com.tower.resp.chart;

import java.util.ArrayList;
import java.util.List;

public class PieChartResp extends BaseChartResp{
	/*数据*/
	private List<PieDataEntity> data = new ArrayList<PieDataEntity>(5);

	public List<PieDataEntity> getData() {
		return data;
	}

	public void setData(List<PieDataEntity> data) {
		this.data = data;
	}
}
