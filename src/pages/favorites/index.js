
import React, { useState, useEffect  } from 'react';
import Table from 'react-bootstrap/Table';
import { Container, Card } from 'react-bootstrap'
import Alertinfo from '@/components/alert';

function favoritesTable() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const items = Array.from({ length: 1 }, (_, index) => index + 1);

      // 使用useState定义一个状态变量用于保存本地存储中的值
    const [storedValue, setStoredValue] = useState([]);

    useEffect(() => {
        // 在组件加载时从本地存储中获取值
        const storedData = localStorage.getItem('favorites');
        // console.log(JSON.parse(storedData))
        if (storedData) {
            setStoredValue(JSON.parse(storedData));
            // console.log(JSON.parse(storedData))
        }
    }, []);

    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
        <Alertinfo></Alertinfo>
            <Card style={{ marginTop: '15px' ,}}>
                <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>favorites</Card.Title>
                </Card>
        <Table  hover>
        <thead>
            <tr>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '> <span style={{marginLeft:'15px'}}>Rank</span></th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Address</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Label</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Last 24 Hours Counts</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Last 24 Hours Power</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '> <span style={{marginRight:'15px'}}>Speed(24h)</span></th>
            </tr>
        </thead>
            <tbody>
            {storedValue?.map(item => (
                <tr key={item}>   
                <td><span style={{marginLeft:'15px'}}>1</span></td>
                <td><a href='#'>{item.address}</a></td>		
                <td>{item.label}</td>
                <td><span className="green">--</span></td>
                <td><span className="green">--</span></td>
                <td><span className="green">1.08M</span></td>
            </tr>))}         
        </tbody>
                </Table>
            </Card>
            </Container>
  );
}

export default favoritesTable;