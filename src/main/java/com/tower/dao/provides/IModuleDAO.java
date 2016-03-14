package com.tower.dao.provides;

import java.util.List;
import java.util.Set;

import org.apache.ibatis.annotations.Param;

import com.tower.entity.provides.ModuleEntity;

/**
 * 模块管理
 * @author my
 *
 */
public interface IModuleDAO {
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
	 * @param moduleId
	 * @return
	 */
	public ModuleEntity getModuleByUrl(@Param("moduleUrl")String moduleUrl);
	/**
	 * 获取指定的菜单
	 * @param moduleUrl
	 * @return
	 */
	public Integer getModuleByIdAndRole(@Param("moduleId")String moduleId , Set<String> roles);
	/**
	 * 新增模块
	 * @param moduleEntity
	 */
	public void saveModule(ModuleEntity moduleEntity);
	/**
	 * 更新模块
	 * @param moduleEntity
	 */
	public void updModule(ModuleEntity moduleEntity);
}
