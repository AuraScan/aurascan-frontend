
// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import { Card} from 'react-bootstrap'
import * as echarts from 'echarts';

const chartsShowComponent = (props) => {
  if (!props.data.hasOwnProperty('x_data')) {
    return <div  style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px', textAlign:'center' }} >nodata</div>;
  }
  if(props.data.x_data && props.data.x_data.length==0){
    return <div  style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px', textAlign:'center' }} >nodata</div>;
  }
  const chartRef = useRef(null);

  useEffect(() => {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.current);
    // 设置图表配置项和数据
    const option = {
      title: {
        text: props.title ? props.title : '示例图表',
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

  return <Card  style={{marginBottom:'15px'}}><div ref={chartRef} style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px' }} /></Card>;
};

export default chartsShowComponent;
