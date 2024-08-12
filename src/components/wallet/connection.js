import { connect, getAccount, getEvents, getRecords } from "@puzzlehq/sdk-core"
import {useSelector, useDispatch} from 'react-redux'
import { setPuzzleWallet } from '@/store/rootReducer';
export const postConnectionClick=(element) =>{
    element.addEventListener('click', async () => {
      getAccount().then((res) => {
        console.log('account', res);
      });
  
      getRecords({}).then((res) => {
        console.log('records', res);
      });
  
      getEvents({}).then((res) => {
        console.log('events', res);
      });
  
      console.log('post_connection done clicked');
    })
}

export const setupConnection=(element)=>  {
    const dispatch=useDispatch();
    element.addEventListener('click', async () => {
    connect().then((response) => {
    if (response) {
        // setSession(response)
        dispatch(setPuzzleWallet(response))
        const address = response?.namespaces['aleo']['accounts'][0].split(':')[2];
    //   setAddress(address);
    }
    })
})
}