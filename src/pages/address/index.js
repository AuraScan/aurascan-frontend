import React, { useState, useEffect } from 'react'
import { Container} from 'react-bootstrap'
import Alertinfo from '../../components/alert';
import AddressTab from './components/tab';
import ChartsTabsComponent from './components/chartsTabs';
import Content from './components/content';
import ValidatorsCharts from './components/ValidatorsCharts.js'
import ValidatorsDetailComponent  from './components/ValidatorsDetail';
import ProverDetailComponent from './components/ProverDetail'
import { useParams } from 'react-router-dom';
import {Modal,Form,Button} from 'react-bootstrap';


function AddressDetail() {
    const [show, setShow] = useState(false);
    const { addressId } = useParams();
    const [detail, setDetail] = useState('');
    const [isFavorite,setFavorite]=useState(false) 
    const [storedValue, setStoredValue] = useState([]);
    const [labelTitle, setLabelTitle] = useState('');
    let variant = 'success';
    const [loading, setLoading] = useState(true);
    
    const items = Array.from({ length: 1 }, (_, index) => index + 1);
    useEffect(() => {
        getDetail();// 类型判断 validator，还是普通address 还是 特殊无值
        initFavorites();
    },[addressId])

    const initFavorites=()=>{
        const storedData =localStorage.getItem('favorites','');
        if(addressId && storedData && storedData!=null && storedData.includes(addressId)){
            setFavorite(true)
        }else{
            setFavorite(false)
        }
    }

    const getDetail = async() => { 
        const _this = this;
        let url = '/api/v2/aleo/addr/detail/'+addressId;
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
            setDetail(data.data);
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }

    const handleSaveToLocalStorage = () => {
        // const valueToStore = 'Hello, Local Storage!';
        // 将值写入本地存储
        let storedData=localStorage.getItem('favorites');
        let data_arr=[];
        let is_exist=false;
        if (storedData) {
            let data_arr=JSON.parse(storedData);
            data_arr.map(item=>{
                if(item.address==addressId){
                    is_exist=true;
                }
            })
        }
        if(!is_exist) data_arr.push({label: labelTitle, address:addressId})
        const myObjectString=JSON.stringify(data_arr)
        localStorage.setItem('favorites', myObjectString);
        handleClose();
        initFavorites();
    };

    const handleCloseFavor = () => {
        const storedData = localStorage.getItem('favorites');
        let data_arr=[];
        let new_arr=[]
        if (storedData) {
            let data_arr=JSON.parse(storedData);
            data_arr.map(item=>{
                if(item.address!=addressId){
                    new_arr.push(item)
                }
            })
        }
        const myObjectString=JSON.stringify(new_arr)
        localStorage.setItem('favorites', myObjectString);
        initFavorites();
    };

    const handleClose = () => setShow(false);
    const handleShow = () =>{
        if(isFavorite){
            // 已经收藏--> 取消收藏
            handleCloseFavor();
        }else{
            // 未收藏--> 开启收藏处理
            setShow(true);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLabelTitle(value);
    };

    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
            <Alertinfo></Alertinfo>
            {detail.addr_type=='validator'?
            // <ValidatorsDetailComponent isFavorite={isFavorite} data={detail} favoriteClick={handleShow}></ValidatorsDetailComponent>
          <>
          <ValidatorsDetailComponent isFavorite={isFavorite} data={detail} favoriteClick={handleShow}></ValidatorsDetailComponent>
          <ValidatorsCharts data={detail}></ValidatorsCharts>
          </>
            :
            <>
            <ProverDetailComponent isFavorite={isFavorite} data={detail}  favoriteClick={handleShow}></ProverDetailComponent>
            <ChartsTabsComponent></ChartsTabsComponent>
            </>
            }
        
            <AddressTab></AddressTab>  
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title className='font-14'>Set favorite address alias</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Control
                        type="text"
                        value={labelTitle}
                        className='font-12'
                        placeholder="please enter a label name"
                        style={{fontSize:'12px !important'}}
                        autoFocus
                        onChange={handleInputChange} 
                    />
                    </Form.Group>
                
                </Form>
                </Modal.Body>
                <Modal.Footer>
             
                <Button variant="primary"  style={{fontSize:'12px !important'}} className='font-12' onClick={handleSaveToLocalStorage}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal> 
        </Container>
  );
}

export default AddressDetail;