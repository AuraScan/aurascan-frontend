
import { createSlice } from '@reduxjs/toolkit';

const initSlice = createSlice({
  name: 'init',
  pathname: '1212',
  records_perpage:[5,10,20,50],
  puzzleWallet:JSON.parse(localStorage.getItem('puzzleWallet')),
  leoWallet:{},
  init_wallet:localStorage.getItem('init_wallet'),
  code_editor:{
    aleo_code:'',
    leo_code:''
  },
  initialState: {
    init_address:"aleo10r0ghwyh0uvurq3w5skdnd5ar4wxc8g4wjcfwxv8zn2dr3xd3qysam6u4v",
    publicAddress: "",
    // init_wallet: '',
    contract_record: [],
    records_perpage:[5,10,20,50],
  },
  reducers: {
    setPublicAddress(state, action) { 
      state.publicAddress = action.payload;
    },
    setPuzzleWallet(state, action){
      state.puzzleWallet = action.payload;
      localStorage.setItem('puzzleWallet',JSON.stringify(action.payload))
    },
    setInitWallet(state, action) { 
      state.init_wallet = action.payload;
      localStorage.setItem('init_wallet',action.payload)

    },
    setContractRecord(state, action) { 
      state.contract_record = action.payload;
    },
    setPathname(state, action) { 
      state.pathname = action.payload;
    },
    setCodeEditor(state, action) { 
      state.code_editor = {...state.code_editor,...action.payload};
    },
  },
  extraReducers: (builder) => {
  },
});



export const { setPublicAddress,setPuzzleWallet,setInitWallet,setContractRecord,setCodeEditor } = initSlice.actions
export const getPublicAddress = (state) => state.publicAddress;
export const getPuzzleWallet = (state) => state.puzzleWallet;
export const getPathname = (state) => { 
  return state.pathname;
} 
export const getCodeEditor = (state) => { 
  return state.code_editor;
} 
export const getInitWallet = (state) => { 
  return state.init_wallet;
} 
export const get_records_perpage = (state) => { 
  return state.records_perpage;
} 
export default initSlice.reducer;
