package com.tower.controller.provides;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tower.controller.BaseController;
import com.tower.entity.provides.RoleEntity;
import com.tower.req.provides.RoleReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.provides.IRoleService;
@Controller
@RequestMapping("role")
public class RoleController extends BaseController{

	@Resource
	private IRoleService roleService;
	/**
	 * 获取权限列表
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("list.action")
	public PageResp list(RoleReq req){
		return roleService.queryRolePage(req);
	}
	/**
	 * 获取所有的角色
	 * @return
	 */
	@ResponseBody
	@RequestMapping("allRolelist.action")
	public List<RoleEntity> queryAllRoleList(){
		return roleService.queryAllRoleList();
	}
	/**
	 * 新增角色
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("saveRole.action")
	public MsgEntity saveRole(RoleEntity roleEntity){
		return roleService.saveRole(roleEntity);
	}
	/**
	 * 更新角色
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updRole.action")
	public MsgEntity updRole(RoleEntity roleEntity){
		return roleService.updRole(roleEntity);
	}
	/**
	 * 跳转到编辑角色页面并展示菜单信息
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updShow.action")
	public ModelAndView updRoleShow(String roleId){
		ModelAndView mav = new ModelAndView();
		mav.addObject("role" , roleService.getRole(roleId));
		return mav;
	}
	/**
	 * 删除角色
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("delRole.action")
	public MsgEntity delMenu(String roleId){
		return roleService.delRole(roleId);
	}

}
