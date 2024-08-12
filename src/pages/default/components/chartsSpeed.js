import React, { useState, useEffect } from 'react'
import {  Card,ButtonGroup,Row,Col ,ToggleButtonGroup,ToggleButton} from 'react-bootstrap'
import ChartsLine from './chartsLine'
import * as echarts from 'echarts';
import {formatDateTime} from '@/utils'
import './selected.scss'


function ChartsSpeed() {
    const [ selectSPChart, setselectSPChart] = useState('day');//day,week,all
    const [loading, setLoading] = useState(true);
    const [powerData, setPowerData] = useState({});
    const chartSPRadios=[
        { name: '24h', value: 'day' },
        { name: '7d', value: 'week' },
        { name: 'All', value: 'all' },
      ]

    useEffect(() => {
        // 调用异步函数
        getPower();
      }, [selectSPChart]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次
    
      const handleSelectSpChange  = (selectedKey) => {
        setselectSPChart(selectedKey)
      }
      
      const getPower = async() => { 

          let url = '/api/v1/aleo/network/power/'+selectSPChart;
          fetch(url, {
          method: 'get',
          headers: {
              'Content-Type': 'application/json'
          },
        //   body:JSON.stringify(data)
          })
          .then((response) => {
              if (response.status == 200) {
                return response.json()
              } else {
                return []
              }
          })
        .then(data => {
            // 更新组件状态
            const myArray = data.data
            const new_x_Array = []
            const new_y_Array = []
            let y_arry = []

            for (let i = 0; i < myArray.length; i++) {
                y_arry.push(myArray[i].power)
                // new_x_Array.push(formatDateRet(myArray[i].date,'m-d'))
                new_x_Array.push(formatDateTime(myArray[i].timestamp,'y-m-d h:m:s'))
            }
            new_y_Array.push({
                // name: program,
                type: 'line',
                smooth: true,
                symbolSize: 0,
                // areaStyle: {},
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
                data: y_arry
            })
            setPowerData({x_label:'HH:mm', x_data: new_x_Array, y_data: new_y_Array })

            // setData(data.data.blocks);
            // setDataTotal(data.data.count)
            setLoading(false);
          })
            .catch((error) => { 
            setLoading(false);
            })
      }
    return(
        <Card className='basic_info border-none'>
        <Card.Title>
        <Row className='selected-list'>
            <Col xs={6}><span className='home-list-title height-40 font-18 color-black-00 font-weight-bolder'>Estimated Speed Trend</span>
            </Col>
            <Col xs={6} style={{ textAlign: 'right' }}>
            {/* <ButtonGroup aria-label="Basic example" className='bg-gray-F3 height-32'> */}
            <ToggleButtonGroup type='radio' value={selectSPChart} name="speed" onChange={ handleSelectSpChange }>
                {chartSPRadios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant=""
                    name="radio"
                    value={radio.value}
                    // checked={selectSPChart === radio.value}
                    className='font-14 color-black-18'
                    // onChange={(e) => handleSelectSpChange(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ToggleButtonGroup>
            </Col>
            <Col xs={12}>
            {powerData.hasOwnProperty('x_data') && powerData.x_data.length > 0 ? <ChartsLine type="line" data={powerData} title="" ></ChartsLine> : ' nodata'}
            {/* <ChartsLineTab type="line" data={currentData[selectSPChart]} title="Programs Most Called"></ChartsLineTab> */}
            </Col>
        </Row>
        </Card.Title>
    </Card>
    )
}

export default ChartsSpeed;