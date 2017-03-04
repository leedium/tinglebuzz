import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/App';
import HomePage from './components/homepage/HomePage';
import AboutPage from './components/aboutpage/AboutPage';
import AppPage from './components/appPage/AppPage';
import LoginPage from './components/loginpage/LoginPage';
import LogoutPage from './components/logoutpage/LogoutPage';
import RegistrationPage from './components/registrationpage/RegistrationPage';
import UnauthorizedPage from './components/unauthorizedPage/UnauthorizedPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="home" component={HomePage} />
    <Route path="app" component={AppPage} />
    <Route path="about" component={AboutPage} />
    <Route path="logout" component={LogoutPage} />
    <Route path="login" component={LoginPage}>
      <Route path="/help/:id" component={LoginPage} />

      </Route>
    <Route path="register" component={RegistrationPage} />
    <Route path="unauthorized" component={UnauthorizedPage} />
    <Route path="*" component={HomePage} />
  </Route>
);

