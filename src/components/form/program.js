import './index.scss';
import {Row,Col,InputGroup,Form,Button }from 'react-bootstrap';
import React, { useState,useEffect } from 'react';
import { requestCreateEvent,EventType,getAccount,connect,connection } from '@puzzlehq/sdk-core';
// import { useAccount } from '@puzzlehq/sdk';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPublicAddress } from '@/store/rootReducer';
import {
  Transaction,
  WalletAdapterNetwork,
  WalletNotConnectedError
} from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";



function FormProgram(props) {
  const funcs=props?.funcs??[];
  let isInit=0;
  const { programID } = useParams();
  const publicAddress = useSelector(getPublicAddress);
  const [init_wallet, setInit_wallet] = useState(localStorage.getItem('init_wallet'));
  const [selectedValue, setSelectedValue] = useState('');
  const [fee, setFee] = useState(1);//fee
  const [ret, setRet] = useState('');//fee
  const [inputs, setInputs] = useState('');
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState({});
  const [formData,setFormData]=useState({})
  const [error, setError] = useState('');
  let init_inputs=''

  const { publicKey, requestTransaction } = useWallet();//leo

  // 只用于program详情页 执行合约
  let funcObj={};
  const optionList=funcs.map((items,index)=>{
    let name=items.name
    let values=items.inputs
    funcObj={[name]:values, ...funcObj}
    index==0? init_inputs=values:''
    return <option value={items.name}>{items.name}</option>

  })
  useEffect(()=>{
    // 获取当前登陆钱包账户
    initAccount();
    setInputs(init_inputs)
  }, [props,publicAddress,localStorage.getItem('init_wallet')])

  const handleChange=(e)=>{
    let name=e.target.value
    let inputList=funcObj?.[name]
    setInputs(inputList)
    setSelectedValue(name)
  }
  const handleInputChange = (index, event) => {
    
    const { name, value } = event.target;
    setFormData({ ...formData,[name]: value})
  };
  const handleFeeChange=(e)=>{
    setFee(e.target.value)
  }
  
  // 执行函数，之前，收集配置参数
  const handleExec=async(e)=>{
    // return false;
    setRet('')
    if(localStorage.getItem('init_wallet')=='puzzle'){
      puzzle_exec_program();
    }else if(localStorage.getItem('init_wallet')=='leo'){
      leo_exec_program()
    }
  }

  const onConnectPuzzle = () => { 
    setLoading(true)
    connect().then((response) => {
        if (response) {
            setLoading(false)
            // dispatch(setPuzzleWallet(response))
            // dispatch(setInitWallet('puzzle') )
            // setInit_wallet('puzzle')
            console.log("Program >> onConnectPuzzle",response,response.account)
            setAccount(response);
        // setSession(response)
            // const address = response?.namespaces['aleo']['accounts'][0].split(':')[2];
            // setAddress(address);
            // dispatch(setPublicAddress(address))
            // dispatch(setPublicAddress(address))
        }
      })
  }

  const initAccount=async()=>{
    setLoading(true);
    setError(undefined);
    try {
      if(localStorage.getItem('init_wallet')=='puzzle'){
        onConnectPuzzle();
      }else{
        const response = await getAccount()
        if (response.account) setAccount(response.account);
        else if (response.error) setError(response.error);
      }
    } catch (e) {
      setError((e).message);
    } finally {
      setLoading(false);
    }
  }
  const puzzle_exec_program = async()=>{
  
  }
  const leo_exec_program = async () => {
    
  };


  const buttonText = (() => {
    if (account && Object.keys(account).length!==0 && publicAddress !='' && localStorage.getItem('init_wallet')=='puzzle') {
      return <Button variant="primary" onClick={handleExec}  className='btn-area' disabled={loading}>Execute</Button>
    } else if(publicAddress !='' && localStorage.getItem('init_wallet')=='leo'){
      return <Button variant="primary" onClick={handleExec}  className='btn-area' disabled={!window.leoWallet.publicKey||loading}>Execute</Button>
    }else if (loading) {
      return <Button variant="primary"  className='btn-area' disabled>Loading...</Button>
    } else {
      return <Button variant="primary"  className='btn-area' disabled>Connect Your Wallet</Button>
    }
  })()

  return (
    <Form className='programForm'>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Function
        </Form.Label>
        <Col sm="4">
            <Form.Select value={selectedValue} className='input-area' aria-label="" onChange={handleChange}>
                {/* <option>Open this select menu</option> */}
                {optionList}
            </Form.Select>
        </Col>
      </Form.Group>
     {/* {inputList} */}
     {inputs && inputs.map((value,index)=>(
     <Form.Group as={Row}  className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Input #{index+1} ({value})
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" name={'inputs_'+index}
            value={formData['inputs_'+index] || ''}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="" className='input-area' />
        </Col>
      </Form.Group> 
     ))}

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Fee
        </Form.Label>
        <Col sm="4">
          <Form.Control
          placeholder="Fee (in microcredits)"
          className='input-area'
          value={fee}
          onChange={handleFeeChange}
        />
        </Col>
      </Form.Group>
      <Col sm="12" className='text-center'>
      {ret && ret!=''? "TransactionId:"+ret.transactionId :''}
      </Col>
      <Col sm="12" className='text-center'>
       {buttonText}
      </Col>
    </Form>
  );
}

export default FormProgram;