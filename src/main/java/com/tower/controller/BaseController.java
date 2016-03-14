package com.tower.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

public class BaseController {

	@Resource
	protected HttpServletRequest request;
	@Resource
	protected HttpSession session;
}
