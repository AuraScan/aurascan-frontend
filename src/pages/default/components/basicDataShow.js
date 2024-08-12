import React, { useState, useEffect,useRef } from 'react'

import { Row, Col, Card, Alert,Button } from 'react-bootstrap'

import {timeStampDifference,divided_by_power_of_10,filter_num_decimals,nmberFormat,blockEpochRatio} from '@/utils'
import '../index.scss'

function BasicDataShow() { 
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [wsdata, setWsData] = useState({});
    const [messages, setMessages] = useState([]);
    const [timeAgo,setTimeAgo]=useState('');
    const [open,setOpen]=useState('0');
    const timerID = useRef(null);
    const ws = useRef(null);
    const [is_init,setinit]=useState(0);


    useEffect(() => {
      // console.log("ws===null || ws===undefined", ws,ws.current===null, ws===null, ws===undefined)
      if(is_init==0){
        getBasicDataHttp();
      }
      if(ws?.current===null || ws===null || ws===undefined){
        // console.log("ws>>>>>",ws);
        getBasicDataWs();
      }
      // 创建定时任务
      timerID.current = setInterval(() => {
        setWsData(PreData=>{
          // console.log('执行定时任务...',PreData);
          getTime(PreData.timestamp);
          return PreData
        })
        // 定时任务的逻辑...
      }, 1000);
    // 返回清理函数
    return () => {
      // 清除定时任务
      clearInterval(timerID.current);
    };
      
    }, []); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

    const getTime=(latest_block_time)=>{
        let currentTime = new Date().getTime();
        let ret_str=timeStampDifference(latest_block_time,currentTime);
        setTimeAgo(ret_str)
      
    }

      // websorcket 读取数据～李攀
     const getBasicDataWs=()=>{
        // 调用异步函数
        // 创建WebSocket连接
          ws.current = new WebSocket('wss://aurascan.xyz/api/v2/aleo/latest/sub');

          // 处理连接打开事件
          ws.current.onopen = () => {
            console.log('WebSocket连接已打开');
            // 连接打开后，你可以向服务器发送一条消息，例如：
            // ws.current.send(JSON.stringify({ action: 'subscribe', channel: 'news' }));
            // ws.current.send(JSON.stringify({ action: 'latest-block' }))
          };

          // 处理接收到的消息
          ws.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            let metadata=message.data?.header?.metadata
            // console.log("message",message)
            if(metadata){
              setWsData({...wsdata,...metadata})
              // console.log("data.data.header.metadata.height;",message.data.header.metadata.height)
            }
            // if(typeof(message.data)
            // if(message.data && header in message.data){
            //   console.log("getBasicDataWs>>>>",message.data.header)
            // }
            // 
            // setMessages((prevMessages) => [...prevMessages, message]);
          };

          // 处理连接关闭事件
          ws.current.onclose = () => {
            console.log('WebSocket连接已关闭');
          };

          // 处理错误事件
          ws.current.onerror = (error) => {
            console.error('WebSocket发生错误:', error);
          };

          // 组件卸载时关闭WebSocket连接
          return () => {
            if (ws.current) {
              ws.current.close();
            }
          };
     }

     // 获取基础数据～沈欢
     const getBasicDataHttp=async()=>{
      const _this = this;
      let url = '/api/v2/aleo/network/overview';
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
        setinit(1)
        setData(data.data)
        
        if(Object.keys(wsdata).length === 0){
          setWsData({
            'timestamp':data.latest_block_time,
            "height":data.block_height,
            ...data.data
          })
        }
        getTime();
        console.log("wsdata",wsdata)
        // _this.setState({data:data.data});
  
      })
        .catch((error) => { 
        setLoading(false);
        })
     }

     const handClick=(num)=>{
        setOpen(num)
     }

    return (
        <>
        <Card className='basic_info padding-20-30 border-none'>
          <Card.Title className='basic_info_title'>
          <i className="iconfont font-24 chart-color margin-right-x5 icon-overview"></i>
            <span className='font-18 color-black-00 font-weight-bolder position_-1'>
              Network Overview
              </span> 
              <span className='text-right' style={{float:'right'}}>
              {  open=='0' && <Button className='basic_info_open font-12' size='sm' variant="outline-secondary" onClick={()=>handClick('1')} >
                Fold
              <i className="iconfont font-14 icon-ic_chevron_right_px1 color-gray-77" style={{position:'relative',left:'0.1rem',bottom:'-0.05rem'}}></i>
              </Button>}
              {  open=='1' && <Button className='basic_info_open font-12'  size='sm' variant="outline-secondary" onClick={()=>handClick('0')} >Unfold
              <i className="iconfont font-14 icon-ic_chevron_right_px color-gray-77" style={{position:'relative'}}></i>
              </Button>}
              </span>
            </Card.Title>
          <Card.Text>
            <Row>
              <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-12 '>Block Height</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>
                    {wsdata.height && nmberFormat(wsdata.height)}
                    <span className='font-13'>({blockEpochRatio(wsdata.height)}/360)</span>
                  </span>
                </Alert>
              </Col>
              <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13 '>Current Epoch</p>
                  <span className='basic_info_data   font-20  color-black-18 text-xl font-weight-500'>{data.epoch && nmberFormat(data.epoch)}</span>
                </Alert>
              </Col>
                <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Estimated Network Speed (15m)</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>
                    {data.estimated_network_speed && nmberFormat(filter_num_decimals(data.estimated_network_speed,0  ))} s/s
                    </span>
                </Alert>
                </Col>
                <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Total Puzzle Reward</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>
                  {data.network_reward && nmberFormat(filter_num_decimals(divided_by_power_of_10(data.network_reward),2))}
                  </span> 
                </Alert></Col>
                <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Latest Block</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>{timeAgo}</span>
                </Alert>
              </Col>
              <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Network Miners</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>
                  {data.network_miners && nmberFormat(data.network_miners)}
                  </span>
                </Alert></Col>
                <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Proof Target</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>{wsdata.proof_target && nmberFormat(wsdata.proof_target)}</span>
                </Alert></Col>
                <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Network Staking</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>{data.network_staking && nmberFormat(filter_num_decimals(divided_by_power_of_10(data.network_staking),2))}</span>
                </Alert>
              </Col>
            </Row>
              {  open=='1' &&  <Row>
              <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Network Validators</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>{data.network_validators && nmberFormat(data.network_validators)}</span>
                </Alert>
                </Col>
     
              <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Network Programs</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>{data.program_count && nmberFormat(data.program_count)}</span>

                </Alert></Col>
              <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Network Delegators</p>
                  <div className='basic_info_wapper'>
                    <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>
                    {data.network_delegators && nmberFormat(data.network_delegators)}
                    </span></div>

                </Alert></Col>
              <Col xs={3} md={3} >
                <Alert>
                  <p className='text-xs font-13  '>Coinbase Target</p>
                  <span className='basic_info_data  font-20  color-black-18 text-xl font-weight-500'>
                  {wsdata.coinbase_target && nmberFormat(wsdata.coinbase_target)}
                  </span>

                </Alert>
              </Col>
  
           
            </Row>
            }
          </Card.Text>
        {/* </Card.Body> */}
      </Card>
      </>
    )
}

export default BasicDataShow;