
// MyChartComponent.js
import React, { useRef } from 'react';
import { Card, ListGroup,Row,Col } from 'react-bootstrap'
import HeightButton from '@/components/button';
import './index.scss'


const contentComponent = (props) => {
    let columns = [];
    const repeatedData = props.data;
    if (props.data) {
        columns = Object.keys(props.data);
    } 
    const renderContent = (key, itemObject) => { 
        if (key=='Height') {
            return <HeightButton data={itemObject[key]}/>
        }else if (key == 'deploy_transaction' ) { 
            const url='/transactions/'+itemObject[key]
            return  <a className='link_text' href={url}>{itemObject[key]} </a>  
        } else if (key == 'Block Hash' || key == 'Previous Hash') { 
            const url='/block/'+itemObject[key]
            return  <a className='link_text' href={url}>{itemObject[key]} </a>  
        } else if (Array.isArray(itemObject[key])) { 
            return <ListGroup variant="flush" style={{ textAlign: 'left' }}>
            {itemObject[key].map((data) => (
                    <ListGroup.Item key={data}>
                     {data}
                    </ListGroup.Item>
                ))}
                </ListGroup>
        } else if (key == 'Previous Certificate Ids' || key == 'Batch Header Signature' || key == 'Signatures') {
            const arrs = itemObject[key].split(',')
            const ret_data= arrs.map((item) => { 
                return <ListGroup.Item action variant="success">
                        {item}
                        </ListGroup.Item>
            })
            return <ListGroup>{ret_data}</ListGroup>
        } 
        else { 
            return itemObject[key]
        }
    }
    return <>
    { props.title?(<div className='home-list-title height-40 font-18 color-0 font-weight-500'>{ props.title }</div>):""}
    <Card className='content border-none' style={{ marginBottom: '15px' }}>
          {/* { props.title?(<Card style={{borderRadius:'0',borderTop:'none',borderLeft:'none',borderRight:'none'}}>
                <Card.Title style={{ marginTop: '15px', textAlign: 'left', marginLeft: '20px', }}>{ props.title }</Card.Title>
            </Card>):""} */}
        <ListGroup variant="flush" style={{ textAlign: 'left' }}>
            {columns.map((key) => (
                <ListGroup.Item key={key} className='border-color-F3 padding-bottom-0 padding-top-0'>
                    <div className='mycontainer table-cell'>
                        <div className='content-label v-align text-left '>{key}</div>
                        <div className='content-info font-weight-normal font-13 text-left'>{renderContent(key, repeatedData)}</div>
                    </div>
                </ListGroup.Item>
            ))}
    </ListGroup>
  </Card></>;
};

export default contentComponent;
