import React, { useEffect } from "react";
import { Col, Row } from "antd";
import styled from "styled-components";
import * as echarts from "echarts";
import bar from "@/views/DashBoard/options/bar";
import line from "@/views/DashBoard/options/line";
import pie from "@/views/DashBoard/options/pie";
import { categoryGet, ICategoryParams } from "@/api/course";
export interface IDashBoardProps {}

export default function DashBoard(props: IDashBoardProps) {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(
      document.getElementById("bar") as HTMLDivElement
    );
    // 绘制图表
    myChart.setOption(bar);

    // 绘制折线图
    var lineChart = echarts.init(
      document.getElementById("line") as HTMLDivElement
    );
    lineChart.setOption(line);

    // 绘制饼状图
    var pieChart = echarts.init(
      document.getElementById("pie") as HTMLDivElement
    );
    categoryGet().then((res) => {
      // console.log(res);
      let arr = res.data.results.map((item: ICategoryParams) => {
        return { value: Math.round(Math.random() * 100), name: item.cateName };
      });
      pie.series[0].data = arr;
      pieChart.setOption(pie);
    });

    setTimeout(() => {
      myChart.resize();
      lineChart.resize();
      pieChart.resize();
    }, 100);

    window.addEventListener("resize", () => {
      myChart.resize();
      lineChart.resize();
      pieChart.resize();
    });
  }, []);
  return (
    <div>
      <Row>
        <Col span={24}>
          <Chart id="line"></Chart>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Chart id="bar"></Chart>
        </Col>
        <Col span={12}>
          <Chart id="pie"></Chart>
        </Col>
      </Row>
    </div>
  );
}

const Chart = styled.div`
  height: 300px;
  border: 1px solid #f1f1f1;
`;
