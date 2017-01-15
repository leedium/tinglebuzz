import AuthService from '../auth/AuthService';
import {UserActionTypes} from './ActionTypes';

const authService = new AuthService();

function get(userData){
  return {
    type: '',
    userData,
  };
}



function loginSuccess(userData){
  return {
    type: UserActionTypes.LOGIN_SUCCESS,
    userData,
  };
}

function loginFail(userData){
  return {
    type: UserActionTypes.LOGIN_FAIL,
    userData,
  };
}

function logout(userData){
  return {
    type: UserActionTypes.LOGOUT,
    userData,
  }
}

function register(user){
  return {
    type: '',
    userData,
  };
}

function getGeo(user){
  return {
    type: '',
    userData,
  };
}

//  thunks
function requestLogin(loginData) {
  return function (dispatch) {
    return authService.login(loginData)
      .then(res => dispatch(loginSuccess(res)))
      .catch(err => dispatch(loginFail(err)));
  };
}

function requestLogout(userData) {
  return function (dispatch) {
    return authService.logout(userData)
      .then(res => dispatch(loginSuccess(res)));
  };
}

export {get, getGeo, requestLogin, register, requestLogout,}