
// MyChartComponent.js
import React, { useRef } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap'
import HeightButton from '@/components/button';
import './content.scss'


const contentComponent = (props) => {
    const url = '/address/aleo1w6v6lqpc0qlnlvmch77xen5ncgqyaxtk8e6y0l2ds79ukpt6vg8q0yz9u7'
    const hashurl='/block/aleo1w6v6lqpc0qlnlvmch77xen5ncgqyaxtk8e6y0l2ds79ukpt6vg8q0yz9u7'
  const chartRef = useRef(null);
    return <Card className='commitment-content' style={{ marginBottom: '15px' }}>
    <ListGroup variant="flush" style={{textAlign:'left'}}>
        <ListGroup.Item>
            <span className='commitment-content-label'>Height</span>
            <span className='commitment-content-info'>
                <HeightButton data="779,593"/>
            </span>
        </ListGroup.Item>
            <ListGroup.Item><span className='commitment-content-label'>Block Hash</span>
                <span className='commitment-content-info'>
                <a className='link_text' href={hashurl}>ab1f9ngku3d4q3fahlu5sllcrjlz979km07sv2m0mkk0eww3h82rsgq37h44f </a>
            </span></ListGroup.Item>
    <ListGroup.Item><span className='commitment-content-label'>Commitment</span><span  className='commitment-content-info'>12121</span></ListGroup.Item>
            <ListGroup.Item><span className='commitment-content-label'>Address</span><span className='commitment-content-info'>       
            <a className='link_text' href={url}>aleo1w6v6lqpc0qlnlvmch77xen5ncgqyaxtk8e6y0l2ds79ukpt6vg8q0yz9u7 </a>
            </span></ListGroup.Item>
    <ListGroup.Item><span className='commitment-content-label'>Power</span><span className='commitment-content-info'>0.818407</span></ListGroup.Item>
    <ListGroup.Item><span className='commitment-content-label'>Target</span><span  className='commitment-content-info'>
37,886,604</span></ListGroup.Item>
    </ListGroup>
  </Card>;
};

export default contentComponent;
