import React, { useEffect,useState, useRef } from 'react';
import {ButtonToolbar,ButtonGroup,Button, Card, Col, Row} from 'react-bootstrap'
import ChartsShow from '@/components/chart/line';
import { useParams } from 'react-router-dom';
import { formatDateTime } from '@/utils'
import './content.scss'

const ChartsTabsComponent = (props) => {
  const chartRef = useRef(null);
  const [type, setType] = useState('solution');
  const { addressId } = useParams();
  const [solution, setSolution] = useState({});
  const [reward, setReward] = useState({});
  const [power, setPower] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
        getSolutions();
        getReward();
        getPower();
    },[addressId])

    const getSolutions = async() => { 
        const _this = this;
        let url = '/api/v2/aleo/prover/solutions/chart/'+addressId;//待改
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
			const myArray = data.data
			const new_x_Array = []
			const new_y_Array = []
			const y_array = []
			myArray.map(item=>{
				let time_ymd = formatDateTime(item.timestamp, 'y-m-d')
				new_x_Array.push(time_ymd)
				y_array.push(item.count)
			})		    
			new_y_Array.push({
				name: 'Solution',
				type: 'line',
				smooth: true,
				data: y_array
			})
			setSolution({'x_data':new_x_Array,'y_data':new_y_Array})
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }
    const getReward = async() => { 
        const _this = this;
        let url = '/api/v2/aleo/prover/reward/chart/'+addressId;//待改
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
			const myArray = data.data
			const new_x_Array = []
			const new_y_Array = []
			const y_array = []
			myArray.map(item=>{
				let time_ymd = formatDateTime(item.timestamp, 'y-m-d')
				new_x_Array.push(time_ymd)
				y_array.push(item.reward)
			})	    
			new_y_Array.push({
				name: 'Reward',
				type: 'line',
				smooth: true,
				data: y_array
			})
			setReward({'x_data':new_x_Array,'y_data':new_y_Array})
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }
    const getPower = async() => { 
        const _this = this;
        let url = '/api/v2/aleo/prover/power/chart/'+addressId;//待改
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
			const myArray = data.data
			const new_x_Array = []
			const new_y_Array = []
			const y_array = []
			myArray.map(item=>{
				let time_ymd = formatDateTime(item.timestamp, 'y-m-d')
				new_x_Array.push(time_ymd)
				y_array.push(item.power)
			})			    
			new_y_Array.push({
				name: 'Power',
				type: 'line',
				smooth: true,
				data: y_array
			})
			setPower({'x_data':new_x_Array,'y_data':new_y_Array})
            // setPower(data.data);
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }

  return <Card className='address-content'  style={{ marginBottom: '15px' }}>
    <Row className='chart-box'>
        <Col className="chart-box-title">Daily Growth</Col>
        <Col>
            <ButtonToolbar className='filter-type' aria-label="Toolbar with button groups" style={{textAlign:"right",float:'right',}}>
                <ButtonGroup className="me-2 filter-type" aria-label="First group">
                {type=='solution'?<Button style={{border:'solid #eee 1px'}} onClick={()=>setType('solution')}>Solution</Button>:<Button variant="" style={{border:'solid #eee 1px'}} onClick={()=>setType('solution')}>Solution</Button>}
                {type=='power'?<Button  style={{border:'solid #eee 1px'}} onClick={()=>setType('power')}>Power</Button>:<Button variant="" style={{border:'solid #eee 1px'}} onClick={()=>setType('power')}>Power</Button>}
                {type=='reward'?<Button style={{border:'solid #eee 1px'}} onClick={()=>setType('reward')}>Reward</Button>:<Button  variant="" style={{border:'solid #eee 1px'}} onClick={()=>setType('reward')}>Reward</Button>}
                </ButtonGroup>     
            </ButtonToolbar> 
        </Col>
    </Row>

    <Row>
        <Col>
        {type=='solution'?<ChartsShow type='line' title=''  data={solution}></ChartsShow>:''}
        {type=='power'?<ChartsShow type='line' title='' data={power}></ChartsShow>:''}
        {type=='reward'?<ChartsShow type='line' title='' data={reward}></ChartsShow>:''}
        </Col>
    </Row>

  </Card>

}

export default ChartsTabsComponent;


