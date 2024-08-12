
// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const chartsShowComponent = (props) => {
  if(props.data.y_data.length==0){
        return <div  style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px', textAlign:'center' }} >nodata</div>;
  }
  const chartRef = useRef(null);
  const charData = props.data;
  useEffect(() => {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.current);
   
    // 设置图表配置项和数据
    const option = {
        title: {
        text: props.title ? props.title : 'chart',
        },
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'vertical',
        //   left: 'left'
        // },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: charData.y_data?charData.y_data:[],
            // [
            //   { value: 1048, name: 'Search Engine' },
            //   { value: 735, name: 'Direct' },
            //   { value: 580, name: 'Email' },
            //   { value: 484, name: 'Union Ads' },
            //   { value: 300, name: 'Video Ads' }
            // ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 1)'
              }
            }
          }
        ]
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
