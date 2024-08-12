import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { Container, Card ,Form} from 'react-bootstrap'
// import Alertinfo from '@/components/alert';
import ReactPaginate from 'react-paginate';
import {transDatetime} from '@/utils/common';
import { useSelector } from 'react-redux';
import {get_records_perpage} from '@/store/rootReducer';


function blocksTable() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const items = Array.from({ length: 50 }, (_, index) => index + 1);
    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);
    const records_perpage = useSelector(get_records_perpage)


  useEffect(() => {
    // 调用异步函数
    getBlock();
  }, [page,pageSize]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

  
  const getBlock = async() => { 
      const _this = this;
      let data = {
        page:page,
        page_size:pageSize
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
  const  handleChange = (event) => {
    setPage(1)
    setPageSize( parseInt(event.target.value) );
  }

  return (
        <Container style={{marginBottom:'100px'}} >
            {/* <Alertinfo></Alertinfo> */}
            <div className='home-list-title height-40 font-18 color-black-00 font-weight-bolder position_-1
            '>Blocks</div>
            <Card  className='padding-20-20 border-none'>
                {/* <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Blocks</Card.Title>
                </Card> */}
              <Table  hover className='basic_table'>      
        <thead className='bg-gray-F3'>
            <tr className='border-color-F3 bg-gray-77 height-40'>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal capitalize'> Height</th>
            <th className='text-xs font-13 color-gray-77 table-head-color font-weight-normal text-left'>Epoch</th>
            {/* <th>Round</th> */}
            <th className='text-xs font-13 color-gray-77 table-head-color font-weight-normal '>Timestamp</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal capitalize'>Transactions</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal capitalize'>Proof Target</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal capitalize'>Coinbase Target</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal capitalize'>Block Reward</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal capitalize'>Coinbase Reward</th>
            <th className='text-xs font-13 color-gray-77 table-head-color text-right   font-weight-normal capitalize'>Puzzle Solutions	</th>
            </tr>
        </thead>
            <tbody>
            {data.map(item => (
                <tr key={item.height} className='border-color-F3 height-45'>  
                <td  className='table-cell text-left font-13 color-black-18'>
                <a href={`/block/${item.height}`}>
                    <span className='text-left'>{item.height}</span>
                </a>        
                </td>	  
                <td  className='table-cell '>
                {item.epoch}
                <span className='font-12 color-gray-8B'>&nbsp;({item.epoch_index}/360)</span>
                  </td>  
                <td  className='table-cell'>{transDatetime(item.time)}</td>
                <td  className='table-cell '>{item.transactions}</td>
                <td  className='table-cell '>{item.proof_target}</td>
                <td  className='table-cell ' >{item.coinbase_target}</td>
                <td  className='table-cell '>{item.block_reward} </td>
                <td  className='table-cell  text-center font-13 font-weight-400 color-red-BE'>{item.coinbase_reward}</td>
                <td  className='table-cell text-right font-13 font-weight-400 color-black-18'>{item.solutions}</td>
                
            </tr>))}
        </tbody>
                </Table>
            </Card>
            <div className='height-36 line-height-36 padding-top-20'>
              <span className='float_left color-black-1D font-14'>共 {dataTotal} 条</span>
              <span className='float_left padding-left'>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={dataTotal/pageSize}
                previousLabel="<"
                activeClassName={'active'}
                containerClassName={'pagination'}
                style={{float:'right'}}
                // renderOnZeroPageCount={null}
              />
              </span>
              <span className='float_left padding-left'>
              <Form.Select size="lg"
                value={pageSize}
                onChange={handleChange}
                className='float_left height-36 font-14 bg-gray-F2 border-none border-radius-2 padding-6-12 color-black-1D'>
              {records_perpage.map((item)=>{

                return <option aria-checked value={item}>{item}/page  <span class="icon iconfont" style={{color:'#ffffff'}}> </span> </option>
              })}
              </Form.Select>
              </span>
            </div>
      
            </Container>
  );
}

export default blocksTable;