package com.tower.service.impl.provides;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IMenuRoleDAO;
import com.tower.dao.provides.IModuleRoleDAO;
import com.tower.dao.provides.IUserRoleDAO;
import com.tower.resp.provides.MenuResp;
import com.tower.resp.provides.ModuleResp;
import com.tower.service.BaseService;
import com.tower.service.provides.IHomeService;
@Service("homeService")
public class HomeService extends BaseService implements IHomeService{
	@Resource
	private IUserRoleDAO userRoleDAO;
	@Resource
	private IModuleRoleDAO moduleRoleDAO;
	@Resource
	private IMenuRoleDAO menuRoleDAO;
	/**
	 * 跳转到首页执行Service
	 */
	public Map<String , Object> toHome(){
		Map<String , Object> map = new HashMap<String , Object>(2);
		/*查询用户所有权限，并存储在session中*/
		Set<String> userRoleSet = userRoleDAO.queryRoleByUser(getLoginUserId().toString());
		session.setAttribute("role", userRoleSet);
		if(!CollectionUtils.isEmpty(userRoleSet)){
			/*获取用户权限所能管控的模块URL，不必存储session*/
			List<ModuleResp> moduleList = moduleRoleDAO.queryModuleByRole(userRoleSet);
			map.put("module", moduleList);
			/*获取用户权限所能管控的菜单URL，不必存储session*/
			if(!CollectionUtils.isEmpty(moduleList)){
				List<MenuResp> menuList = menuRoleDAO.queryMenuByRoleAndModule(userRoleSet, moduleList.get(0).getModuleId());
				map.put("menu", menuList);
			}
		}
		return map;
	}
	/**
	 * 获取指定模块当前用户所能获取的菜单
	 */
	public Map<String, Object> changeModule(String moduleId) {
		Map<String , Object> map = new HashMap<String , Object>(1);
		Set<String> userRoleSet = (Set<String>)session.getAttribute("role");
		if(!CollectionUtils.isEmpty(userRoleSet)){
			/*获取用户权限所能管控的菜单URL，不必存储session*/
			List<MenuResp> menuList = menuRoleDAO.queryMenuByRoleAndModule(userRoleSet, moduleId);
			map.put("menu", menuList);
		}
		return map;
	}
}
