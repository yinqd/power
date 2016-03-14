package com.tower.dao;
import java.util.List;
import com.tower.resp.PosUnitNetResp;
/**
 * 网点信息表DAO
 */
public interface IPosUnitNetDAO {
    /**
     * 查询全部网店代理对象
     * @return
     */
    public  List<PosUnitNetResp> queryUnitNetRespList();
}