import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom"
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configStore from './store/configStore';

const  store = configStore()
store.subscribe(()=>{
  console.log(store.getState())
})
ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}> 
    <App />
  </Provider>
  </BrowserRouter>
,
  document.getElementById('root')
);
