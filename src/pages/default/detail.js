
import React, { Component } from 'react';
import { Row, Col, Container, Card, Alert,Button } from 'react-bootstrap'
import CarouselShow from './components/carouselShow';
import BasicTable from '@/components/table'
import HomeBlocksTable from './components/blocks'
import HomeTransactionsTable from './components/transactions'
import BasicDataShow from './components/basicDataShow'
import ProgramsShow from './components/programs'
import ChartsSpeed from './components/chartsSpeed';
import ChartsProof from './components/chartsProof';
import ChartsTop10 from './components/chartTop10';

import './index.scss'

class InfoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dataTotal: 0,
      currentPageData: [],
      setCurrentPageData: [],
      programMonthData: { x_data: [], y_data: [], title: 'test11' },
      programDayData: {
        x_data: [],
        y_data: []
      },
    };
  }

  handlePageChange = (currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPageData(allData.slice(startIndex, endIndex));
  };

  getProvers = async() => { 
    const _this = this;
    let url = '/api/v2/aleo/prover/list/1h';
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
      _this.setState({data:data.data});

    })
      .catch((error) => { 
      // setLoading(false);
      })
}

  componentDidMount() {
    // 异步操作，例如 fetch 数据
    this.getProvers();
  }

  handleSelectChange = (selectedKey) => {
    this.setState({ selectChart: selectedKey })
  }

  render() {
    const { data, dataTotal, programMonthData, chartRadios, programDayData, selectChart, currentData, powerMonthData, rewardMonthData, solutionMonthData } = this.state;
    const itemsPerPage = 5;
    let sliceData=[]
    if(data && data.length>10){
      sliceData = data.slice(0, 10);
    }

    // 当 data 更新时，组件会重新渲染
    return (
      <>
        <Container>
          {/* <CarouselShow></CarouselShow> */}
          <BasicDataShow></BasicDataShow>
          <Row> 
            <Col xs={6} md={6} >
              <HomeBlocksTable></HomeBlocksTable>
            </Col>
            <Col xs={6} md={6} >
              <HomeTransactionsTable></HomeTransactionsTable>
            </Col>
          </Row>
          <Row > 
            <Col xs={12} md={12} >
            <ProgramsShow></ProgramsShow>
            </Col>
          </Row>
          <Row > 
            <Col xs={6} md={6} >
              <ChartsSpeed></ChartsSpeed>
            </Col>
            <Col xs={6} md={6} >
              <ChartsProof></ChartsProof>
            </Col>
          </Row>

          <Row>
            <Col sm={12}>
             <ChartsTop10></ChartsTop10>
            </Col>
          </Row>

          <div className='home-list-title height-40 font-18 color-0 font-weight-500 margin-top-_875 margin-bottom-_5'>
           
            <i class="iconfont font-24 chart-color margin-right-x5 icon-paiming"></i>
                  <span className='font-18 color-black-00 font-weight-bolder position_-1'>
                  Provers Leaderboard
                    </span> 
            </div>
          <Card className='basic_info  border-none'  style={{ width: '100%',padding:'0',margin:'0' }}>
            {data ? (<>
              <BasicTable data={sliceData} is_compress={0}></BasicTable>

             <a style={{textAlign: 'center'}} href='/provers'> 
             <Button variant="outline-secondary" className='btn_all_box color-black-18 font-13' style={{marginTop:'-1rem',zIndex:'999',position:'relative'}}>View All Leaderboard</Button></a>

            </>
             )
               : (<div style={{ textAlign: 'center', margin: '10px auto', }}>暂无数据</div>)}
          </Card>
        </Container>
      </>
    );
  }
}

export default InfoList;



