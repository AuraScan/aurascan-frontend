import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import { Container, Card,Form, Row, Col,Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import Alertinfo from '@/components/alert';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import {transDatetime} from '@/utils/common';
import {get_records_perpage} from '@/store/rootReducer';
import ProgramsIndexShow from './components/programs'


function programsTable() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const location = useLocation();
    const items = Array.from({ length: 50 }, (_, index) => index + 1);
    const records_perpage = useSelector(get_records_perpage)
    // <p>Current Path: {location.pathname}</p>

    const [data, setData] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 调用异步函数
    getPrograms();
  }, [page,pageSize]); // 传递空数组作为依赖项，确保 useEffect 仅在组件挂载时执行一次

  const getPrograms = async() => { 
      const _this = this;
      let data = {
        page:page,
        page_size:pageSize
      };
      let url = '/api/v2/aleo/program/list';
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
        setData(data.data.programs);
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
        <Alertinfo></Alertinfo>
        <div>
        <ProgramsIndexShow></ProgramsIndexShow>
        </div>
        <div className='home-list-title height-40 font-18 color-0 font-weight-500' style={{marginTop:'20px'}}>
          <Row>
            <Col>Programs</Col>
            <Col className='text-right'>
            
            <a href={`programs/deploy`}>
              <Button variant="info" size="sm" style={{marginRight:'10px'}}>Deploy</Button>
            </a>
            <a href={`programs/credits.aleo`}>
              <Button variant="info" size="sm">credits.aleo</Button></a>
            </Col>
          </Row>
          
          </div>
            <Card className='border-none' style={{ marginTop: '15px' ,}}>
                {/* <Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                    <Card.Title style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>Programs  </Card.Title>
                </Card> */}
                
                <div className='padding-20-20'>
          <Table hover className=''>
          <thead >
              <tr className='border-color-F3 bg-gray-F3 height-40'>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '><span style={{marginLeft:'15px'}}>Program Name</span></th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '> Transaction ID</th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Height</th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal '>Timestamp</th>
              <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal text-right '>Times Called</th>
              </tr>
          </thead>
              <tbody>
              {data.map(item => (
                  <tr key={item} className='border-color-F3 height-40'>   
                  <td className='table-cell font-13 font-weight-400'><span style={{ marginLeft: '15px' }}>
                    <a href={`programs/${item.program_id}`}>{item.program_id}</a>
                  </span></td>
                  <td  className='table-cell '> <a href={`transactions/${item.transaction_id}`} className='color-black-18 font-13 font-weight-400'>{item.transaction_id}</a></td>
                  <td  className='table-cell text-center font-13 '>
                    {/* <Button variant="outline-success"  style={{marginLeft:'15px',borderRadius:'20px',padding:'4px 15px'}}> */}
                    <a href={`block/${item.height}`} className='color-black-18 font-13 font-weight-400'>{item.height}</a>
                      {/* </Button> */}
                    </td>		
                  <td  className='table-cell font-13'>{transDatetime(item.time)}</td>
                  <td  className='table-cell text-right'>{item.times_called}</td>
              </tr>))}
          </tbody>
                  </Table>
                </div>
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

export default programsTable;