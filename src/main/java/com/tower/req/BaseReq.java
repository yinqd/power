package com.tower.req;

import java.io.Serializable;

/**
 * 入参实体基类
 * @author my
 *
 */
public class BaseReq implements Serializable{
	/*当前页面*/
    protected Integer pageIndex = 1;
    /*每页数据条数*/
    protected Integer pageCount = 20;
    
	public Integer getPageIndex() {
		return pageIndex;
	}
	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}
	public Integer getPageCount() {
		return pageCount;
	}
	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}
}
