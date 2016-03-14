package com.tower.filters;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;

import com.tower.service.ITerminalDlsczService;

/**
 * 过滤器
 *
 */
public class CalmFilter implements Filter{
	
	private static Logger logger = LoggerFactory.getLogger(CalmFilter.class);
	//不用过滤的地址
	private String[] exclude = {};
	
	public void destroy() {
	}

	/**
	 * 执行具体的过滤操作
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest)request;
		HttpServletResponse resp = (HttpServletResponse)response;
		if (excludeURI(req)) 
			chain.doFilter(req, resp);
		else
			chain.doFilter(new XssHttpServletRequestWrapper(req), resp);
	}
	
	//判断地址是否不需要xss过滤  
	private boolean excludeURI(HttpServletRequest req) {
		String uri = req.getRequestURI();
		for (String s : exclude) {
			if (uri.contains(s)) {
				return true;
			}
		}
		return false;
	}

	public void init(FilterConfig filterConfig) throws ServletException {}
}
