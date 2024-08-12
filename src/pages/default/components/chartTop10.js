import React, { useState, useEffect } from 'react'
import { Card, ButtonGroup, Row, Col, ToggleButton,ToggleButtonGroup } from 'react-bootstrap'

import ChartsLineTab from './chartsLineTab'
import { formatDateTime } from '@/utils'
import { shortenWalletAddress } from '@/utils';

import './selected.scss'


function ChartsTop10() {
    const [selectChart, setselectChart] = useState('counts');//day,week,all
    const [loading, setLoading] = useState(true);
    const [currentData, setCurrentData] = useState({ power: {}, reward: {}, counts: {} })
    const chartRadios = [
        { name: 'Power', value: 'power' },
        { name: 'Reward', value: 'reward' },
        { name: 'Counts', value: 'counts' },
    ]
    useEffect(() => {
        // 调用异步函数
        if(selectChart=='counts'){
            getSolutionMonth();
        }else if(selectChart=='reward'){
            getRewardMonth();
        }else{
            getPowerMonth();
        }
        
        
    }, [selectChart]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

    const handleSelectChange = (selectedKey) => {
        setselectChart(selectedKey)
    }
    // reward
    const getRewardMonth = async () => {
        let url = '/api/v2/aleo/reward/rank/month';
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
            const legend_array = []
            for (let i = 0; i < myArray.length; i++) {
                let address = myArray[i].address;
                address = shortenWalletAddress(address);
                let rewards = myArray[i].rewards;
                let y_array = []
                for (let j = 0; j < rewards.length; j++) {
                    if (i == 0) {
                        let time_ymd = formatDateTime(rewards[j].timestamp, 'y-m-d')
                        new_x_Array.push(time_ymd)
                    }
                    y_array.push(rewards[j].reward)
                }
                legend_array.push(address)
                new_y_Array.push({
                    name: address,
                    type: 'line',
                    smooth: 'none',
                    symbolSize:0,
                    data: y_array
                })
            }
            setCurrentData({ ...currentData, "reward": { x_data: new_x_Array, y_data: new_y_Array, legend_data: legend_array } })
        })
        .catch((error) => console.log(error))
    }
    // 算力
    const getPowerMonth = async () => {
        let url = '/api/v2/aleo/power/rank/month';
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
                const legend_array = []

                for (let i = 0; i < myArray.length; i++) {
                    let address = myArray[i].address;
                    address = shortenWalletAddress(address);
                    let powers = myArray[i].powers;
                    let y_array = []

                    for (let j = 0; j < powers.length; j++) {
                        if (i == 0) {
                            let time_ymd = formatDateTime(powers[j].timestamp, 'y-m-d')
                            new_x_Array.push(time_ymd)
                            // new_x_Array.push(powers[j].timestamp)
                        }
                        y_array.push(powers[j].power)
                    }
                    legend_array.push(address)
                    new_y_Array.push({
                        name: address,
                        type: 'line',
                        smooth: 'none',
                        symbolSize:0,
                        data: y_array
                    })
                }
                // _this.setState({ powerMonthData: {x_data:new_x_Array,y_data:new_y_Array}})
                // _this.setState((prevState) => {
                //     return {
                //     currentData: {
                //         ...prevState.currentData,
                //         "power": { x_data: new_x_Array, y_data: new_y_Array, legend_data: legend_array }
                //     }
                //     }
                // })
                setCurrentData({ ...currentData, "power": { x_data: new_x_Array, y_data: new_y_Array, legend_data: legend_array } })

                // _this.setState({...this.state.currentData, currentData:{"power":{x_data:new_x_Array,y_data:new_y_Array}}})
                // .currentData={ powerMonthData: {x_data:new_x_Array,y_data:new_y_Array}};
                // _this.setState({ powerMonthData:  })
                // dispatch(setInitFood(data.data))
            })
            .catch((error) => console.log(error))
    }
    //count
    const getSolutionMonth = async () => {
        let url = '/api/v2/aleo/solutions/rank/month';
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
                const legend_array = []

                for (let i = 0; i < myArray.length; i++) {
                    let address = myArray[i].address;
                    address = shortenWalletAddress(address);
                    let solutions = myArray[i].solutions;
                    let y_array = []
                    for (let j = 0; j < solutions.length; j++) {
                        if (i == 0) {
                            let time_ymd = formatDateTime(solutions[j].timestamp, 'y-m-d')
                            new_x_Array.push(time_ymd)
                        }
                        y_array.push(solutions[j].count)
                    }
                    legend_array.push(address)
                    new_y_Array.push({
                        name: address,
                        type: 'line',
                        smooth: 'none',
                        symbolSize:0,
                        data: y_array
                    })
                }
                // _this.setState({ solutionMonthData: {x_data:new_x_Array,y_data:new_y_Array}})
                // _this.setState((prevState) => {
                //     return {
                //     currentData: {
                //         ...prevState.currentData,
                //         "counts": { x_data: new_x_Array, y_data: new_y_Array, legend_data: legend_array }
                //     }
                //     }
                // })
                setCurrentData({ ...currentData, "counts": { x_data: new_x_Array, y_data: new_y_Array, legend_data: legend_array } })

            })
            .catch((error) => console.log(error))
    }

    return (
        <Card className='basic_info border-none' style={{ width: '100%', marginTop: '30px', padding: '15px' }}>
            <Card.Title>
                <Row  className='selected-list'>
                    <Col xs={4}>
                       <span className='font-18 color-black-00 font-weight-bolder'>
                       Daily Top10 Growth
                        </span>
                        </Col>
                    <Col xs={8} style={{ textAlign: 'right' }}>
                        <ToggleButtonGroup type='radio' value={selectChart} name="radioTop10" onChange={ handleSelectChange }>
                            {chartRadios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    id={`radioTop100-${idx}`}
                                    type="radio"
                                    variant=""
                                    value={radio.value}
                                    className='font-14 color-black-18'
                                    // checked={selectChart === radio.value}
                                >
                                    {radio.name}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </Col>
                    <Col xs={12}>
                        {
                            currentData[selectChart].hasOwnProperty('x_data') && currentData[selectChart].x_data.length > 0 ?
                            <ChartsLineTab type="line" data={currentData[selectChart]} title="Programs Most Called"></ChartsLineTab>:''
                        }

                </Col>
            </Row>
        </Card.Title>
    </Card >
)



}

export default ChartsTop10;