import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
// import Badge from 'react-bootstrap/Badge';
// import Button from 'react-bootstrap/Button';
import { Container, Card,Alert,Form } from 'react-bootstrap'
import Alertinfo from '@/components/alert';
import {transDatetime} from '@/utils/common';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import {get_records_perpage} from '@/store/rootReducer';

function transactionsTable() {
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
        getTransitions();
    }, [page,pageSize]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

    
  const getTransitions = async() => { 
      let pageObj={
        "page":page,
        "page_size":pageSize
      }
      const _this = this;
      let data = {
        page:pageObj.page,
        page_size:pageObj.page_size
    };
      let url = '/api/v2/aleo/transition/list';
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
        setData(data.data.transitions);
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
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
        {/* <Alertinfo></Alertinfo> */}
        <div className='home-list-title height-40 font-18 color-0 font-weight-500'>Transitions</div>
            <Card  className='padding-10-20 border-none'>
                {/* <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Transitions</Card.Title>
                </Card> */}
        <Table   hover>
        <thead>
            <tr className='border-color-F3 height-40 border-radius-5'>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal  text-left border-radius-5'> Transition ID</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal  text-left '>Height</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal  text-left '>Timestamp</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal  text-left '>Program</th>
            <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal  text-left border-radius-5'> <span style={{marginRight:'15px'}}>Function</span></th>
            </tr>
        </thead>
            <tbody>
            {data.map(item => (
                <tr key={item.id} className='border-color-F3'>   
                <td  className='table-cell text-left font-13 color-black-18'> <span> <a href={`/transitions/${item.id}`}>{item.id}</a> </span></td>
                <td  className='table-cell text-center font-13 color-black-18'>
                  <a href={`/block/${item.height}`} className='color-black-18 text-center'>{item.height}
                  </a>
                </td>		
                <td  className='table-cell text-center font-13 color-black-18'>{transDatetime(item.time)}</td>
                <td  className='table-cell text-left font-13 color-black-18'><a href={`/program/${item.program}`} className='color-black-18'>{item.program}</a></td>
                <td  className='table-cell text-left font-13 color-green-00'>{item.function}</td>
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
                return <option aria-checked value={item}>{item}/page  <span className="icon iconfont" style={{color:'#ffffff'}}> </span> </option>
              })}
              </Form.Select>
              </span>
            </div>

            </Container>
  );
}

export default transactionsTable;