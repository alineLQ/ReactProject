import * as echarts from "echarts";

let xdata = [];
let ydata = [];

for (let i = 9; i <= 17; i++) {
  xdata.push(`${i}:00`);
  ydata.push(Math.round(Math.random() * 500 + 500));
}

export default {
  title: {
    text: "在线学习人数",
  },
  tooltip: {},
  xAxis: {
    data: xdata,
  },
  yAxis: {},
  grid: {
    right: "3%",
    bottom: 30,
  },
  series: [
    {
      name: "销量",
      type: "bar",
      data: ydata,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "#83bff6" },
          { offset: 0.5, color: "#188df0" },
          { offset: 1, color: "#188df0" },
        ]),
      },
      emphasis: {
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#2378f7" },
            { offset: 0.7, color: "#2378f7" },
            { offset: 1, color: "#83bff6" },
          ]),
        },
      },
    },
  ],
};
