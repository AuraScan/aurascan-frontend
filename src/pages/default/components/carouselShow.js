import Carousel from 'react-bootstrap/Carousel';
import bannerBg from '@/assets/images/bannerBg.png'
import { Row, Col,Container, Card,Alert,InputGroup,Form ,Image,Button} from 'react-bootstrap'
import './carousel.scss'
import ALeoLogo from '@/assets/images/ALeo-logo.png'
import ChartsShowComponent from '@/pages/components/chartsMoreShow'

function CarouselShow() {
  return (
    // <Carousel className='carouselSet'>
    //   <Carousel.Item>
    //     <Image src={bannerBg} text="First slide" className='imageSet' />
    //     <Carousel.Caption>
    //       <h3>第 一 张 图</h3>
    //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <Image src={bannerBg} text="First slide"  className='imageSet'  />
    //     <Carousel.Caption>
    //       <h3>第 二 张 图</h3>
    //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <Image src={bannerBg} text="First slide"  className='imageSet' />
    //     <Carousel.Caption>
    //       <h3>第 三 张 图</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
    <>
      <Row style={{fontSize:'12px',marginBottom:'30px',lineHeight:'25px'}}>
          <Col xs={12} md={7}>
          <h4 style={{color:'#181818',fontSize:'18px',fontWeight:'bolder'}}>Welcome to Aleo Explorer</h4>
          <span  style={{fontSize:'12px'}}>If you encounter any problems, please give us feedback. 
          <span className="icon iconfont icon-taiyang-copy"></span>
          </span>

      </Col>
          <Col  xs={5} md={5}>
          <Row>
          <Col xs={4} md={4}> 
            <div style={{marginLeft:'20%'}}>
                   {/* 左边是图 */}
                      {/* <span style={{float:'left'}}>
                      <Image src={ALeoLogo} fluid></Image>
                      </span> */}
                      {/* 右边上下结构的两行文案 */}
                      {/* <span  style={{float:'left',marginLeft:'10px'}}>
                          <span style={{display:'block'}}>Aleo</span>
                          <span>$84.3</span>
                      </span> */}
                      {/* <div style={{clear:'both',marginBottom:'30px'}}></div> */}
                {/* 右边是增长率数据 */}
                  <div>
                    {/* <span className='label-color' style={{display:'block'}}>市值：¥5395.58</span> */}
                    {/* <span className='label-color'>流通量：23343535</span> */}
                  </div>
            </div>
          </Col>
          <Col xs={12} md={8}>
            {/* <ChartsShowComponent type='line' title='2014-03-12 12:00'></ChartsShowComponent> */}
          </Col>
          </Row>  
          </Col>
      </Row>
    </>
  );
}

export default CarouselShow;