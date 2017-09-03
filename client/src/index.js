import './stylesheets/icon.css';
import 'font-awesome/css/font-awesome.css';
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

import App from './App';
import reducers from './reducers';

import axios from 'axios';
window.axios = axios;

const store = configureStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
