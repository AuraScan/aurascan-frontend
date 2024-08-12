import './index.scss'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Card } from 'react-bootstrap'
import BasicTable from '@/components/table';

function TabShow(props) {
    const { data } = props
    const datalist = Object.keys(props.data)
    if ( datalist.length == 0) {
        return (<Card style={{ marginTop: '15px', }}>
            暂无数据
        </Card>)
    }
  return (
    <Tabs
      defaultActiveKey="tab0"
      id="uncontrolled-tab-example"
      className="mb-3"
      >
          {datalist.map((item, index) => { 
              const retdata=data[item]
              console.log("data[item]",retdata)
              return (
              <Tab eventKey={`tab${index}`} title={item}>
                    {retdata.length>0? <BasicTable valign='vertical' data={retdata} title=""></BasicTable>:''}
              </Tab>)
              
          })}
          
    </Tabs>
  );
}

export default TabShow;