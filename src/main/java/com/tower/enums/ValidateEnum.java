package com.tower.enums;

public enum ValidateEnum {
	VALIDATE_SUCCESS_CODE("1" , "validateSuccess"),
	VALIDATE_FAIL_CODE("-1" , "validateFail");
	
    private String blackValue;  
    private String blackDesc;  
    private ValidateEnum(String blackValue, String blackDesc) {  
        this.blackValue = blackValue;  
        this.blackDesc = blackDesc;  
    }  
    
   public String getBlackDesc() {
	   return blackDesc;
   }
    public String getBlackValue() {
		return blackValue;
	}
}
