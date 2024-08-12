
import React, { useState, useEffect } from 'react'

import { Row, Col, Card, Table } from 'react-bootstrap'
import ChartsLine from './chartsLine'
import { nmberFormat } from '@/utils';

function ProgramsShow() {
    const [loading, setLoading] = useState(true);
    const [programMonthData, setprogramMonthData] = useState({});
    const [programDayData, setprogramDayData] = useState([]);

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
                        
                        // areaStyle: {
                        //     color: new echarts.graphic.LinearGradient(
                        //         0,
                        //         0,
                        //         0,
                        //         1,
                        //         [
                        //             {
                        //                 offset: 0,
                        //                 color: 'rgba(14, 156, 255, 0.15)',
                        //             },
                        //             {
                        //                 offset: 1,
                        //                 color: 'rgba(14, 156,255,0)',
                        //             },
                        //         ],
                        //         false),
                        //   },
                        data: y_arry
                    })

                }
                setprogramMonthData({x_label:'MM-DD', x_data: new_x_Array, y_data: new_y_Array })
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
                setprogramDayData(data.data.slice(0,8))
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
        <Card className='basic_info border-none'>
            <Row className='padding-top-30'>
                <Col sm={7} md={7}>
                <div className='home-list-title height-40 font-18 color-black-00 font-weight-bolder padding-0-20'>Programs Most Called</div>
                    {/* <ChartsLine type="line" data={programMonthData} title="Programs Most Called"></ChartsLine> */}
                    {programMonthData.hasOwnProperty('x_data') && programMonthData.x_data.length > 0 ? <ChartsLine type="line" data={programMonthData} title=""></ChartsLine> : ' nodata'}
                </Col>
                <Col sm={5} md={5}>
                <div className='home-list-title height-40 font-18 color-black-00 font-weight-bolder'>Programs Most Called in 24H</div>
                    <Table className='padding-0-20'>
                        <thead>
                            <tr className='table-row-35 '>
                                <th className='text-xs font-13 color-gray-77 table-head-color font-weight-normal'>Programs</th>
                                <th className='text-xs font-13 color-gray-77 table-head-color text-right font-weight-normal'>Number of calls</th>
                            </tr>
                        </thead>
                        <tbody className='padding-0-20'>
                            {programDayData.map((item, index) => (
                                <tr className='border-color-F3 table-row-45' key={index}>
                                    <td className='table-cell'>
                                        {setrank(index)}
                                        <a href='' className='font-13  color-black-18 font-weight-normal'>
                                            {item.program}
                                        </a>
                                    </td>
                                    <td className='text-right font-13 table-cell font-weight-normal  color-black-18'>{nmberFormat(item.call_times)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Card>
    </>
    )
}


export default ProgramsShow;