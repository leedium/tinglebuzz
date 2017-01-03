import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';

import store from '../../api/store/store';

import routes from './routes';

ReactDOM.render(
  <Provider store={store()} >
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app'),
);
