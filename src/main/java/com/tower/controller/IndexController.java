package com.tower.controller;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.tower.resp.chart.ChartResp;
import com.tower.resp.chart.PieChartResp;
import com.tower.resp.chart.PieDataEntity;
import com.tower.util.JacksonUtil;

@RequestMapping("index")
@Controller
public class IndexController {

	@Resource
	private JacksonUtil jacksonUtil;
	@RequestMapping("test.action")
	public void testJedis(){
	}
	@RequestMapping("test1.action")
	public void testGetJedis(){
	}

	@RequestMapping("index.action")
	public ModelAndView index(){
		System.out.println("------------");
		ModelAndView mav = new ModelAndView("/index.jsp");
		/*---------------------构造双线图开始----------------------*/
		List<ChartResp> respList = new ArrayList<ChartResp>(2);
		ChartResp resp = new ChartResp();
		resp.setName("销量");
		resp.setType("line");
		List<Long> l = new ArrayList<Long>();
		l.add(100L);
		l.add(120L);
		l.add(70L);
		l.add(60L);
		l.add(200L);
		l.add(130L);
		resp.setData(l);
		respList.add(resp);
		resp = new ChartResp();
		resp.setName("xiaoliang");
		resp.setType("line");
		List<Long> l1 = new ArrayList<Long>();
		l1.add(80L);
		l1.add(90L);
		l1.add(75L);
		l1.add(63L);
		l1.add(75L);
		l1.add(63L);
		resp.setData(l1);
		respList.add(resp);
		mav.addObject("data3", jacksonUtil.bean2Json(respList));
		/*---------------------构造双线图结束----------------------*/
		/*---------------------构造双柱图开始----------------------*/
		respList = new ArrayList<ChartResp>(2);
		resp = new ChartResp();
		resp.setName("销量");
		resp.setType("bar");
		l = new ArrayList<Long>();
		l.add(100L);
		l.add(120L);
		l.add(70L);
		l.add(60L);
		l.add(200L);
		l.add(130L);
		resp.setData(l);
		respList.add(resp);
		resp = new ChartResp();
		resp.setName("xiaoliang");
		resp.setType("bar");
		l1 = new ArrayList<Long>();
		l1.add(80L);
		l1.add(90L);
		l1.add(75L);
		l1.add(63L);
		l1.add(75L);
		l1.add(63L);
		resp.setData(l1);
		respList.add(resp);
		mav.addObject("data0", jacksonUtil.bean2Json(respList));
		/*---------------------构造双柱图结束----------------------*/
		/*---------------------构造柱线图开始----------------------*/
		respList = new ArrayList<ChartResp>(2);
		resp = new ChartResp();
		resp.setName("销量");
		resp.setType("line");
		l = new ArrayList<Long>();
		l.add(100L);
		l.add(120L);
		l.add(70L);
		l.add(60L);
		l.add(200L);
		l.add(130L);
		resp.setData(l);
		respList.add(resp);
		resp = new ChartResp();
		resp.setName("xiaoliang");
		resp.setType("bar");
		l1 = new ArrayList<Long>();
		l1.add(80L);
		l1.add(90L);
		l1.add(75L);
		l1.add(63L);
		l1.add(75L);
		l1.add(63L);
		resp.setData(l1);
		respList.add(resp);
		mav.addObject("data2", jacksonUtil.bean2Json(respList));
		/*---------------------构造柱线图结束----------------------*/
		/*--------------------------构造饼图开始--------------------------*/
		PieChartResp pie = new PieChartResp();
		pie.setName("饼图");
		pie.setType("pie");
		List<PieDataEntity> pieList = new ArrayList<PieDataEntity>();
		PieDataEntity p = new PieDataEntity();
		p.setName("a1");
		p.setValue(100L);
		pieList.add(p);
		p = new PieDataEntity();
		p.setName("a2");
		p.setValue(200L);
		pieList.add(p);
		p = new PieDataEntity();
		p.setName("a3");
		p.setValue(80L);
		pieList.add(p);
		p = new PieDataEntity();
		p.setName("a4");
		p.setValue(120L);
		pieList.add(p);
		pie.setData(pieList);
		mav.addObject("data1", jacksonUtil.bean2Json(pie));
		/*--------------------------构造饼图结束--------------------------*/
		return mav;
	}
}
