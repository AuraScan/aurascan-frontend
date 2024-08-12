
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
        text: props.title ? props.title : '2024-03-12 15:00',
        left:'right',
        textStyle: {
          color: '#bdbdbd', // 标题文字颜色
          fontSize: 12, // 标题文字大小
          shadowBlur: 10, // 阴影模糊大小
          shadowColor: 'rgba(0, 0, 0, 0.5)', // 阴影颜色
          shadowOffsetX: 3, // 阴影水平偏移
          shadowOffsetY: 3 // 阴影垂直偏移
          // 可以添加其他样式属性，如fontWeight、fontFamily等
       }
      },
      xAxis: 
      {
        type: 'category',
        boundaryGap:false,
        data: ['A', 'B', 'C', 'D', 'E'],
        axisLabel:{show:false},
        axisLine:{show:false}
      },
      yAxis:{
        type: 'value',
        axisLine:{show:false},
        axisLabel:{show:false},
        splitLine:{show:false},
        axisTick:{show:false}
      } ,
      series: [{
        // name: '2024-03-12',
        symbol:'none',
        type: props.type ? props.type : 'bar',
        smooth: true,
        itemStyle:{
          width:'0.5px',
          color:'#0E9CFF'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                  {
                      offset: 0,
                      color: 'rgba(14, 156, 255, 0.15)',
                  },
                  {
                      offset: 1,
                      color: 'rgba(14, 156,255,0)',
                  },
              ],
              false),
        },
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

  return <div ref={chartRef} style={{ height: '200px', width:'100%',paddingTop:'0px',paddingLeft:'10px',marginBottom:'-60px' }} />;
};

export default chartsShowComponent;
