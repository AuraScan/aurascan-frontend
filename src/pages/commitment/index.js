import { useState } from 'react';
import { Container} from 'react-bootstrap'
import Alertinfo from '../../components/alert';
// import Content from './components/content'
import Content from '@/components/listGroup'


function AddressDetail() {
    const [show, setShow] = useState(true);
    let variant = 'success';
    const items = Array.from({ length: 1 }, (_, index) => index + 1);
    const data = {
        'Height': '812,604',
        'Block Hash': 'ab1w2qguj2efljgypjfsr64grrt992rcucqck4kt386trsh2x5n559swwywtj',
        'Commitment': 'puzzle1naeuz674mtugmq7cz8zpeq7rs76n8xyuk60se64ajek2usl9j86u2ehxr6rr22lsuuqfgzqypntqq06w7ml',
        'Address': 'aleo1t0team9fw85wn992jz5c9u0j9lfgksmd7luayxrqa6h4xmewqgysvlv329',
        'Power': '1.927801',
        'Target': '89,339,797',
    }
    return (
        <Container style={{marginBottom:'100px',fontSize:'12px'}}>
            <Alertinfo></Alertinfo>
            <Content data={data}></Content>
        </Container>
  );
}

export default AddressDetail;