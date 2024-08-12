import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import {  Card } from 'react-bootstrap'
import {TimeDifference} from '@/utils/common';
import {nmberFormat } from '@/utils';


function HomeBlocksTable() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const items = Array.from({ length: 50 }, (_, index) => index + 1);
    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);


  useEffect(() => {
    // 调用异步函数
    getBlock();
  }, [page]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

  
  const getBlock = async() => { 
      let pageObj={
        "page":page,
        "page_size":6
      }
      const _this = this;
      let data = {
        page:pageObj.page,
        page_size:pageObj.page_size
    };
      let url = '/api/v2/aleo/block/list';
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
        setData(data.data.blocks);
        setDataTotal(data.data.count)
        setLoading(false);
      })
        .catch((error) => { 
        setLoading(false);
        })
  }
  const handlePageClick = (data) => {
      const selectedPage = data.selected + 1;
      // 处理页码变化
      setPage(selectedPage)
  };

  return (
        <div className='home-list'>
          <div className='home-list-title height-40 font-18 color-0 font-weight-500 margin-top-_875 margin-bottom-_5'>
          <i className="iconfont font-24 chart-color margin-right-x5 icon-Blocks"></i>
            <span className='font-18 color-black-00 font-weight-bolder position_-1'>
              Latest Blocks
              </span> 
            </div>
            <Card className='padding-10-20 border-none'>
              <Table hover >      
        <thead>
            <tr className='border-color-F3'> 
            <th className='text-left color-gray-77 font-13 font-weight-normal'> <span>Height</span></th>
            <th className='text-center color-gray-77 font-13 font-weight-normal'>Transactions</th>
            <th className='text-center color-gray-77 font-13 font-weight-normal'>Solutions</th>
            <th className='text-right color-gray-77 font-13 font-weight-normal'>Reward</th>
            </tr>
        </thead>
            <tbody>
            {data.map(item => (
                <tr key={item.height} className='table-row-45 border-color-F3'>          
                <td className='table-cell text-left font-13'>
                  <a href={`/block/${item.height}`}>
                 {nmberFormat(item.height)}
                  </a>
                 <sapn className='color-gray-77 font-12'> <TimeDifference date={item.time}></TimeDifference></sapn>
                </td>		
                <td  className='table-cell text-center font-13  color-black-18'>{item.transactions} </td>
                <td  className='table-cell text-center font-13  color-black-18'>{item.solutions} </td>
                <td  className='table-cell text-right font-13  color-black-18'>{nmberFormat(item.block_reward+item.coinbase_reward)}
                 </td>
            </tr>))}
        </tbody>
                </Table>
               <a href='/blocks'><div className='text-center font-12 color-black-18 height-30 padding-5-10'>VIEW ALL BLOCKS → </div></a> 
            </Card>
            
            </div>
  );
}

export default HomeBlocksTable;