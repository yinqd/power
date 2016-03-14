package com.tower.dao.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.ButtonEntity;
import com.tower.req.provides.ButtonReq;

public interface IButtonDAO {

	/**
	 * 分页查询按钮
	 * @param req
	 * @return
	 */
	public List<ButtonEntity> queryButtonList(ButtonReq req);
	/**
	 * 查询按钮的数量
	 * @param req
	 * @return
	 */
	public Integer queryButtonCount(ButtonReq req);
	/**
	 * 查询指定按钮的基础信息
	 * @param buttonId
	 * @return
	 */
	public ButtonEntity getButton(@Param("buttonId")String buttonId);
	/**
	 * 新增按钮
	 * @param buttonEntity
	 */
	public void saveButton(ButtonEntity buttonEntity);
	/**
	 * 修改按钮
	 * @param buttonEntity
	 */
	public void updButton(ButtonEntity buttonEntity);
}
