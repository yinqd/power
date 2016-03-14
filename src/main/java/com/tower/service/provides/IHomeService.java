package com.tower.service.provides;

import java.util.Map;

public interface IHomeService {
	/**
	 * 跳转到首页
	 * @return
	 */
	public Map<String , Object> toHome();
	/**
	 * 获取指定模块下当前用户可操作的链接
	 * @param moduleId
	 * @return
	 */
	public Map<String , Object> changeModule(String moduleId);
}
