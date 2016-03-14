package com.tower.entity;

/**
 * POS充值保证金记录实体
 */
public class TerminalDlsczEntity {
    /*代理商编号*/
    private String agentId ;
    /*代理商名称*/
    private String agentName;
    /*充值金额*/
    private Double czbzj  ;
    /*操作时间*/
    private String operateDate ;
    /*操作人员主键*/
    private String operateId ;
    /*操作人员名称*/
    private String operateName;
    /*充值GUID值*/
    private String czbzjGuid  ;
    /*收费网点*/
    private String nodeNo;

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

    public Double getCzbzj() {
        return czbzj;
    }

    public void setCzbzj(Double czbzj) {
        this.czbzj = czbzj;
    }

    public String getOperateDate() {
        return operateDate;
    }

    public void setOperateDate(String operateDate) {
        this.operateDate = operateDate;
    }

    public String getOperateId() {
        return operateId;
    }

    public void setOperateId(String operateId) {
        this.operateId = operateId;
    }

    public String getOperateName() {
        return operateName;
    }

    public void setOperateName(String operateName) {
        this.operateName = operateName;
    }

    public String getCzbzjGuid() {
        return czbzjGuid;
    }

    public void setCzbzjGuid(String czbzjGuid) {
        this.czbzjGuid = czbzjGuid;
    }

	public String getNodeNo() {
		return nodeNo;
	}

	public void setNodeNo(String nodeNo) {
		this.nodeNo = nodeNo;
	}
    @Override
    public String toString() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("agentId：【").append(agentId).append("】,");
    	buffer.append("agentName：【").append(agentName).append("】,");
    	buffer.append("czbzj：【").append(czbzj).append("】,");
    	buffer.append("operateDate：【").append(operateDate).append("】,");
    	buffer.append("operateId：【").append(operateId).append("】,");
    	buffer.append("operateName：【").append(operateName).append("】,");
    	buffer.append("czbzjGuid：【").append(czbzjGuid).append("】,");
    	buffer.append("nodeNo：【").append(nodeNo).append("】,");
    	return super.toString();
    }
}
