package com.tower.controller.provides;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tower.entity.provides.ModuleEntity;
import com.tower.entity.provides.ModuleRoleEntity;
import com.tower.resp.MsgEntity;
import com.tower.service.provides.IModuleRoleService;
import com.tower.service.provides.IModuleService;

/**
 * 模块管理Controller
 * @author my
 *
 */
@Controller
@RequestMapping("module")
public class ModuleController {
	@Resource
	private IModuleService moduleService;
	@Resource
	private IModuleRoleService moduleRoleService;
	/**
	 * 获取模块列表
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("list.action")
	public List<ModuleEntity> list(){
		return moduleService.queryModuleList();
	}
	/**
	 * 新增模块
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("saveModule.action")
	public MsgEntity saveModule(ModuleEntity moduleEntity){
		return moduleService.saveModule(moduleEntity);
	}
	/**
	 * 更新模块
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updModule.action")
	public MsgEntity updModule(ModuleEntity moduleEntity){
		return moduleService.updModule(moduleEntity);
	}
	/**
	 * 跳转到编辑模块页面并展示模块信息
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getModule.action")
	public ModuleEntity updModuleShow(String moduleId){
		return moduleService.getModule(moduleId);
	}
	/**
	 * 删除模块
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("delMenu.action")
	public MsgEntity delMenu(String moduleId){
		return moduleService.delModule(moduleId);
	}
	/**
	 * 查询模块角色
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("queryModuleRoleList.action")
	public List<ModuleRoleEntity> queryModuleRoleList(String moduleId){
		return this.moduleRoleService.queryModuleRoleList(moduleId);
	}
	/**
	 * 新增模块角色
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("batchModuleRole.action")
	public MsgEntity batchModuleRole(List<ModuleRoleEntity> mrList){
		return moduleRoleService.beathModuleRole(mrList);
	}
}
