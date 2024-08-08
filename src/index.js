import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';


// import store from './ReduxProject/store/reduxlogic';

//import App from './ReduxProject/App';
//import App from '../src/App';
import App from './shoppingapp using reducer/App';
import reportWebVitals from './reportWebVitals';
// index.js or App.js
import { Provider } from 'react-redux';
//import App from './myreduxproject/App'
//import store from './TrackMyExpenses/reduxstore/store';
import store from './shoppingapp using reducer/reduxStore/store';


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
