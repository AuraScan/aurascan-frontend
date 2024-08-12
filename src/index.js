import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/font/iconfont.css'
import './assets/css/common.scss'
import './assets/css/darkMode.scss'
import './assets/css/pagination.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { store } from '~store/store';
import {createStore} from 'redux';
//引入rootReducer组件
import rootReducer from './store/rootReducer';
import { configureConnection} from '@puzzlehq/sdk-core';

//将组件添加到store中
const store = createStore(rootReducer)
configureConnection({
  dAppName:"Test Dapp",
  dAppDescription: "A Dapp  testing",
  dAppUrl:window.location.hostname,
  dAppIconURL:'https://upload.wikimedia.org/wikipedia/en/c/c7/Common_face_of_two_euro_coin_%282007%29.jpg'
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
