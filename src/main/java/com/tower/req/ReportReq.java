package com.tower.req;

/**
 * 报表查询条件封装类
 */
public class ReportReq extends BaseReq{
    /*营业点*/
    private String nodeNo = "01";
    /*代理商编号*/
    private String agentId;
    /*代理商名称*/
    private String agentName;
    /*起始日期*/
    private String startTime;
    /*终止日期*/
    private String endTime;
    /*操作员*/
    private String operateId;
    /*含已停用的代理商*/
    private Integer enableFlag = 1;

    public String getNodeNo() {
        return nodeNo;
    }

    public void setNodeNo(String nodeNo) {
        this.nodeNo = nodeNo;
    }

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getOperateId() {
        return operateId;
    }

    public void setOperateId(String operateId) {
        this.operateId = operateId;
    }

    public Integer getEnableFlag() {
        return enableFlag;
    }

    public void setEnableFlag(Integer enableFlag) {
        this.enableFlag = enableFlag;
    }

    @Override
    public String toString() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("nodeNo:【").append(this.nodeNo).append("】,");
    	buffer.append("agentId:【").append(this.agentId).append("】,");
    	buffer.append("agentName:【").append(this.agentName).append("】,");
    	buffer.append("startTime:【").append(this.startTime).append("】,");
    	buffer.append("endTime:【").append(this.endTime).append("】,");
    	buffer.append("operateId:【").append(this.operateId).append("】,");
    	buffer.append("pageIndex:【").append(this.pageIndex).append("】,");
    	buffer.append("pageCount:【").append(this.pageCount).append("】");
    	buffer.append("enableFlag:【").append(this.enableFlag).append("】,");
    	return buffer.toString();
    }
}
