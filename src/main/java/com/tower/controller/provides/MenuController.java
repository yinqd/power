package com.tower.controller.provides;

import java.util.List;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tower.entity.provides.MenuEntity;
import com.tower.entity.provides.MenuRoleEntity;
import com.tower.req.provides.MenuReq;
import com.tower.req.provides.MenuRoleReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.resp.provides.MenuResp;
import com.tower.service.provides.IMenuRoleService;
import com.tower.service.provides.IMenuService;
@Controller
@RequestMapping("menu")
public class MenuController {

	@Resource
	private IMenuService menuService;
	@Resource
	private IMenuRoleService menuRoleService;
	/**
	 * 获取菜单列表
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("list.action")
	public PageResp list(MenuReq req){
		return menuService.queryMenuPage(req);
	}
	/**
	 * 获取所有的一级菜单
	 * @return
	 */
	@ResponseBody
	@RequestMapping("allOneMenulist.action")
	public List<MenuResp> queryAllOneMenuList(){
		return menuService.queryOneMenuList();
	}
	/**
	 * 新增菜单
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("saveMenu.action")
	public MsgEntity saveMenu(MenuEntity menuEntity){
		return menuService.saveMenu(menuEntity);
	}
	/**
	 * 更新菜单
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updMenu.action")
	public MsgEntity updMenu(MenuEntity menuEntity){
		return menuService.updMenu(menuEntity);
	}
	/**
	 * 跳转到编辑菜单页面并展示菜单信息
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updShow.action")
	public ModelAndView updMenuShow(String menuId){
		ModelAndView mav = new ModelAndView();
		mav.addObject("menu" , menuService.getMenu(menuId));
		return mav;
	}
	/**
	 * 删除菜单
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("delMenu.action")
	public MsgEntity delMenu(String menuId){
		return menuService.delMenu(menuId);
	}
	/**
	 * 查询菜单角色
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("queryMenuRoleList.action")
	public List<MenuRoleEntity> queryMenuRoleList(MenuRoleReq req){
		return this.menuRoleService.queryMenuRoleList(req.getMenuId());
	}
	/**
	 * 新增菜单角色
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("batchMenuRole.action")
	public MsgEntity batchMenuRole(List<MenuRoleEntity> mrList){
		return menuRoleService.beathMenuRole(mrList);
	}
}
