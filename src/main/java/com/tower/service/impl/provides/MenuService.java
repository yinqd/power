package com.tower.service.impl.provides;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IMenuDAO;
import com.tower.dao.provides.IMenuRoleDAO;
import com.tower.entity.provides.MenuEntity;
import com.tower.entity.provides.MenuRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.req.provides.MenuReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.resp.provides.MenuResp;
import com.tower.service.BaseService;
import com.tower.service.provides.IMenuRoleService;
import com.tower.service.provides.IMenuService;
@Service
public class MenuService extends BaseService implements IMenuService{

	@Resource
	private IMenuDAO menuDAO;
	@Resource
	private IMenuRoleDAO menuRoleDAO;
	@Resource
	private IMenuRoleService menuRoleService;
	
	public PageResp queryMenuPage(MenuReq req) {
		logger.info(getMethodPath() + ".Info Inner Params :" + req.toString());
		PageResp pr = new PageResp();
		pr.setData(this.menuDAO.queryMenuList(req));
		pr.setRecordCount(this.menuDAO.queryMenuCount(req));
		return pr;
	}

	public MsgEntity saveMenu(MenuEntity menuEntity) {
		MsgEntity msg = new MsgEntity();
		if(menuEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".menuEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + menuEntity);
		try {
			Long menuId = System.nanoTime();
			menuEntity.setModuleId(menuId.toString());
			menuEntity.setModifyNo(getLoginUserId().toString());
			menuEntity.setOperNo(getLoginUserId().toString());
			this.menuDAO.saveMenu(menuEntity);
			
			/*新增菜单权限*/
			if(!CollectionUtils.isEmpty(menuEntity.getRoles())){
				List<MenuRoleEntity> menuRoles = new ArrayList<MenuRoleEntity>(2);
				MenuRoleEntity menuRole;
				for(Iterator<String> it = menuEntity.getRoles().iterator() ; it.hasNext();){
					menuRole = new MenuRoleEntity();
					menuRole.setMenuId(menuId.toString());
					menuRole.setRoleId(it.next());
					menuRole.setStatusFlag("1");
					menuRoles.add(menuRole);
				}
				
				menuRoleDAO.beathMenuRole(menuRoles);
			}
			
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			e.printStackTrace();
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		return msg;
	}

	public MsgEntity updMenu(MenuEntity menuEntity) {
		MsgEntity msg = new MsgEntity();
		if(menuEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".menuEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + menuEntity);
		try {
			menuEntity.setOperNo(getLoginUserId().toString());
			this.menuDAO.updateMenu(menuEntity);
			
			/*更新菜单权限*/
			if(!CollectionUtils.isEmpty(menuEntity.getRoles())){
				List<MenuRoleEntity> menuRoles = new ArrayList<MenuRoleEntity>(2);
				MenuRoleEntity menuRole;
				for(Iterator<String> it = menuEntity.getRoles().iterator() ; it.hasNext();){
					menuRole = new MenuRoleEntity();
					menuRole.setMenuId(menuEntity.getMenuId());
					menuRole.setRoleId(it.next());
					menuRole.setStatusFlag("1");
					menuRoles.add(menuRole);
				}
				
				menuRoleService.beathMenuRole(menuRoles);
			}
			
			msg.setCode(MsgCodeEnum.SERVICE_SUCCESS_CODE);
			msg.setMsg("操作成功");
		} catch (Exception e) {
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			e.printStackTrace();
			logger.error(getMethodPath() + ".error:" + e.getMessage());
		}
		return msg;
	}

	/**
	 * 删除菜单
	 */
	public MsgEntity delMenu(String menuId) {
		MenuEntity menuEntity = new MenuEntity ();
		menuEntity.setMenuId(menuId);
		menuEntity.setStatusFlag("-1");
		menuEntity.setOperNo(getLoginUserId().toString());
		return updMenu(menuEntity);
	}
	/**
	 * 获取所有的一级菜单
	 */
	public List<MenuResp> queryOneMenuList() {
		return menuDAO.queryOneMenuList();
	}

	/**
	 * 获取指定的菜单基础信息
	 */
	public MenuEntity getMenu(String menuId) {
		return menuDAO.getMenu(menuId);
	}

	public List<MenuEntity> getMenuByUrlAndRole(String menuUrl,
			Set<String> roles) {
		// TODO Auto-generated method stub
		return menuDAO.getMenuByUrlAndRole(menuUrl, roles);
	}

}
