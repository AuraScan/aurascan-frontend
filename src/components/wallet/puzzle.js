import { configureConnection, getAccount, getWalletConnectModalSignClient,connect } from '@puzzlehq/sdk-core';

import { useState } from 'react'; 
import { useSelector,useDispatch } from 'react-redux'
import { setPuzzleWallet,getPuzzleWallet,setPublicAddress } from '@/store/rootReducer';
// import { requestCreateEvent } from '@puzzlehq/sdk';

// configureConnection({
//   dAppName:"Test Dapp",
//   dAppDescription: "A Dapp  testing",
//   dAppUrl:window.location.hostname,
//   dAppIconURL:'https://upload.wikimedia.org/wikipedia/en/c/c7/Common_face_of_two_euro_coin_%282007%29.jpg'
// })

export const PuzzleConnectPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { account } = getAccount();
  // const session=""
  const session=useSelector(getPuzzleWallet)
  const dispatch=useDispatch();

  const onPuzzleClick = async () => {
    setLoading(true);
    setError(undefined);
    try {
      connect().then((response) => {
        if (response) {
            // setSession(response)
            dispatch(setPuzzleWallet(response))
            const address = response?.namespaces['aleo']['accounts'][0].split(':')[2];
            console.log("account",response,"adress",address)
            dispatch(setPublicAddress(address))
            //   setAddress(address);
        }
        })
      // const session_account = await connect()
      // console.log("session_account",session_account)
      // dispatch(setPuzzleWallet(session_account))
    } catch (e) {
      setError((e).message);
    } finally {
      setLoading(false);
    }
  }
  getWalletConnectModalSignClient().then(async (client) => {
    client.onSessionEvent((data) => {
      console.log('onSessionEvent', data)
      if (data.params.event.name === 'accountSelected') { 
        const address = data.params.event.data.address;
        // setAddress(address ?? '');
        // document.querySelector<HTMLButtonElement>('#address')!.innerHTML = `address: ${address}`
      }
    })
    client.onSessionDelete((data) => {
      console.log('onSessionDelete', data)
    })
    client.onSessionExpire((data) => {
      console.log('onSessionExpire', data)
    })
    if (session) {
      const response = await getAccount();
      dispatch(setPuzzleWallet(response))
      // document.querySelector<HTMLButtonElement>('#address')!.innerHTML = `address: ${response.account?.address}`
    }
  })

  // const exec_program=async()=>{
  //   const event = await CreateEventRequest({
  //     fee: 1,
  //     functionId: 'flip',
  //     programId: 'puzzle_coinflip.aleo',
  //     inputs: [newResult === 'heads' ? 'true' : 'false'],
  //     type: EventType.Execute,
  //   });
  //   console.log("event",event);
  // }
  return (
    <div>
      <button
        onClick={ onPuzzleClick }
        disabled={ loading }
      >
        Puzzle Wallet
      </button>
      { account && <p>you did it!</p> }
      { error && <p>error connecting: {error}</p> }
    </div>
  )
}