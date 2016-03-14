package com.tower.entity;

/**
 * 网点信息表（共用营销系统网点数据）
 */
public class PosUnitNetEntity {
    /*网点编号*/
    private String nodeNo ;
    /*序号*/
    private String seqNo  ;
    /*网点名称*/
    private String nodeName  ;
    /*父编号*/
    private String fatherNodeNo   ;
    /*标识*/
    private String nodeFlag   ;
    /*级别*/
    private Integer fLevel = 0    ;
    /*网点类别*/
    private String isNetDot    ;
    /*可购电点*/
    private String buyNodeList  ;
    /*序列码*/
    private String sysSn       ;
    /*站点号*/
    private String stationId   ;
    /*ekey密钥*/
    private String ekeyIntPwdKey ;
    /*备注*/
    private String remark  ;
    /*更新时间*/
    private String modifyTime  ;
    /*创建日期*/
    private String createTime  ;
    /*数据库站点*/
    private String modifyNodeNo  ;
    /*同步标志*/
    private String dbFlag    ;
    /*同步点*/
    private String dbDot   ;

    public String getNodeNo() {
        return nodeNo;
    }

    public void setNodeNo(String nodeNo) {
        this.nodeNo = nodeNo;
    }

    public String getSeqNo() {
        return seqNo;
    }

    public void setSeqNo(String seqNo) {
        this.seqNo = seqNo;
    }

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public String getFatherNodeNo() {
        return fatherNodeNo;
    }

    public void setFatherNodeNo(String fatherNodeNo) {
        this.fatherNodeNo = fatherNodeNo;
    }

   
    public String getIsNetDot() {
        return isNetDot;
    }

    public void setIsNetDot(String isNetDot) {
        this.isNetDot = isNetDot;
    }

    public String getBuyNodeList() {
        return buyNodeList;
    }

    public void setBuyNodeList(String buyNodeList) {
        this.buyNodeList = buyNodeList;
    }

    public String getSysSn() {
        return sysSn;
    }

    public void setSysSn(String sysSn) {
        this.sysSn = sysSn;
    }

    public String getStationId() {
        return stationId;
    }

    public void setStationId(String stationId) {
        this.stationId = stationId;
    }

    public String getEkeyIntPwdKey() {
        return ekeyIntPwdKey;
    }

    public void setEkeyIntPwdKey(String ekeyIntPwdKey) {
        this.ekeyIntPwdKey = ekeyIntPwdKey;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(String modifyTime) {
        this.modifyTime = modifyTime;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getModifyNodeNo() {
        return modifyNodeNo;
    }

    public void setModifyNodeNo(String modifyNodeNo) {
        this.modifyNodeNo = modifyNodeNo;
    }

    public String getDbFlag() {
        return dbFlag;
    }

    public void setDbFlag(String dbFlag) {
        this.dbFlag = dbFlag;
    }

    public String getNodeFlag() {
		return nodeFlag;
	}

	public void setNodeFlag(String nodeFlag) {
		this.nodeFlag = nodeFlag;
	}

	public Integer getfLevel() {
		return fLevel;
	}

	public void setfLevel(Integer fLevel) {
		this.fLevel = fLevel;
	}

	public String getDbDot() {
		return dbDot;
	}

	public void setDbDot(String dbDot) {
		this.dbDot = dbDot;
	}

	@Override
    public String toString() {
    	StringBuffer buffer = new StringBuffer();
    	buffer.append("nodeNo:【").append(this.nodeNo).append("】,");
    	buffer.append("seqNo:【").append(this.seqNo).append("】,");
    	buffer.append("nodeName:【").append(this.nodeName).append("】,");
    	buffer.append("fatherNodeNo:【").append(this.fatherNodeNo).append("】,");
    	buffer.append("nodeFlag:【").append(this.nodeFlag).append("】,");
    	buffer.append("fLevel:【").append(this.fLevel).append("】,");
    	buffer.append("isNetDot:【").append(this.isNetDot).append("】,");
    	buffer.append("buyNodeList:【").append(this.buyNodeList).append("】,");
    	buffer.append("sysSn:【").append(this.sysSn).append("】,");
    	buffer.append("stationId:【").append(this.stationId).append("】,");
    	buffer.append("ekeyIntPwdKey:【").append(this.ekeyIntPwdKey).append("】,");
    	buffer.append("remark:【").append(this.remark).append("】,");
    	buffer.append("modifyTime:【").append(this.modifyTime).append("】,");
    	buffer.append("createTime:【").append(this.createTime).append("】,");
    	buffer.append("modifyNodeNo:【").append(this.modifyNodeNo).append("】,");
    	buffer.append("dbFlag:【").append(this.dbFlag).append("】,");
    	buffer.append("dbDot:【").append(this.dbDot).append("】");
    	return super.toString();
    }
}
