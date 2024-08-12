
import {Row,Form,Col,Tab,Tabs,Button,Container} from 'react-bootstrap';
import MonacoEditorComponent from '@/components/editor/input'
import React, { useEffect,useState } from 'react';
import { requestCreateEvent,EventType,getAccount,connect,connection } from '@puzzlehq/sdk-core';
import {
  Deployment,
  WalletAdapterNetwork,
  WalletNotConnectedError
} from "@demox-labs/aleo-wallet-adapter-base";
import {generateRandomString} from '@/utils'
import './index.scss'

function ProgramsDeploy() {
  const [aleo_code,setAleo_code]=useState("")
  const [leo_code,setLeo_code]=useState('');
  const [fee,setFee]=useState('3000000');
  const [activeTab, setActiveTab] = useState('home'); // 默认显示 'home' 标签页
  const [data,setData]=useState('');
  const [loading, setLoading] = useState(false);
  const [init_wallet, setInit_wallet] = useState(localStorage.getItem('init_wallet'));

  useEffect(()=>{
  },[leo_code,aleo_code])

  const deploy_program=()=>{
    setLoading(true)
    if(init_wallet=='leo'){
      leo_deploy();
    }else if(init_wallet=='puzzle'){
      puzzle_deploy();
    }
  }

  const puzzle_deploy=async()=>{
  }

  const leo_deploy=async()=>{
  }

  // 处理输入框值变化的函数
  const handleInputChange = (event) => {
    setFee(event.target.value); // 更新状态
  };
  const add_program=()=>{
    let name=generateRandomString(8)
    let init_program="// The 'hello_world_"+name+".aleo' program.\nprogram hello_world_"+name+".aleo {\n    transition main(public a: u32, b: u32) -> u32 {\n        let c: u32 = a + b;\n        return c;\n    }\n} "
  
    setLeo_code(init_program);
  };

  const compile_program=async()=>{
    const param_data={"raw":leo_code}
    const _this = this;
    let url = '/api/v2/aleo/leo/compile';
    fetch(url, {
      method: 'post',
      headers: {
          'Content-Type': 'application/json'
      },
      body:JSON.stringify(param_data)
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
      if(data.code==200){
        setAleo_code(data.data)
        setActiveTab('profile')
      }else{
        alert(data.message)
      }
      // _this.setState({data:data.data});
    })
      .catch((error) => { 
      setLoading(false);
      })
  }

  const handleTabChange = (key) => {
    setActiveTab(key);
  };
  
  return <>
    <Container style={{background:'#fff',padding:'30px 15px',lineHeight:'25px'}}>
    <Row>
      <Col className='text-center'>
          <h5><strong>Compile & Deploy Leo Source Code</strong></h5>
          <span>
            {/* SELECT ONE *.LEO FILE OR  */}
            INPUT YOUR CODE</span>
      </Col>
    </Row>
  </Container>

  <Container className='deployContent' style={{marginTop:'20px',background:'#fff',padding:'30px 15px',lineHeight:'25px'}}>
    <Row>
      <Col className='text-center'>
    

      <Tabs
        // defaultActiveKey={tabName}
        activeKey={activeTab}
        onSelect={handleTabChange}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
    <Tab eventKey="home" title="Leo Source Code">
    <div style={{textAlign:'left',marginBottom:'1rem'}} >
        <Button variant="primary" size="sm"  onClick={add_program} style={{marginBottom:'20px', }}> + New</Button>

        </div>
      <MonacoEditorComponent language="go"  method={setLeo_code} code={leo_code}></MonacoEditorComponent>
      <Button variant="info" size="sm" onClick={compile_program} style={{marginTop:'20px'}}>Leo Compile</Button>
    </Tab>
    <Tab eventKey="profile" title="Aleo Source Code">
      <MonacoEditorComponent language="python" method={setAleo_code} code={aleo_code}>
      </MonacoEditorComponent>
      {aleo_code!='' && <Row >
        <Col sm={1} className='font-12'>Fee</Col>
        <Col sm={4}>
          <Form.Control
            type="number"
            value={fee}
            onChange={handleInputChange}
            id="fee"
          />
        </Col>
      </Row>}
      <div><Button variant="info" size="sm"  style={{marginTop:'40px'}} onClick={deploy_program}>Deploy</Button></div>
    </Tab>
  </Tabs>
      </Col>
    </Row>
  </Container>
  </>

}
export default ProgramsDeploy