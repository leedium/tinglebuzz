import React from 'react';

import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/homepage/HomePage';
import AboutPage from './components/aboutpage/AboutPage';
import LoginPage from './components/loginpage/LoginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/home" component={HomePage} />
    <Route path="/about" component={AboutPage} />
    <Route path="/login" component={LoginPage} />
  </Route>
);

