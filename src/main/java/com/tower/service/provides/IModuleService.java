package com.tower.service.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.ModuleEntity;
import com.tower.resp.MsgEntity;
/**
 * 模块管理Service
 * @author my
 *
 */
public interface IModuleService {
	/**
	 * 查询所有模块信息
	 * @return
	 */
	public List<ModuleEntity> queryModuleList();
	/**
	 * 获取指定的模块
	 * @param moduleId
	 * @return
	 */
	public ModuleEntity getModule(@Param("moduleId")String moduleId);
	/**
	 * 根据链接获取模块
	 * @param moduleUrl
	 * @return
	 */
	public ModuleEntity getModuleByUrl(@Param("moduleUrl")String moduleUrl);
	/**
	 * 新增模块
	 * @param moduleEntity
	 */
	public MsgEntity saveModule(ModuleEntity moduleEntity);
	/**
	 * 更新模块
	 * @param moduleEntity
	 */
	public MsgEntity updModule(ModuleEntity moduleEntity);
	/**
	 * 删除模块
	 * @param moduleId
	 * @return
	 */
	public MsgEntity delModule(String moduleId);
	/**
	 * 根据链接和权限 获取模块
	 * @param moduleUrl
	 * @param roles
	 * @return
	 */
	public Integer getModuleByIdAndRole (String moduleId , Set<String> roles);
}
