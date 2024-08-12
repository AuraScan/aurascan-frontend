
import React, { useState, useEffect } from 'react'

import { Row, Col, Card, Table } from 'react-bootstrap'
import ChartsLine from '@/pages/default/components/chartsLine'
import ChartsBar from '@/components/chart/bar'
import {randomNumberInRange} from '@/utils'

function ProgramsIndexShow() {
    const [loading, setLoading] = useState(true);
    const [programMonthData, setprogramMonthData] = useState({});
    const [programDayData, setprogramDayData] = useState({});
    const Colors = [
         '#00008b','#f00','#ffde00','#002a8f','#003580','#ed2939','#000','#003897','#f93','#bc002d', '#024fa2', '#000', '#00247d', '#ef2b2d',
         '#dc143c', '#d52b1e','#e30a17','#00247d','#b22234'
    ]

    useEffect(() => {
        // 调用异步函数
        getProgramMonth();
        getProgramDay();

    }, []); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

    const getProgramMonth = async () => {
        let url = '/api/v2/aleo/program/rank/month';
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    return []
                }
            })
            .then(data => {
                const myArray = data.data
                const new_x_Array = []
                const new_y_Array = []

                for (let i = 0; i < myArray.length; i++) {
                    let program = myArray[i].program;
                    let times = myArray[i].times;
                    let y_arry = []
                    for (let j = 0; j < times.length; j++) {
                        if (i == 0) {
                            new_x_Array.push(times[j].date)
                        }
                        y_arry.push(times[j].value)
                    }
                    new_y_Array.push({
                        name: program,
                        type: 'line',
                        smooth: true,
                        symbolSize: 0,
                        areaStyle: {},
                        data: y_arry
                    })

                }
                setprogramMonthData({ x_data: new_x_Array, y_data: new_y_Array })
            })
            .catch((error) => console.log(error))
    }

    const getProgramDay = async () => {
        let url = '/api/v2/aleo/program/rank/day';
        fetch(url, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.status == 200) {
                    return response.json()
                } else {
                    return []
                }
            })
            .then(data => {
                let array_data=data.data.slice(0,10)
                let new_y_Array = []
                let series_data=[]
                const val_array=[]
                let min_data=array_data[0].call_times;
                let max_data=array_data[0].call_times;
                for (let i = 0; i < array_data.length; i++) {
                    new_y_Array.push(array_data[i].program)
                    val_array.push({
                        value:array_data[i].call_times,
                        itemStyle: {
                            color: Colors[i]
                        }
                    });
                    if(min_data>array_data[i].call_times) min_data=array_data[i].call_times
                    if(max_data<array_data[i].call_times) max_data=array_data[i].call_times
                }
                series_data.push({
                    name: '2011',
                    type: 'bar',
                    data: [...val_array].reverse(),
                })
                const new_y_Array_reversed = [...new_y_Array].reverse();
                // const series_data_reversed = [...series_data].reverse();
                
                setprogramDayData({
                    y_data:new_y_Array_reversed,
                    series_data:series_data,
                    min:min_data,
                    max:max_data,
                    itemStyle: {
                        color: function (param) {
                            let a=randomNumberInRange(0,9)
                            console.log('color',a,Colors[a],param)
                          return Colors[a] || '#5470c6';
                        }
                      },
                })
              
                // console.log(new_y_Array,new_y_Array_reversed,series_data,series_data_reversed)
                // console.log("programDayData",programDayData)

               
            })
            .catch((error) => console.log(error))
    }
    const setrank = (index)=>{
        let color='bg-gray-F3';
        if (index === 0) {
            color='bg-blue-B5';
        } else if (index === 1) {
            color='bg-blue-D9';
        } else if (index === 2) {
            color='bg-blue-F2';
        }
        return (<span style={{display:'inline-block'}} className={`color-black-00 margin-right-15 width-20 height-20 text-center border-radius-100 ${color}`}>{index + 1}</span>)
    }

    return (<>
        <Card className='basic_info border-none' style={{ width: '100%', marginTop: '30px' }}>
            <Row className='padding-top-30'>
                <Col sm={12} md={12}>
                <div className='home-list-title height-40 font-16 color-0 font-weight-500 padding-0-20'>Programs Most Called</div>
                    {/* <ChartsLine type="line" data={programMonthData} title="Programs Most Called"></ChartsLine> */}
                    {programMonthData.hasOwnProperty('x_data') && programMonthData.x_data.length > 0 ? 
                    <ChartsLine type="line" data={programMonthData} title=""></ChartsLine>
                     : ' nodata'}
                </Col>
       
            </Row>
        </Card>
        <Card className='basic_info border-none' style={{ width: '100%', marginTop: '30px' }}>
        <div className='padding-20-20'>
                <div className='home-list-title height-40 font-16 color-0 font-weight-500'>Programs Most Called in 24H</div>
                    <ChartsBar data={programDayData}></ChartsBar>
                </div>
            </Card>
    </>
    )
}


export default ProgramsIndexShow;