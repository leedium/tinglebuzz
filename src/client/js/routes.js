import React from 'react';
import AuthService from '../../api/auth/AuthService';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/homepage/HomePage';
import AboutPage from './components/aboutpage/AboutPage';
import LoginPage from './components/loginpage/LoginPage';
import RegistrationPage from './components/registrationpage/RegistrationPage';


const authService = new AuthService();

// Protect route from being accessed.
const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    replace({
      pathname: '/login',
    });
  }
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="home" authservice={authService} component={HomePage} onEnter={requireAuth}/>
    <Route path="about" component={AboutPage}/>
    <Route path="login" authservice={authService} component={LoginPage}>
      <Route path="/help/:id" component={LoginPage} />

      </Route>
    <Route path="register" component={RegistrationPage}/>
    <Route path="*" component={HomePage}/>
  </Route>
);

