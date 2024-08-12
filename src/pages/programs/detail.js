import './index.scss'
import React, { useState, useEffect } from 'react'
import Alertinfo from '../../components/alert';
import Content from '@/components/listGroup'
import { Container, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
// import ChartsShowComponent from '@/components/chart/line'
import ChartsShowComponent from '../components/chartsShow'
import {formatDateTime} from '@/utils';
import TabProgramshow from '@/components/tab/program'



function BlockDetail() {
    const [show, setShow] = useState(true);
    const { programID } = useParams();
    let variant = 'success';
    const [programDetail, setprogramDetail] = useState({});
    const [tablist, setTablist] = useState({});
    // const items = Array.from({ length: 1 }, (_, index) => index + 1);
    const [loading, setLoading] = useState(true);
    const [programChartData, setProgramChartData] = useState({x_data:[],y_data:[],title:'test11'});
    const [programTransition, setProgramTransition] = useState([]);
    const [programCode, setProgramCode] = useState([]);
    const [programfunc, setProgramFunc] = useState([]);
    const [programMappingNames, setProgramMappingNames] = useState([]);
    const [page, setPage] = useState(1);
    // programMonthData: {x_data:[],y_data:[],title:'test11'},
    
    useEffect(() => {
        // 调用异步函数
       getProgramDetail(programID)
       getProgramChart(programID)
       getTransitions(programID)
       getProgramCode(programID)
       getMappingNames(programID)
    }, [programID,page]);

    const getProgramDetail = async(programID) => { 
        const _this = this;
        let url = '/api/v2/aleo/program/'+programID;
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
            let retData = data.data
            delete retData.deploy_timestamp
            setprogramDetail(retData);
            setLoading(false);
        })
        .catch((error) => { 
            setLoading(false);
        })
    }

    const getProgramChart = async(programID) => { 
        const _this = this;
        let url = '/api/v2/aleo/program/chart/'+programID;
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
            let retData = data.data
            let x_data=[];
            let y_data=[];
            retData.map((item,index)=>{
                let time_current=formatDateTime(item.timestamp,'y-m-d')
                x_data.push(time_current)
                y_data.push(item.value)
            })
                setProgramChartData({'x_data':x_data,'y_data':y_data})
        })
        .catch((error) => { 
            setLoading(false);
        })
    }

    const getTransitions = async(programID) => { 
        const _this = this;
        let pageObj={
            "page":page,
            "page_size":10,
            "program_id":programID
          }
        let url = '/api/v2/aleo/transition/list';
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(pageObj)
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
            setProgramTransition(data.data.transitions)
        })
        .catch((error) => { 
            setLoading(false);
        })
    }

    const getProgramCode = async(programID) => { 
        const _this = this;
        let url = '/api/v2/aleo/program/source_code/'+programID;
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
            let retData = data.data.source_code
            let functions = data.data.functions
            setProgramFunc(functions)
            setProgramCode(retData)
        })
        .catch((error) => { 
            setLoading(false);
        })
    }

    const getMappingNames = async(programID) => { 
        const _this = this;
        let url = '/api/v2/aleo/program/mapping/names/'+programID;
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
            let retData = data.data
            setProgramMappingNames(retData)
        })
        .catch((error) => { 
            setLoading(false);
        })
    }

    const executeMappings= async(mapping_name,mapping_key) => { 
        const _this = this;
        let executeObj={
            "mapping_name":mapping_name,
            "mapping_key":mapping_key,
            "program_id":programID
          }
          console.log("executeObj",executeObj)
        let url = '/api/v2/aleo/program/mapping/value';
        fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(executeObj)
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
            let retData = data.data
        })
        .catch((error) => { 
            setLoading(false);
        })
    }

    return (
        <Container className='programDetail' style={{marginBottom:'100px',fontSize:'12px'}}>
            <Alertinfo></Alertinfo>
            <Content data={programDetail} title="Program Details"></Content>
			<Card className='border-none' style={{marginBottom:'20px'}}>
			 <ChartsShowComponent data={programChartData}  title='Program Calling Counts'></ChartsShowComponent>
			</Card>
           
            <div className='tab_box'>
                <TabProgramshow
                 transitionData={programTransition} 
                 code={programCode} 
                 func={programfunc}
                 mappingNames={programMappingNames}>
                </TabProgramshow>
            </div>
        </Container>
  );
}

export default BlockDetail;