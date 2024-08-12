import React, { useEffect,useState, useRef } from 'react';
import { Row,Col, Card } from 'react-bootstrap';
import ChartsPie from '@/components/chart/pie'
import ChartsShow from '@/components/chart/line';
import { useParams } from 'react-router-dom';


const ValidatorsCharts = (props) => {
	const addressDetail=props.data
    const [data, setData] = useState({'x_data':[],'y_data':[]});
	const [piedata, setPieData] = useState([
              { value: addressDetail.delegator_stake, name: 'Delegators' },
              { value: addressDetail.bond_credits , name: 'Validator' },
         ]);
	
	const { addressId } = useParams();
    const [loading, setLoading] = useState(true);
    const handleChange = () =>{

    }    
    useEffect(() => {
        // getDetail();// 类型判断 validator，还是普通address 还是 特殊无值
        // initFavorites();
    },[addressId])

    const getPie = async() => { 
        const _this = this;
        let url = '/api/v2/aleo/prover/detail/'+addressId;//待改
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
            // setDetail(data.data);
            setLoading(false);
        })
            .catch((error) => { 
            setLoading(false);
            })
    }

    return <>
    <Row style={{marginBottom:'20px'}}>
        <Col>
			<Card className='border-none'>
			    <div className='home-list-title height-40 font-16 color-0 font-weight-500 padding-0-20' style={{lineHeight: '40px',borderBottom: 'solid 1px #eee'}}>
				Stake
				</div>
				<ChartsPie data={piedata}></ChartsPie>
			</Card>
		</Col>
		
        <Col>
			<Card className='border-none'>
				<div className='home-list-title height-40 font-16 color-0 font-weight-500 padding-0-20' style={{lineHeight: '40px',borderBottom: 'solid 1px #eee'}}>
				Stake / Profit
				</div>
				<ChartsShow type='line' data={data}></ChartsShow>
			</Card>
        </Col>
    </Row>
    </>
}
export default ValidatorsCharts;