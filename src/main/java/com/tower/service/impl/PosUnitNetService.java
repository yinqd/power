package com.tower.service.impl;

import com.tower.dao.IPosUnitNetDAO;
import com.tower.resp.PosUnitNetResp;
import com.tower.service.IPosUnitNetService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by my on 2016/3/5.
 */
@Service("posUnitNetService")
public class PosUnitNetService implements IPosUnitNetService {
    @Resource
    private IPosUnitNetDAO posUnitNetDAO;
    public List<PosUnitNetResp> queryUnitNetRespList() {
        return posUnitNetDAO.queryUnitNetRespList();
    }
}
