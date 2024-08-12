import { Row, Col, Container } from 'react-bootstrap'
import twitter from '@/assets/images/twitter.png'
import telegram from '@/assets/images/telegram.png'
import email from '@/assets/images/email.png'
import facebook from '@/assets/images/facebook.png'
import zhihu from '@/assets/images/zhihu.png'
import weixin from '@/assets/images/weixin.png'
import logo from '@/assets/images/logo.png'
import React from "react";

import './index.scss';

export const FootApp = () => { 

    return (
        <> <Container style={{width:'100%'}} >
        <Row className='' >
            <Col xs={6} className='left-area'>
            <div>
              <img src={logo} style={{width:'2rem'}}></img> <span style={{fontSize:'1.6rem',fontWeight:'bolder',position:'relative',top:'0.5rem',left:'0.3rem',color:'#1c6afd'}}>Aurascan</span>
            </div>
            <div style={{marginTop:'15px'}}>The best blockchain explorer of Aurascan</div>
            <div style={{marginTop:'45px'}}>
              <a
              href="https://twitter.com/Aurascan_hk"
              target="_blank"
              style={{marginLeft:0}}
            ><img
              src={email}
              alt="twitter"
              width="25px"
              height="25px"
              
            /></a>
            <a
              href="https://www.zhihu.com/people/cha-na-73"
              target="_blank"
            ><img
              src={telegram}
              alt="zhihu"
              width="25px"
              height="25px"
            /></a>

            <a
              href="https://www.zhihu.com/people/cha-na-73"
              target="_blank"
            ><img
              src={zhihu}
              alt="zhihu"
              width="25px"
              height="25px"
            /></a>

            <a  href="https://www.zhihu.com/people/cha-na-73"
              target="_blank"
            ><img
              src={facebook}
              alt="zhihu"
              width="25px"
              height="25px"
            />
            </a>
            {/* <a  href="https://www.zhihu.com/people/cha-na-73"
              target="_blank"
            ><img
              src={twitter}
              alt="twitter"
              width="25px"
              height="25px"
            /></a> */}

<a  href="https://www.zhihu.com/people/cha-na-73"
              target="_blank"
            ><img
              src={weixin}
              alt="twitter"
              width="25px"
              height="25px"
            /></a>


            </div>
            <div style={{marginTop:'15px'}}>Copyright © 2023-2024 Aurascan</div>

          </Col>
            <Col xs={6}  className='right-area'>
            <Row>
              <Col>
                <div className="list-group list-group-flush">
                  <a href="#" className="list-group-item list-group-item-action active list-title" aria-current="true">
                  About Us
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">Privacy Policy</a>
                  <a href="#" className="list-group-item list-group-item-action">Terms of Service</a>
                </div>
</Col>
              <Col>
              <div className="list-group list-group-flush">
                  <a href="#" className="list-group-item list-group-item-action active list-title" aria-current="true">
                  Tools & Support
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">Aleo SDK</a>
                  <a href="#" className="list-group-item list-group-item-action">Aleo wallet</a>
                  <a href="#" className="list-group-item list-group-item-action">Aleo Package Manager</a>
                  <a href="#" className="list-group-item list-group-item-action">Aleo Faucet</a>
                </div>
              </Col>
              <Col>
              
              <div className="list-group list-group-flush">
                  <a href="#" className="list-group-item list-group-item-action active list-title" aria-current="true">
                  Aleo Resources
                  </a>
                  <a href="#" className="list-group-item list-group-item-action">X</a>
                  <a href="#" className="list-group-item list-group-item-action">GitHub</a>
                  <a href="#" className="list-group-item list-group-item-action">Developer Documentation</a>
                  <a href="#" className="list-group-item list-group-item-action">Community Blog</a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
    </Container>
    </>
    )
}
