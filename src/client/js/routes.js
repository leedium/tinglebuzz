import React from 'react';
import AuthService from '../../api/auth/AuthService';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/homepage/HomePage';
import AboutPage from './components/aboutpage/AboutPage';
import LoginPage from './components/loginpage/LoginPage';
import LogoutPage from './components/logoutpage/LogoutPage';
import RegistrationPage from './components/registrationpage/RegistrationPage';

const authService = new AuthService.getInstance();

// Protect route from being accessed.
const requireAuth = (nextState, replace) => {
  if (!authService.loggedIn()) {
    replace({
      pathname: '/login',
    });
  }
};

//
const logoutUser = (nextState, replace) => {
  authService.logout();
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="home" component={HomePage} />
    <Route path="about" component={AboutPage}/>
    <Route path="logout" component={LogoutPage} />
    <Route path="login" component={LoginPage}>
      <Route path="/help/:id" component={LoginPage} />

      </Route>
    <Route path="register" component={RegistrationPage}/>
    <Route path="*" component={HomePage}/>
  </Route>
);

