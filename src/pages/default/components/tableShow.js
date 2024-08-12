import Table from 'react-bootstrap/Table';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Badge from 'react-bootstrap/Badge';

function BasicTable() {
  const { blockData } = this.props;
  return (
    <Table >
      <thead>
        <tr>
          <th className='text-xs text_des'>Rank</th>
          <th className='text-xs text_des'>Address</th>
          <th className='text-xs text_des'>Power / Ratio</th>
          <th className='text-xs text_des'>LastBlock</th>
          <th className='text-xs text_des'>Speed(24h)</th>
        </tr>
      </thead>
      <tbody>
        {blockData.map((item) => (
        <tr>
          <td>1</td>
          <td>
            <a href='/address/aleo1t0team9fw85wn992jz5c9u0j9lfgksmd7luayxrqa6h4xmewqgysvlv329'>
            aleo1t0team9fw85wn992jz5c9u0j9lfgksmd7luayxrqa6h4xmewqgysvlv329
            </a>
          </td>
          <td><ProgressBar variant="info" now={20} /></td>
            <td><Badge bg="success">{item.height }</Badge></td>
          <td>--</td>
        </tr> 
        ))}
        {/* <tr>
          <td>1</td>
          <td>
            <a href='/address/aleo1t0team9fw85wn992jz5c9u0j9lfgksmd7luayxrqa6h4xmewqgysvlv329'>
            aleo1t0team9fw85wn992jz5c9u0j9lfgksmd7luayxrqa6h4xmewqgysvlv329
            </a>
          </td>
          <td><ProgressBar variant="info" now={20} /></td>
          <td><Badge bg="success">1234</Badge></td>
          <td>--</td>
        </tr> */}
        {/* <tr>
          <td>2</td>
          <td>aleo1w6v6lqpc0qlnlvmch77xen5ncgqyaxtk8e6y0l2ds79ukpt6vg8q0yz9u7</td>
          <td><ProgressBar variant="info" now={30} /></td>
                  <td><Badge bg="success">1234</Badge></td>
                  <td>--</td>
        </tr>
        <tr>
          <td>3</td>
          <td>aleo1y9fqxn2tw8ummhhfrc2ha5j34luk3lvxvpwu86tf2njfrmflxs9suvt950</td>
                  <td><ProgressBar variant="info" now={40} /></td>
                  <td><Badge bg="success">1234</Badge></td>
                  <td>--</td>
        </tr> */}
      </tbody>
    </Table>
  );
}

export default BasicTable;