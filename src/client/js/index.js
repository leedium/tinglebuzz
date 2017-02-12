import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import store from '../../api/store/store';

import routes from './routes';

const str = store();
const history = syncHistoryWithStore(browserHistory, str);

ReactDOM.render(
  <Provider store={str} >
    <Router history={history} routes={routes} />
  </Provider>,
    document.getElementById('app'),
);
