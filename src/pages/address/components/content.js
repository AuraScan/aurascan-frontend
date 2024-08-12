
// MyChartComponent.js
import React, { useRef,useState, useEffect } from 'react';
import { Card, Row, Col, ListGroup } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './content.scss'


const contentComponent = (props) => {

  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const detailData=props.detail;
  // 使用useState定义一个状态变量用于保存本地存储中的值
  const [storedValue, setStoredValue] = useState('');
  const [labelTitle, setLabelTitle] = useState('');
  const [loading, setLoading] = useState(true);

useEffect(() => {
  // 在组件加载时从本地存储中获取值
  const storedData =localStorage.getItem('favorites');
  // if (storedData) {
  //   setStoredValue(JSON.parse(storedData));
  // }
}, [storedValue]);

const handleSaveToLocalStorage = () => {
  // const valueToStore = 'Hello, Local Storage!';
  // 将值写入本地存储
  // const myObject = [{label: "cherrysoso", address: "aleo1t0team9fw85wn992jz5c9u0j9lfgksmd7luayxrqa6h4xmewqgysvlv329"}]
  let data_arr=storedValue;
  data_arr.push({label: labelTitle, address:addressId})
  const myObjectString=JSON.stringify(data_arr)

  localStorage.setItem('favorites', myObjectString);
  handleClose();
  // 更新组件的状态
  // setStoredValue(valueToStore);
};

  // 定义事件处理函数，用于更新状态
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const { addressId } = useParams();
    setLabelTitle(value);
    
    // setFormData({
    //   ...formData,
    //   [name]: value
    // });
  };


  const chartRef = useRef(null);
    return <Card className='address-content' style={{ marginBottom: '15px' }}>
    <ListGroup variant="flush" style={{textAlign:'left'}}>
        <ListGroup.Item>
          <span className='address-content-label'>Rank</span>
          
          <span className='address-content-info'>12121
          &nbsp;&nbsp;
          <Button variant=" btn-outline-primary" onClick={handleShow}>
          
          喜欢
      </Button>
           {/* <button onClick={handleSaveToLocalStorage("12121")}>Save to Local Storage</button> */}
           </span>


        </ListGroup.Item>
      <ListGroup.Item><span className='address-content-label'>Total Coinbase Power</span><span  className='address-content-info'>12121</span></ListGroup.Item>
      <ListGroup.Item><span className='address-content-label'>Total Solutions Found</span><span  className='address-content-info'>12121</span></ListGroup.Item>
      <ListGroup.Item><span className='address-content-label'>Speed</span><span  className='address-content-info'>12121</span></ListGroup.Item>
    </ListGroup>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set favorite address alias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              {/* <Form.Label>Email address</Form.Label> */}
              <Form.Control
                type="text"
                value={labelTitle}
                placeholder="please enter a label name"
                autoFocus
                onChange={handleInputChange} 
              />
            </Form.Group>
        
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveToLocalStorage}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  </Card>;
};

export default contentComponent;
