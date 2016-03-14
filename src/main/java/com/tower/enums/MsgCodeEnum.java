package com.tower.enums;
/**
 * ��Ϣ����ö��
 * @author my
 *
 */
public enum MsgCodeEnum {
	
	SERVICE_SUCCESS_CODE("1000" , "操作成功"),
	SERVICE_FAIL_CODE("1100" , "操作失败");
	
    private String name;  
    private String blackValue;  
    private MsgCodeEnum(String name, String blackValue) {  
        this.name = name;  
        this.blackValue = blackValue;  
    }  
    
    public String getName() {
		return name;
	}
    public String getBlackValue() {
		return blackValue;
	}
}
