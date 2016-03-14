package com.tower.resp;

import com.tower.enums.MsgCodeEnum;

public class MsgEntity {
	/*����*/
	private MsgCodeEnum code;
	/*��Ϣ*/
	private String msg;
	/*����*/
	private String data;
	
	public MsgCodeEnum getCode() {
		return code;
	}
	public void setCode(MsgCodeEnum code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
}
