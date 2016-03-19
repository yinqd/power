package com.tower.service;

import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.tower.util.JacksonUtil;

public class BaseService {
	protected Logger logger = LoggerFactory.getLogger(this.getClass());
	@Resource
	protected JacksonUtil jacksonUtil;
	@Resource
	protected HttpServletRequest request;
	@Resource
	protected HttpSession session;
	/**
	 * 获取路径
	 * @return
	 */
	protected String getMethodPath() {
        String path = "";
        try {
            StackTraceElement[] st = new Exception().getStackTrace();
            if (st.length > 1) {
                path = st[1].getClassName().substring(
                        st[1].getClassName().lastIndexOf(".") + 1)
                        + "." + st[1].getMethodName();
            }
        } catch (Exception e) {
            logger.error("BaseService.getMethodPath().Exception :" + e) ;
        }
        return path;
    }
	/**
	 * 获取当前用户的ID
	 * @return
	 */
	protected Long getLoginUserId(){
		try {
			return Long.parseLong(request.getSession().getAttribute("userId").toString());
		} catch (Exception e) {
		}
		return 0L;
	}
	/**
	 * 获取当前用户的用户名
	 * @return
	 */
	protected String getLoginUserName() {
		try {
			return request.getSession().getAttribute("userName").toString();
		} catch (Exception e) {
		}
		return "admin";
	}
	/**
	 * 获取当前用户权限
	 * @return
	 */
	protected Set<String> getRoles() {
		try {
			return (Set<String>)request.getSession().getAttribute("roles");
		} catch (Exception e) {
		}
		return null;
	}
}