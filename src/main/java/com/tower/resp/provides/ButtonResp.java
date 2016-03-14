package com.tower.resp.provides;

import java.io.Serializable;

public class ButtonResp implements Serializable{

	/*按钮主键*/
	private String buttonId ; 
	/*按钮标签*/
	private String buttonTagAttr;
	/*按钮name属性*/
	private String buttonNameAttr;
	/*按钮value属性*/
	private String buttonValueAttr;
	
	public String getButtonId() {
		return buttonId;
	}
	public void setButtonId(String buttonId) {
		this.buttonId = buttonId;
	}
	public String getButtonTagAttr() {
		return buttonTagAttr;
	}
	public void setButtonTagAttr(String buttonTagAttr) {
		this.buttonTagAttr = buttonTagAttr;
	}
	public String getButtonNameAttr() {
		return buttonNameAttr;
	}
	public void setButtonNameAttr(String buttonNameAttr) {
		this.buttonNameAttr = buttonNameAttr;
	}
	public String getButtonValueAttr() {
		return buttonValueAttr;
	}
	public void setButtonValueAttr(String buttonValueAttr) {
		this.buttonValueAttr = buttonValueAttr;
	}
	
}
