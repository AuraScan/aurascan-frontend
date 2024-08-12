import React, { useState, useEffect } from 'react'
import { Container} from 'react-bootstrap'
import Alertinfo from '../../components/alert';
import Content from '@/components/listGroup'
import BasicTable from '@/components/table';
import { useParams } from 'react-router-dom';

function BlockDetail() {
    const [show, setShow] = useState(true);
    const { transactionID } = useParams();
    let variant = 'success';
    const [transactionsDetail, setTransactionsDetail] = useState({});
    const [finalize, setFinalize] = useState({});
    const [transitions, setTransitions] = useState({});
    const items = Array.from({ length: 1 }, (_, index) => index + 1);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // 调用异步函数
        // console.log("transactionID",transactionID)
       getTransactionsDetail(transactionID)
    }, [transactionID]);

    const getTransactionsDetail = async(transactionID) => { 
        const _this = this;
        let url = '/api/v2/aleo/transaction/'+transactionID;
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
            // console.log(data.data)
            let retData=data.data
            setFinalize(data.data.finalize);
            setTransitions(retData.transitions);
            delete retData.finalize
            delete retData.transitions
            setTransactionsDetail(retData);
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }

    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
            <Alertinfo></Alertinfo>
            <Content data={transactionsDetail} title="Transaction Details"></Content>
            <BasicTable  data={transitions} title="Transitions"></BasicTable>
            <BasicTable valign="vertical" data={finalize} title="Finalize"></BasicTable>
            
        </Container>
  );
}

export default BlockDetail;