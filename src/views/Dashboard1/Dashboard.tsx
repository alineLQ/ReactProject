import { Col, Row } from "antd";
import React, { useEffect } from "react";
import styled from "styled-components";
import * as echarts from "echarts";
import bar from "./options/bar";
import line from "./options/line";
import pie from "./options/pie";
import { categoryGet, ICategoryParams } from "@/api/course";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  useEffect(() => {
    // 绘制柱状图
    var myChart = echarts.init(document.getElementById("bar"));

    myChart.setOption(bar);
    // 绘制折线图
    var lineChart = echarts.init(document.getElementById("line"));
    // 绘制柱状图
    lineChart.setOption(line);
    // 绘制折线图
    var pieChart = echarts.init(document.getElementById("pie"));
    // 绘制柱状图

    categoryGet().then((res) => {
      let arr = res.data.results.map((item: ICategoryParams) => {
        return { value: Math.random() * 100, name: item.cateName };
      });
      pie.series[0].data = arr;
      pieChart.setOption(pie);
    });

    // 设置延迟事件，让图标适应容器的大小
    setTimeout(() => {
      myChart.resize();
      myChart.resize();
      pieChart.resize();
    }, 100);
  }, []);
  return (
    <div>
      <Row>
        <Col span={24}>
          <Chart id="line" />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Chart id="bar" />
        </Col>
        <Col span={12}>
          <Chart id="pie" />
        </Col>
      </Row>
    </div>
  );
}

const Chart = styled.div`
height : 300px 
border : 1px solid #f1f1f1
`;
