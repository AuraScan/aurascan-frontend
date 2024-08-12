
import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Container, Card,Row,Col } from 'react-bootstrap'
// import ChartsShow from '../components/chartsShow';
import {filter_num_decimals,divided_by_power_of_10 } from '@/utils'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Alertinfo from '@/components/alert';
import ChartsLine from '@/components/chart/line'
import {formatDateTime} from '@/utils'
import * as echarts from 'echarts';
import './index.scss'

function proversTable() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const items = Array.from({ length: 50 }, (_, index) => index + 1);
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [type, setType] = useState('24h');
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
      // 调用异步函数
      getProvers();
      getProverCharts();

  }, [type]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次
  
  const getProvers = async() => { 
      const _this = this;
      let url = '/api/v2/aleo/prover/list/'+type;
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
        // 更新组件状态
        setData(data.data);
        setLoading(false);
      })
        .catch((error) => { 
        setLoading(false);
        })
  }

  const getProverCharts = async() => { 
    const _this = this;
    let url = '/api/v2/aleo/puzzle_reward/chart/';
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
      // 更新组件状态
      const myArray = data.data
      const new_x_Array = []
      const new_y_Array = []
      const y_arry = []

      for (let i = 0; i < myArray.length; i++) {
          y_arry.push(myArray[i].reward)
          new_x_Array.push(formatDateTime(myArray[i].timestamp,'m-d'))
      }
      new_y_Array.push({
          type: 'line',
          smooth: true,
          symbolSize: 0,
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
     
      setChartData({ "x_data": new_x_Array, "y_data": new_y_Array })
      setLoading(false);
    })
      .catch((error) => { 
      setLoading(false);
      })
}
    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
        {/* <Alertinfo></Alertinfo> */}
          <Row style={{ marginBottom: '15px' }}>
            <Col sm={12}>
            <Card className='basic_info border-none' style={{ width: '100%', marginTop: '30px' }}>
              <Card.Title  className='basic-title' style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Leaderboard Stats</Card.Title>
                <ChartsLine data={chartData}></ChartsLine>
              </Card>
            </Col>
          </Row>
            <Card className='border-none' style={{ marginTop: '15px' ,}}>
                <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
            <Card.Title style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>
              <Row>
              <Col className='basic-title'>Leaderboard</Col>
              <Col style={{ textAlign: 'right' }}>
                  <ButtonToolbar className='filter-type' aria-label="Toolbar with button groups" style={{textAlign:"right",float:'right',}}>
                    <ButtonGroup className="me-2 filter-type" aria-label="First group">
                      {type=='1h'?<Button style={{border:'solid #eee 1px'}} onClick={()=>setType('1h')}>1h</Button>:<Button variant="" style={{border:'solid #eee 1px'}} onClick={()=>setType('1h')}>1h</Button>}
                      {type=='24h'?<Button  style={{border:'solid #eee 1px'}} onClick={()=>setType('24h')}>24h</Button>:<Button variant="" style={{border:'solid #eee 1px'}} onClick={()=>setType('24h')}>24h</Button>}
                      {type=='7d'?<Button style={{border:'solid #eee 1px'}} onClick={()=>setType('7d')}>7d</Button>:<Button  variant="" style={{border:'solid #eee 1px'}} onClick={()=>setType('7d')}>7d</Button>}
                    </ButtonGroup>     
                  </ButtonToolbar>
              </Col>
              </Row>
              </Card.Title>
                </Card>
        <Table hover>
        <thead className='bg-gray-F3'>
            <tr className='border-color-F3 bg-gray-F3 height-40'>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '><span style={{marginLeft:'15px'}}>Rank</span></th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Address</th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>
                Reward
              </th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Power</th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>LastBlock</th>
            </tr>
        </thead>
            <tbody>
            {data.map(item => (
              <tr key={item}  className='border-color-F3 height-40'>   
                <td><span style={{ marginLeft: '15px' }}>
                  {item.rank}
                  </span></td>
                <td><a href={'/address/'+item.address}>
                  {item.address}
                  </a></td>

                  <td>
                  {divided_by_power_of_10(item.reward)}

                   </td>

                <td><span className="green">{filter_num_decimals(item.power,6)}</span></td>
                <td>
                 <a className='link_text' href={'/block/'+item.last_block}> 
                  <Button variant="outline-success"  style={{borderRadius:'20px',padding:'4px 15px'}}>{item.last_block}</Button>
                 </a>
                  </td>
                {/* <td><span className="green">2.96M</span></td> */}
            </tr>))}
        </tbody>
                </Table>
            </Card>
            </Container>
  );
}

export default proversTable;