import './index.scss'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import BasicTable from '../table';
import FormProgram from "../form/program"
import FormMappingProgram from "../form/mapping"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function TabProgramshow(props) {
  let datas=[];
  let transitionData=props.transitionData
  let code=props.code
  let mappingNames=props.mappingNames
  let funcs=props.func
  return (
    <Tabs
      defaultActiveKey="Transitions"
      id="uncontrolled-tab-example"
      className="mb-4 codebg"
    >
      <Tab eventKey="Transitions" title="Transitions">
        <BasicTable data={transitionData} title=""></BasicTable>
      </Tab>
      <Tab eventKey="Code" title="Source Code">
       <SyntaxHighlighter language="javascript" style={docco} className="codeshow" >
            {code}
        </SyntaxHighlighter>
      </Tab>
      <Tab eventKey="Execute" title="Execute">
        <FormProgram funcs={funcs}></FormProgram>
      </Tab>
      <Tab eventKey="Mappings" title="Read Mappings">
        <FormMappingProgram mappingNames={mappingNames} ></FormMappingProgram>
      </Tab>
    </Tabs>
  );
}

export default TabProgramshow;