import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import config from 'react-global-configuration';
import configuration from './config';

config.set(configuration);

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root'));
