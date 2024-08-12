
// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const chartsShowComponent = (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.current);
    // 设置图表配置项和数据
    const option = {
      title: {
        text: props.title ? props.title : '示例图表',
      },
      legend: {
        data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
      },
      xAxis: {
        data: ['A', 'B', 'C', 'D', 'E'],
      },
      yAxis: {
        type: 'value',
      },
      series: [{
        name: '示例数据',
          type: props.type ? props.type : 'bar',
        smooth: true,
        data: [5, 20, 36, 10, 10],
      }],
    };

    // 使用配置项设置图表
    myChart.setOption(option);

    // 在组件卸载时销毁 ECharts 实例
    return () => {
      myChart.dispose();
    };
  }, []); // 空数组表示只在组件挂载时运行一次

  return <div ref={chartRef} style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px' }} />;
};

export default chartsShowComponent;
