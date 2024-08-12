import { useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';

import { Row,Col,InputGroup,Form,Button }from 'react-bootstrap';

function FormMappingProgram(props) {
  let mappingNames=props.mappingNames
  const { programID } = useParams();
  const [value, setValue] = useState('');

  const [formData,setFormData]=useState({
    mapping_name:'',
    mapping_key:'',
    "program_id":programID
  })


  const handleChange=(e)=>{
    console.log("handleChange:",e.target.name,e.target.value)
    setFormData({
      ...formData,
      [e.target.name]:e.target.value,
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData)

    const _this = this;
    let url = '/api/v2/aleo/program/mapping/value';
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
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
        setValue(data.data)
    })
    .catch((error) => { 
        setLoading(false);
    })

    // props.executeMappings(...formData)
    // 进行表单提交
  }




  return (
    <Form className='programForm'>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Mapping Name
        </Form.Label>
        <Col sm="4">
          <Form.Select
          className='input-area' name='mapping_name'  aria-label="Default select example" onChange={handleChange}>
            {mappingNames?.map(item => (
              <option value={item}>{item}</option>
            ))}
            </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Mapping Key
        </Form.Label>
        <Col sm="4">
          <Form.Control
          name='mapping_key'
          value={formData.mapping_key}
          placeholder="Recipient's Mapping Key"
          aria-label="Recipient's Mapping Key"
          aria-describedby="basic-addon2"
          className='input-area'
          onChange={handleChange}
        />
        </Col>
        <Col sm="4">
            <Button variant="primary" type="submit" className='btn-area' onClick={handleSubmit}>
                  <span>Read</span>
            </Button>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Col sm="2">
          Mapping Value
        </Col>
        <Col sm="10">
          {value}
        </Col>
      </Form.Group>
    </Form>
  );
}

export default FormMappingProgram;