package com.tower.controller.provides;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tower.controller.BaseController;
import com.tower.entity.provides.ButtonEntity;
import com.tower.entity.provides.ButtonRoleEntity;
import com.tower.req.provides.ButtonReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.resp.provides.ButtonResp;
import com.tower.service.provides.IButtonRoleService;
import com.tower.service.provides.IButtonService;

/**
 * 按钮管理Controller
 * @author my
 *
 */
@Controller
@RequestMapping("button")
public class ButtonController {
	@Resource
	private IButtonService buttonService;
	@Resource
	private IButtonRoleService buttonRoleService;
	/**
	 * 获取按钮列表
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("list.action")
	public PageResp list(ButtonReq req){
		return buttonService.queryButtonPage(req);
	}
	/**
	 * 新增按钮
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("saveButton.action")
	public MsgEntity saveButton(ButtonEntity buttonEntity){
		return buttonService.saveButton(buttonEntity);
	}
	/**
	 * 更新按钮
	 * @param menuEntity
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updButton.action")
	public MsgEntity updButton(ButtonEntity buttonEntity){
		return buttonService.updButton(buttonEntity);
	}
	/**
	 * 跳转到编辑模块页面并展示模块信息
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getButton.action")
	public ButtonEntity getButton(String buttonId){
		return buttonService.getButton(buttonId);
	}
	/**
	 * 获取当前用户角色当前菜单所能操作的按钮
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("queryButtons.action")
	public List<ButtonResp> queryButtons(){
		return buttonService.queryButtonByUrlAndRoles();
	}
	/**
	 * 删除按钮
	 * @param menuId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("delButton.action")
	public MsgEntity delButton(String buttonId){
		return buttonService.delButton(buttonId);
	}
	/**
	 * 查询按钮角色
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("queryButtonRoleList.action")
	public List<ButtonRoleEntity> queryButtonRoleList(String buttonId){
		return this.buttonRoleService.queryButtonRoleList(buttonId);
	}
	/**
	 * 新增模块角色
	 * @param req
	 * @return
	 */
	@ResponseBody
	@RequestMapping("batchButtonRole.action")
	public MsgEntity batchButtonRole(List<ButtonRoleEntity> mrList){
		return buttonRoleService.beathButtonRole(mrList);
	}
}
