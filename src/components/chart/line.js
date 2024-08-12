
// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ChartsLine = (props) => {
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
    const charData = props.data
    // 设置图表配置项和数据
    const option = {
        title: {
            text: props.title ? props.title : '',
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: charData.x_data ? charData.x_data : [],
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true, // 不展示 y 轴标签数值
            formatter:function (num) {
              let power_3=Math.pow(10,3)
              let power_6=Math.pow(10,6)
              if(num>power_6){
                return (num/power_6).toFixed(1)+"M"
              }else if(num>power_3){
                return (num/power_3).toFixed(1)+"K"
              }else{
                return num.toString();
              }
            }           
        }
        },
        series: charData.y_data ? charData.y_data : [],
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

export default ChartsLine;
