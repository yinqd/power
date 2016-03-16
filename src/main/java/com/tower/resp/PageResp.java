package com.tower.resp;

import java.util.ArrayList;
import java.util.List;
/**
 * 分页对象
 * @author my
 *
 */
public class PageResp {

	private List data = new ArrayList();
	private Integer recordCount = 0;
	public List getData() {
		return data;
	}
	public void setData(List data) {
		this.data = data;
	}
	public Integer getRecordCount() {
		return recordCount;
	}
	public void setRecordCount(Integer recordCount) {
		this.recordCount = recordCount;
	}
	
}
