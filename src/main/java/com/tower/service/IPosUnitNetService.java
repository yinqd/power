package com.tower.service;

import com.tower.resp.PosUnitNetResp;

import java.util.List;

/**
 * 网点信息表DAO
 */
public interface IPosUnitNetService {
    /**
     * 查询全部网店代理对象
     * @return
     */
    public  List<PosUnitNetResp> queryUnitNetRespList();
}