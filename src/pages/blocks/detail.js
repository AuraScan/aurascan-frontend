import React, { useState, useEffect } from 'react'
import { Container} from 'react-bootstrap'
import Alertinfo from '../../components/alert';
import Content from '@/components/listGroup'
import BasicTable from '@/components/table';
import { useParams } from 'react-router-dom';

function BlockDetail() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const { blockId } = useParams();
    const items = Array.from({ length: 1 }, (_, index) => index + 1);
    const [blockDetail, setBlockDetail] = useState({});
    const [subdag, setSubdag] = useState({});
    const [transaction, setTransaction] = useState([]);
    const [solution, setSolution] = useState([]);

    const [pageTrans, setPageTrans] = useState(1);
    const [pageSolu, setPageSolu] = useState(1);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // 调用异步函数
        getBlockDetail(blockId)
        getSubdags(blockId)
        getTransaction(blockId)
        getSolution(blockId)
    }, [pageTrans,pageSolu]);

    const getBlockDetail = async(blockId) => { 
        const _this = this;
        let url = '/api/v2/aleo/block/'+blockId;
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
            setBlockDetail(data.data);
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }
    const getSubdags = async(blockId) => { 
        const _this = this;
        let url = '/api/v2/aleo/block/authority/'+blockId;
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
            const new_Array=[]
            for (let i = 0; i < myArray.length; i++) {
                // items.push(<li key={i}>{myArray[i]}</li>);
                let ret_data = myArray[i];
                let new_data = { "Round": ret_data.Round, "Idx": myArray[i].Idx, "CertificateId": myArray[i].BatchId}
                delete ret_data.Round
                delete ret_data.Idx
                delete ret_data.certificate_id
                // delete ret_data.BatchId
                delete ret_data.Height
                ret_data['BatchHeader Signature'] = myArray[i].Signature
                delete ret_data.Signature
                new_data['expanded']=ret_data
                // console.log("new_data",new_data)
                new_Array.push(new_data)
            }
            // console.log(new_Array)
            setSubdag(new_Array);
            setLoading(false);
        })
        .catch((error) => { 
            setLoading(false);
        })
    }
    const getTransaction = async (blockId) => { 
        let data={
            "page":pageTrans,
            "page_size": 10,
            "height":parseInt(blockId)
        }
        const _this = this;
        let url = '/api/v2/aleo/block/transaction';
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
            console.log("data.data.transactions",data.data.transactions)
            setTransaction(data.data.transactions);
            console.log("transaction",transaction)
            setLoading(false);
        })
        .catch((error) => { 
            setLoading(false);
        })
    }
    const getSolution = async(blockId) => { 
        const _this = this;
        let data={
            "page":pageSolu,
            "page_size": 10,
            "height":parseInt(blockId)
        }
        let url = '/api/v2/aleo/block/solution';
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
            setSolution(data.data.solutions);
            setLoading(false);
        })
        .catch((error) => { 
            setLoading(false);
        })
    }

    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
            {/* <Alertinfo></Alertinfo> */}
            <Content data={blockDetail} title="Block Information"></Content>
            {subdag.length>0 ? <BasicTable data={subdag} title="Subdag Details"></BasicTable>:""}
            {transaction.length>0 ? <BasicTable data={transaction} title="Transactions"></BasicTable>:''}
            {solution.length>0? <BasicTable data={solution} title="Coinbase Solutions"></BasicTable>:''}
            
        </Container>
  );
}

export default BlockDetail;