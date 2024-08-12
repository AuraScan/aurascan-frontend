
// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const chartsBar = (props) => {
  if (!props.data.hasOwnProperty('y_data')) {
    return <div  style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px', textAlign:'center' }} >nodata</div>;
  }
  if(props.data.y_data && props.data.y_data.length==0){
    return <div  style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px', textAlign:'center' }} >nodata</div>;
  }
  const chartRef = useRef(null);

  useEffect(() => {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.current);
    const charData = props.data
    // console.log("charData>>>>>",charData)
    // 设置图表配置项和数据
    const option = {
        title: {
            text: props.title ? props.title : '',
        },
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        // },
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
//           visualMap: {
//     orient: 'horizontal',
//     left: 'center',
//     min: charData.min,
//     max: charData.max,
//     text: ['High Score', 'Low Score'],
//     // Map the score column to color
//     dimension: 0,
//     inRange: {
//       color: [          '#00008b',
//       '#f00',
//       '#ffde00',
//       '#002a8f',
//       '#003580',
//       '#ed2939',
//       '#000',
//       '#003897',
//       '#f93',
//       '#bc002d','#00008b','#f00',
//       '#ffde00', '#FFCE34', '#FD665F']
//     }
//   },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
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
        yAxis: {
            type: 'category',
            data: charData.y_data ? charData.y_data : [],
            // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
          },
        series: charData.series_data ? charData.series_data : [],
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

export default chartsBar;
