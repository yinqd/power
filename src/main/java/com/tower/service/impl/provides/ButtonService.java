package com.tower.service.impl.provides;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.tower.dao.provides.IButtonDAO;
import com.tower.dao.provides.IButtonRoleDAO;
import com.tower.entity.provides.ButtonEntity;
import com.tower.entity.provides.ButtonRoleEntity;
import com.tower.enums.MsgCodeEnum;
import com.tower.req.provides.ButtonReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;
import com.tower.service.BaseService;
import com.tower.service.provides.IButtonRoleService;
import com.tower.service.provides.IButtonService;
@Service
public class ButtonService extends BaseService implements IButtonService{

	@Resource
	private IButtonDAO buttonDAO;
	@Resource
	private IButtonRoleDAO buttonRoleDAO;
	@Resource
	private IButtonRoleService buttonRoleService;
	
	public PageResp queryButtonPage(ButtonReq req) {
		logger.info(getMethodPath() + ".Info Inner Params :" + req.toString());
		PageResp pr = new PageResp();
		pr.setData(this.buttonDAO.queryButtonList(req));
		pr.setRecordCount(this.buttonDAO.queryButtonCount(req));
		return pr;
	}

	public MsgEntity saveButton(ButtonEntity buttonEntity) {
		MsgEntity msg = new MsgEntity();
		if(buttonEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".buttonEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + buttonEntity);
		try {
			Long buttonId = System.nanoTime();
			buttonEntity.setButtonId(buttonId.toString());
			buttonEntity.setModifyNo(getLoginUserId().toString());
			buttonEntity.setOperNo(getLoginUserId().toString());
			this.buttonDAO.saveButton(buttonEntity);
			
			/*新增菜单权限*/
			if(!CollectionUtils.isEmpty(buttonEntity.getRoles())){
				List<ButtonRoleEntity> buttonRoles = new ArrayList<ButtonRoleEntity>(2);
				ButtonRoleEntity buttonRole;
				for(Iterator<String> it = buttonEntity.getRoles().iterator() ; it.hasNext();){
					buttonRole = new ButtonRoleEntity();
					buttonRole.setButtonId(buttonId.toString());
					buttonRole.setRoleId(it.next());
					buttonRole.setStatusFlag("1");
					buttonRoles.add(buttonRole);
				}
				
				buttonRoleDAO.batchButtonRole(buttonRoles);
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

	public MsgEntity updButton(ButtonEntity buttonEntity) {
		MsgEntity msg = new MsgEntity();
		if(buttonEntity == null){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".buttonEntity is empty");
			return msg;
		}
		logger.info(getMethodPath() + ".Info Inner Params" + buttonEntity);
		try {
			buttonEntity.setOperNo(getLoginUserId().toString());
			this.buttonDAO.updButton(buttonEntity);
			
			/*更新菜单权限*/
			if(!CollectionUtils.isEmpty(buttonEntity.getRoles())){
				List<ButtonRoleEntity> buttonRoles = new ArrayList<ButtonRoleEntity>(2);
				ButtonRoleEntity buttonRole;
				for(Iterator<String> it = buttonEntity.getRoles().iterator() ; it.hasNext();){
					buttonRole = new ButtonRoleEntity();
					buttonRole.setButtonId(buttonEntity.getMenuId());
					buttonRole.setRoleId(it.next());
					buttonRole.setStatusFlag("1");
					buttonRoles.add(buttonRole);
				}
				
				buttonRoleService.beathButtonRole(buttonRoles);
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
	public MsgEntity delButton(String buttonId) {
		logger.info(getMethodPath() + ".Info Inner Params:buttonId=" + buttonId);

		MsgEntity msg = new MsgEntity();
		if(StringUtils.isBlank(buttonId)){
			msg.setCode(MsgCodeEnum.SERVICE_FAIL_CODE);
			msg.setMsg("操作失败");
			logger.info(getMethodPath() + ".buttonEntity is empty");
			return msg;
		}
		
		try {
			ButtonEntity buttonEntity = new ButtonEntity ();
			buttonEntity.setButtonId(buttonId);
			buttonEntity.setStatusFlag("-1");
			buttonEntity.setOperNo(getLoginUserId().toString());
			this.buttonDAO.updButton(buttonEntity);
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

	public ButtonEntity getButton(String buttonId) {
		logger.info(getMethodPath() + ".Info Inner Params:buttonId=" + buttonId);
		return buttonDAO.getButton(buttonId);
	}

}
