
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card,  Tabs,Tab } from 'react-bootstrap'
import BasicTable from '@/components/table';


function AddressTab() {
    const { addressId } = useParams();
    const [transfer_data, setTransfer_data] = useState([]);
    const [solutions_data, setSolutions_data] = useState([]);
    const [transfer_data_total, setTransferDataTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    
    const function_table_data = [{'ID':'au1g8ras5xk9ng2h0q2hrf8xdk8599emplxskge0067edm5xmd96vrsmqtjnj',"height":"704,247","Time":"2023-12-01 07:23:27",'Program':'credits.aleo',"Function":"Status"}]
 
    useEffect(() => {
        // 调用异步函数
        getTransfer();
        getSolutions();
    }, [page]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次
 
    const getTransfer = async() => { 
        let pageObj={
          "page":page,
          "page_size":20,
        }
        const _this = this;
        let data = {
          page:pageObj.page,
          page_size:pageObj.page_size,
          address:addressId
      };
        let url = '/api/v2/aleo/address/transfer/list';
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
          setTransfer_data(data.data.transfers);
          setTransferDataTotal(data.data.count);
          setLoading(false);
        })
          .catch((error) => { 
          setLoading(false);
          })
    }

    const getSolutions = async() => { 
        let pageObj={
          "page":page,
          "page_size":20,
        }
        const _this = this;
        let data = {
          page:pageObj.page,
          page_size:pageObj.page_size,
          address:addressId
      };
        let url = '/api/v2/aleo/address/solutions';
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
          setSolutions_data(data.data.solutions);
          setLoading(false);
        })
          .catch((error) => { 
          setLoading(false);
          })
    }

    return (
        <Card>
             <Tabs
                defaultActiveKey="home"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="home" title="Transfers">
                    <BasicTable data={transfer_data} is_compress={1}></BasicTable>   
                </Tab>
                <Tab eventKey="profile" title="Coinbase Solutions">
                    <BasicTable data={solutions_data}></BasicTable>   
                </Tab>
                <Tab eventKey="contact" title="Functions">
                   <BasicTable data={function_table_data}></BasicTable>   
                </Tab>
                </Tabs>
        </Card>
  );
}

export default AddressTab;