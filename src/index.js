import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import store from './ReduxProject/store/reduxlogic';

import App from './ReduxProject/App';
import reportWebVitals from './reportWebVitals';
// index.js or App.js


//  import '../node_modules/react-bootstrap/dist/react-bootstrap';
//  import '../node_modules/bootstrap/dist/css/bootstrap.css';


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
