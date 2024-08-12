
// MyChartComponent.js
import React, { useRef,useState, useEffect } from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './content.scss'


const ValidatorsDetailComponent = (props) => {

//   const [show, setShow] = useState(false);
 
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
  const detailData=props.data;
  // 使用useState定义一个状态变量用于保存本地存储中的值
//   const [labelTitle, setLabelTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const handleSaveToLocalStorage = () => {
    // const valueToStore = 'Hello, Local Storage!';
    // 将值写入本地存储
    // const myObject = [{label: "cherrysoso", address: "aleo1t0team9fw85wn992jz5c9u0j9lfgksmd7luayxrqa6h4xmewqgysvlv329"}]
    let data_arr=storedValue;
    data_arr.push({label: labelTitle, address:detailData.addr})
    const myObjectString=JSON.stringify(data_arr)

    localStorage.setItem('favorites', myObjectString);
    handleClose();
    // 更新组件的状态
    // setStoredValue(valueToStore);
  };

  // 定义事件处理函数，用于更新状态
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setLabelTitle(value);
    
    // setFormData({
    //   ...formData,
    //   [name]: value
    // });
  };

  const chartRef = useRef(null);
    return <> 
    {/* <h2></h2> */}
    <Card className='address-content'  style={{ marginBottom: '15px' }}>
    <ListGroup variant="flush" style={{textAlign:'left'}}>
        <ListGroup.Item>
            <Row>
                <Col>
                {detailData.addr? //此处需要沈欢给参数
                    <Button variant="outline-secondary" className='status_title' size="sm">
                    Close
                    </Button>
                    :
                    <Button variant="outline-success" className='status_title' size="sm">
                    Open
                    </Button>
                }
          <span className='black'>{detailData.addr}</span>
          
          <span onClick={props.favoriteClick} className='favorite'>
          {props.isFavorite?
            <i className="iconfont text-xs" >&#xe607;</i>:
            <i className="iconfont text-xs" >&#xe65e;</i>
          }
          </span>

        {detailData.addr? //此处需要沈欢给参数
            <></>:
            <Button variant="outline-success" size="sm">
            Open
            </Button>
        }
                </Col>
                <Col className='text-right'>
                <span className='address-content-label font-16 font-weiht-600'>Public Credits</span>
                <span className='green font-14' style={{marginLeft:'10px'}}>{detailData.public_credits}</span>
                </Col>
            </Row>
        
        </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>    <span className='address-content-label'>Total Coinbase Power</span>
        <span  className='address-content-info'>{detailData.total_puzzle_reward}</span></Col>
          <Col>    <span className='address-content-label'>Total Solutions Found</span>
        <span  className='address-content-info'>{detailData.total_solutions_found}</span></Col>
          <Col></Col>
        </Row>
        </ListGroup.Item>
      <ListGroup.Item>
      <Row>
          <Col>
          <span className='address-content-label'>Total Power/1hour</span>
          <span  className='address-content-info'>{detailData.power_1h}</span>
        </Col>
          <Col><span className='address-content-label'>Total Power/24hour</span>
          <span  className='address-content-info'>{detailData.power_24h}</span></Col>
          <Col><span className='address-content-label'>Total Power/7d</span>
          <span  className='address-content-info'>{detailData.power_7d}</span></Col>
        </Row>
        </ListGroup.Item>
    </ListGroup>

   
  </Card></>;
};

export default ValidatorsDetailComponent;
