package com.tower.entity.provides;

import com.tower.entity.BaseEntity;

/**
 * 角色实体
 * @author my
 *
 */
public class RoleEntity extends BaseEntity{

	/*角色主键*/
	private String roleId;
	/*角色名称*/
	private String roleName;
	/*角色描述*/
	private String roleDesc;
	/*入库时间*/
	private String modifyTime;
	/*录入人*/
	private String modifyNo;
	/*修改时间*/
	private String operTime;
	/*修改人*/
	private String operNo;
	private String statusFlag;
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getRoleDesc() {
		return roleDesc;
	}
	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}
	public String getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	public String getModifyNo() {
		return modifyNo;
	}
	public void setModifyNo(String modifyNo) {
		this.modifyNo = modifyNo;
	}
	public String getOperTime() {
		return operTime;
	}
	public void setOperTime(String operTime) {
		this.operTime = operTime;
	}
	public String getOperNo() {
		return operNo;
	}
	public void setOperNo(String operNo) {
		this.operNo = operNo;
	}
	public String getStatusFlag() {
		return statusFlag;
	}
	public void setStatusFlag(String statusFlag) {
		this.statusFlag = statusFlag;
	}
	@Override
	public String toString() {
		StringBuffer buffer = new StringBuffer();
		buffer.append("roleId:【").append(roleId).append("】,");
		buffer.append("roleName:【").append(roleName).append("】,");
		buffer.append("roleDesc:【").append(roleDesc).append("】,");
		buffer.append("modifyTime:【").append(modifyTime).append("】,");
		buffer.append("modifyNo:【").append(modifyNo).append("】,");
		buffer.append("operTime:【").append(operTime).append("】,");
		buffer.append("operNo:【").append(operNo).append("】,");
		return buffer.toString();
	
	}
}
