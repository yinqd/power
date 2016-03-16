package com.tower.filters;

import java.io.PrintWriter;
import java.util.Set;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.tower.entity.provides.MenuEntity;
import com.tower.entity.provides.ModuleEntity;
import com.tower.service.provides.IMenuService;
import com.tower.service.provides.IModuleRoleService;
import com.tower.service.provides.IModuleService;

public class SafeFilter implements HandlerInterceptor{
	@Resource
	private IMenuService menuService;
	@Resource
	private IModuleService moduleService;
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		
//		/*获取访问的链接*/
//		String operUrl = request.getServletPath();
//		boolean navFlag = false;
//		String type = request.getParameter("type");
//		if(StringUtils.isNotBlank(type)
//				&&("module".equals(type) || "nav".equals(type))){
//			navFlag = true;
//		}
//		/**
//		 * 模块URL链接权限验证
//		 */
//		if(StringUtils.isNotBlank(type)
//				&& "module".equals(type) ){
//			ModuleEntity moduleEntity = moduleService.getModuleByUrl(operUrl);
//			if(moduleEntity == null){
//				//无效模块链接跳转到错误页面
//				return false;
//			}else{
//				/*当前链接无需验证，放行*/
//				if(StringUtils.isNotBlank(moduleEntity.getNeedFlag()) 
//						|| "0".equals(moduleEntity.getNeedFlag())){
//					return true;
//				}else{
//					if(request.getSession() == null ||
//							moduleService.getModuleByIdAndRole(moduleEntity.getModuleId(), request.getSession().getAttribute("roles") == null ? null : (Set<String>)request.getSession().getAttribute("roles")) == 0){
//						//无权限链接跳转到错误页面
//						return false;
//					}else{
//						return true;
//					}
//				}
//			}
//		}else{
//			MenuEntity menuEntity = menuService.getMenuByUrl(operUrl);
//			if(menuEntity == null){
//				//无效模块链接跳转到错误页面
//				return false;
//			}else{
//				/*当前链接无需验证，放行*/
//				if(StringUtils.isNotBlank(menuEntity.getNeedFlag()) 
//						|| "0".equals(menuEntity.getNeedFlag())){
//					return true;
//				}else{
//					if(request.getSession() == null ||
//							menuService.getMenuByIdAndRole(menuEntity.getMenuId(), request.getSession().getAttribute("roles") == null ? null : (Set<String>)request.getSession().getAttribute("roles")) == 0){
//						//如果是导航菜单跳转到错误页面
//						if(navFlag){
//							//无权限链接跳转到错误页面
//						}else{
//							PrintWriter out = response.getWriter();
//							try {
//								out.print("{\"code\" , \"3\"}");
//							} catch (Exception e) {
//								e.printStackTrace();
//							}finally{
//								out.close();
//							}
//						}
//						return false;
//					}else{
//						return true;
//					}
//				}
//			
//			}
//		}
	return  true;
	}

	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
	}

	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
	}}
