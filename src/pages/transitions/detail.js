import React, { useState, useEffect } from 'react'
import Alertinfo from '../../components/alert';
import Content from '@/components/listGroup'
import TabShow from '@/components/tab';
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';

function BlockDetail() {
    const [show, setShow] = useState(true);
    const { transitionsID } = useParams();
    let variant = 'success';
    const [transitionsDetail, setTransitionsDetail] = useState({});
    const [tablist, setTablist] = useState({});
    // const items = Array.from({ length: 1 }, (_, index) => index + 1);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // 调用异步函数
       console.log("transitionsID",transitionsID)
       getTransitionsDetail(transitionsID)
    }, [transitionsID]);

    const getTransitionsDetail = async(transitionsID) => { 
        const _this = this;
        let url = '/api/v2/aleo/transition/'+transitionsID;
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
            console.log(data.data)
            let retData = data.data
            setTablist({input:retData.input,output:retData.output})
            // setInput(retData.input);
            // setOutput(retData.output);
            delete retData.input
            delete retData.output
            setTransitionsDetail(retData);
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }

    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
            <Alertinfo></Alertinfo>
            <Content data={transitionsDetail} title="Transition Details"></Content>
            
             <Card style={{ marginTop: '15px' ,}}>
                <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Function</Card.Title>
                </Card>
                <TabShow data={tablist}></TabShow>
            </Card>
            {/* <BasicTable  data={input} title="Transitions"></BasicTable>
            <BasicTable valign="vertical" data={output} title="Finalize"></BasicTable> */}
            
        </Container>
  );
}

export default BlockDetail;