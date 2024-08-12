
// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const chartsShowComponent = (props) => {
  const chartRef = useRef(null);
  
  const ret_data=props.data;
  useEffect(() => {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.current);
    // 设置图表配置项和数据
    const option = {
      title: {
        text: props.title ? props.title : '示例图表',
      },
      xAxis: {
        type: 'category',
        data: ret_data.x_data,
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true, // 不展示 y 轴标签数值
          formatter:function (bytes) {
            const kilobyte = 1000;
            const megabyte = kilobyte * 1000;
            const gigabyte = megabyte * 1000;
          
            if (bytes >= gigabyte) {
              return (bytes / gigabyte).toFixed(0) + ' G';
            } else if (bytes >= megabyte) {
              return (bytes / megabyte).toFixed(0) + ' M';
            } else if (bytes >= kilobyte) {
              return (bytes / kilobyte).toFixed(0) + ' K';
            } else {
              return bytes + ' ';
            }
          }           
      }
      },
      series:[{
        name: '示例数据',
        type: props.type ? props.type : 'line',
        smooth: true,
        data:ret_data.y_data,
      }]
    };

    // 使用配置项设置图表
    myChart.setOption(option);

    // 在组件卸载时销毁 ECharts 实例
    return () => {
      myChart.dispose();
    };
  }, [props]); // 空数组表示只在组件挂载时运行一次

  return <div ref={chartRef} style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px' }} />;
};

export default chartsShowComponent;
