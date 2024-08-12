
// MyChartComponent.js
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const chartsPie = (props) => {
  if(props.data && props.data.length==0){
    return <div  style={{ height: '400px',paddingTop:'15px',paddingLeft:'10px', textAlign:'center' }} >nodata</div>;
  }
  const chartRef = useRef(null);

  useEffect(() => {
    // 初始化 ECharts 实例
    const myChart = echarts.init(chartRef.current);
    const charData = props.data
    // console.log("charData>>>>>",charData)
    // 设置图表配置项和数据
    // const option = {
    //     title: {
    //         text: props.title ? props.title : '',
    //     },
    //     tooltip: {
    //         trigger: 'item'
    //     },
    //     // legend: {
    //     //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
    //     // },
    //     grid: {
    //       left: '3%',
    //       right: '4%',
    //       bottom: '3%',
    //       containLabel: true
    //     },
    //     toolbox: {
    //       feature: {
    //         saveAsImage: {}
    //       }
    //     },
    //     xAxis: {
    //         type: 'value',
    //         boundaryGap: [0, 0.01],
    //         axisLabel: {
    //             show: true, // 不展示 y 轴标签数值
    //             formatter:function (bytes) {
    //               const kilobyte = 1000;
    //               const megabyte = kilobyte * 1000;
    //               const gigabyte = megabyte * 1000;
                
    //               if (bytes >= gigabyte) {
    //                 return (bytes / gigabyte).toFixed(0) + ' G';
    //               } else if (bytes >= megabyte) {
    //                 return (bytes / megabyte).toFixed(0) + ' M';
    //               } else if (bytes >= kilobyte) {
    //                 return (bytes / kilobyte).toFixed(0) + ' K';
    //               } else {
    //                 return bytes + ' ';
    //               }
    //             }           
    //         }
    //       },
    //     yAxis: {
    //         type: 'category',
    //         data: charData.y_data ? charData.y_data : [],
    //         // data: ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World']
    //       },
    //     series: charData.series_data ? charData.series_data : [],
    // };

    const option={
        title: {
          text: props.title ? props.title : '',
        //   subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: 
        [
          {
            name: props.name ? props.name : '',
            type: 'pie',
            radius: '50%',
            data:charData ? charData : [],
        // [
        //       { value: 1048, name: 'Search Engine' },
        //       { value: 735, name: 'Direct' },
        //       { value: 580, name: 'Email' },
        //       { value: 484, name: 'Union Ads' },
        //       { value: 300, name: 'Video Ads' }
        //  ]
          }
        ]
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

export default chartsPie;
