package com.tower.service.provides;

import com.tower.entity.provides.ButtonEntity;
import com.tower.req.provides.ButtonReq;
import com.tower.resp.MsgEntity;
import com.tower.resp.PageResp;

/**
 * 按钮管理Service
 * @author my
 *
 */
public interface IButtonService {

	/**
	 * 分页查询按钮
	 * @param req
	 * @return
	 */
	public PageResp queryButtonPage(ButtonReq req);
	/**
	 * 获取指定的按钮信息
	 * @param buttonId
	 * @return
	 */
	public ButtonEntity getButton(String buttonId);
	/**
	 * 新增按钮
	 * @param buttonEntity
	 * @return
	 */
	public MsgEntity saveButton(ButtonEntity buttonEntity);
	/**
	 * 修改按钮
	 * @param buttonEntity
	 * @return
	 */
	public MsgEntity updButton(ButtonEntity buttonEntity);
	/**
	 * 删除按钮
	 * @param buttonEntity
	 * @return
	 */
	public MsgEntity delButton(String buttonId);
}
