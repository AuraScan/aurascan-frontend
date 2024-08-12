import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Container, Card,Row,Col, Alert } from 'react-bootstrap'
import Alertinfo from '@/components/alert';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import {get_records_perpage} from '@/store/rootReducer';
import {divided_by_power_of_10} from '@/utils/index';
import ChartsLine from '@/pages/default/components/chartsLine'
import './index.scss'

function transactionsTable() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const items = Array.from({ length: 50 }, (_, index) => index + 1);
    const [data, setData] = useState([]);
    const [overviewdata, setOverviewdata] = useState({});
    const [chartdata, setChartdata] = useState({});
    const [dataTotal, setDataTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const records_perpage = useSelector(get_records_perpage)

    useEffect(() => {
        // 调用异步函数
        getValidatorOverview();
        getValidatorChart();
        getValidators();
    }, [page]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

    const getValidatorOverview = async() => { 
        const _this = this;
        let url = '/api/v2/aleo/validator/overview';
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
          setOverviewdata(data.data);
          setLoading(false);
        })
          .catch((error) => { 
          setLoading(false);
          })
    }  
  
    const getValidatorChart = async() => { 
        const _this = this;
        let url = '/api/v2/aleo/validator/stake/chart';
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
          const new_y_Array=[]
          const new_y_net_Array = []
          const new_y_validator_Array = []
          const new_y_delegator_Array = []
          const legend_array = ['Network Stake','Validator Stake','Delegator Stake']
          for (let i = 0; i < myArray.length; i++) {
            new_x_Array.push(myArray[i].date)
            new_y_net_Array.push(myArray[i].total_bond)
            new_y_validator_Array.push(myArray[i].validator_bond)
            new_y_delegator_Array.push(myArray[i].delegator_bond)
          }
          new_y_Array.push({
                name: 'Network Stake',
                type: 'line',
                smooth: true,
                areaStyle: {},
                data: new_y_net_Array
            })
            new_y_Array.push({
                name: 'Validator Stake',
                type: 'line',
                smooth: true,
                areaStyle: {},
                data: new_y_validator_Array
            })
            new_y_Array.push({
                name: 'Delegator Stake',
                type: 'line',
                smooth: true,
                areaStyle: {},
                data: new_y_delegator_Array
            })
            setChartdata({ x_data: new_x_Array, y_data: new_y_Array, legend_data: legend_array })
        //   setChartdata(data.data);
            setLoading(false);
        })
          .catch((error) => { 
          setLoading(false);
          })
    }   
    
    const getValidators = async() => { 
        let pageObj={
            "page":page,
            "page_size":20
        }
        const _this = this;
        let data = {
            page:pageObj.page,
            page_size:pageObj.page_size
        };
        let url = '/api/v2/aleo/validator/list';
        fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
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
            setData(data.data.validators);
            setDataTotal(data.data.count)
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }

    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
            <Alertinfo></Alertinfo>
            <Card className='border-none'  style={{ marginTop: '15px' ,}}>
                <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title className='basic-title' style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Overview</Card.Title>
                </Card>
                <Container>
                    <Row className='height-40' style={{marginTop:'20px'}}>
                        <Col>Total Network Staking <sapn className='green'>{divided_by_power_of_10(overviewdata.total_network_Staking)}</sapn></Col>
                        <Col></Col>
                    </Row>
                    <Row className='height-40'>
                        <Col>Total Validators Staking <sapn className='green'>{divided_by_power_of_10(overviewdata.total_validator_Staking)}</sapn></Col>
                        <Col className='text-right'>Number of Validators <sapn className='green'>{overviewdata.committee_members}</sapn></Col>
                    </Row>
                    <Row className='height-40'>
                    <Col >Total Delegators Staking <sapn className='green'>{divided_by_power_of_10(overviewdata.total_delegator_Staking)}</sapn></Col>
                        <Col className='text-right'>Number of Validators <sapn className='green'>{overviewdata.delegator_numbers}</sapn></Col>
                    </Row>
                </Container>
            </Card>

            <Card className='border-none'  style={{ marginTop: '15px' ,}}>
                <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title className='basic-title' style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Stake</Card.Title>
                
                </Card>
                <ChartsLine title="" data={chartdata}></ChartsLine>
            </Card>

            <Card className='border-none'  style={{ marginTop: '15px' ,}}>
                <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title className='basic-title' style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Validators</Card.Title>
                </Card>
                
        <Table  hover>
        {/* 数值展示：原始数值  除以10的6次方，保留6位小数 */}
        <thead>
            <tr className='border-color-F3 bg-gray-F3 height-45'>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '> <span style={{marginLeft:'15px'}}>Validator</span></th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Public Credits</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Committee Credits</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Bond Credits</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Create Height</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '> <span style={{marginRight:'15px'}}>State {/* 1:open，0:close*/ }</span></th>
            </tr>
        </thead>
            <tbody>
            {data.map(item => (
                <tr key={item} className='border-color-F3 height-45'>   
                <td className='table-cell text-center font-13 font-weight-400 color-black-18'><span style={{marginLeft:'15px'}}>
                    <a href={'/address/'+item.address}>{item.address}</a>
                    </span>
                </td>
                <td className='table-cell text-center font-13 font-weight-400 color-black-18'>{divided_by_power_of_10(item.public_credits)}</td>
                <td className='table-cell text-center font-13 font-weight-400 color-black-18'>{divided_by_power_of_10(item.committee_credits)}</td>
                <td className='table-cell text-center font-13 font-weight-400 color-black-18'>{divided_by_power_of_10(item.bond_credits)}
                    {/* <ProgressBar now={60} /> */}
                </td>
                <td className='table-cell text-center font-13 font-weight-400 color-black-18'><span variant="outline-success" style={{borderRadius:'20px', padding:'4px 15px'}}>
                   
                    <a href={`/block/${item.create_height}`}>
                        {item.create_height}
                    </a>
                    </span></td>		
                <td className='table-cell text-center font-13 font-weight-400 color-black-18'>{item.is_open==1?<span className='variant="success"'>Open</span>:'Close'}</td>
            </tr>))}
        </tbody>
                </Table>
            </Card>
            </Container>
  );
}

export default transactionsTable;