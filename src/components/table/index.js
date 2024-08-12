import React,{ useState,useRef } from 'react';
import Table from 'react-bootstrap/Table';
import { Card,Badge,ProgressBar,Button } from 'react-bootstrap'
import { shortenWalletAddress,filter_num_decimals,nmberFormat } from '@/utils'
import Content from '../listGroup';
import ListGroup from 'react-bootstrap/ListGroup';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import './index.scss'

function basicTable(props) {
    const [show, setShow] = useState(true);
    let variant = 'success';
    let columns = [];
    const valign = props.valign ? props.valign : 'horizontal'
    const [expandedRow, setExpandedRow] = useState(null);
    // Object.keys(props.data).length === 0||
    if ( props.data.length == 0 ||  !(Array.isArray(props.data))) {
        return (<Card style={{ marginTop: '15px', }}>
            暂无数据
        </Card>)
    } else { 
        
        columns = Object.keys(props.data[0])
        const handleExpand = (rowIndex) => {
            setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
        };
        const repeatedData = props.data;
        const is_compress=props.is_compress? 1:props.is_compress;
        const renderContent = (item, column,index) => { 
            if (column == 'from' || column == 'to' || column == 'address' ||column == 'Address') {
                const url='/address/'+item[column]
                return <a className='link_text  color-black-18 font-13' href={url}>{is_compress==1?shortenWalletAddress(item[column]):item[column]} </a>
            }else if (column == 'id' &&  item[column].startsWith('at') ) {
                const url='/transactions/'+item[column]
                return <a className='link_text' href={url}>  
                {item[column]}
                </a>
            } 
            else if (column == 'transition_id') {
                const url='/transitions/'+item[column]
                return <a className='link_text' href={url}>{shortenWalletAddress(item[column])} </a>
            } else if (column == 'program') {
                const url='/program/'+item[column]
                return <a className='link_text' href={url}>{item[column]}</a>
            } else if (column == 'rank') {
                if(index==0){
                    return <i className="iconfont font-24 icon-mingci5-copy-copy" style={{color:'#ffe256'}}></i>
                }else if(index==1){
                    return <i className="iconfont font-24 icon-mingci" style={{color:'#9ebdd4'}}></i>
                }else if(index==2){
                    return <i className="iconfont font-24 icon-mingci1" style={{color:'#b58471'}}></i>
                }else {
                    return <span style={{marginLeft:'0.5rem'}}>{index + 1}</span>
                }
            } else if (column == 'power/Ratio') { 
                return <ProgressBar variant={variant} now={30} />
            }else if (column == 'height'|| column == 'Block Height'|| column == 'last_block' || column == 'block_height') { 
                const url='/block/'+item[column]
                return <a className='color-black-18 font-13' href={url}> {nmberFormat(item[column])}
                </a>
            } else if (column == 'Power' || column == 'power') { 
                return <span className='color-black-18 font-13 '>{nmberFormat(filter_num_decimals(item[column],2))}</span> 
            } else if (column=='Commitment') { 
                const url='/commitment/'+item[column]
                return <a className='link_text' href={url}>{shortenWalletAddress(item[column])} </a>
            } else if (column == 'id' && item[column].includes('au')) { 
                const url='/transitions/'+item[column]
                return  <a className='link_text' href={url}>{item[column]}</a>
            }else if ( typeof item[column] === 'object') { 
                return  <Button onClick={() => handleExpand(index)}>
                    {expandedRow === index ? 'Collapse' : 'Expand'}
                    </Button>
            } else if (typeof item[column] === 'string' && item[column].includes('{\n')) { 
                // 需要编辑器
                return <SyntaxHighlighter language="javascript" style={docco}>
                            {item[column]}
                       </SyntaxHighlighter>
            }
            else { 
                return item[column]
            }
        }

        const table_horizontal =(columns,repeatedData,expandedRow)=> {
            return (<Table hover className='basic_table'> 
                    <thead className='bg-gray-F3'>
                        <tr className='border-color-F3 bg-gray-77 height-40'>
                            {columns?.map((item, index) => (
                                <th className='text-xs font-13 color-gray-77 table-head-color   font-weight-normal capitalize' key={index}><span>{item}</span></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {repeatedData?.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr className='border-color-F3 height-40'>
                                    {columns.map((column) => (
                                        <td key={column} className='table-cell '>
                                            {renderContent(item, column, index)}
                                        </td>
                                    ))}
                                </tr>
                                {expandedRow === index && (
                                    <tr className='border-color-F3 '>
                                        <td colSpan={columns.length} className='expanded-box table-cell'>
                                            <Content data={item['expanded']}></Content>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>))}
                    </tbody>
                </Table>)
        }

        const table_vertical =(columns,repeatedData,expandedRow)=> {
            return <table hover className='basic_table'>
            { repeatedData?.map((item, index) => (
                <React.Fragment key={index}>
                    
                    <ListGroup style={{margin:'20px'}}>
                    {columns.map((column) => (
                        <ListGroup.Item>
                            <span style={{width:'15%',display: 'inline-block',padding:'5px'}}>{column}</span>
                            <span style={{display: 'inline-block', maxWidth: '800px',width: '100%'}}> {renderContent(item, column, index)}</span>
                        </ListGroup.Item>
                    ))}
                        {expandedRow === index && (
                             <ListGroup style={{margin:'20px'}}>
                                <ListGroup.Item>
                                    <span> <Content data={item['expanded']}></Content></span>
                                </ListGroup.Item>
                            </ListGroup>
                        )}
                    </ListGroup>
                </React.Fragment>))}
            </table>
        }
            
        return (
            < >
            { props.title?(<div className='margin-top-15 home-list-title height-40 font-18 color-0 font-weight-500 v-align'>{ props.title }</div>):""}
            <Card className='border-none padding-20-20 '>
                {valign == 'horizontal' ? table_horizontal(columns,repeatedData,expandedRow) : table_vertical(columns,repeatedData,expandedRow)}
            </Card>
            </>);
    }
}

export default basicTable;