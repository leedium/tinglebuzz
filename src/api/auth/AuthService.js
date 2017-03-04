import request from 'superagent';
import {WebAuth, Authentication} from 'auth0-js';

const CLIENT_ID = 'HG1R6XaTntKLwDSUoBKkWX6gFgyQBc0o';

var authConfig = {
  domain: 'tinglebuzz.auth0.com',
  clientID: CLIENT_ID,
}
class _authService {
  constructor() {

    this.authentication = new Authentication(authConfig);
    this.auth0 = new WebAuth(authConfig);

  }

  validateUser(accessToken = this.getToken().accessToken) {
    return new Promise((resolve, reject) => {

      if(!accessToken){
        reject({});
        return;
      }

      this.authentication.userInfo(accessToken, (err, res) => {
        if(err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  signup({email, password, user_metadata}) {
    return new Promise((resolve, reject) => {
      this.auth0.signup({
        connection: 'Username-Password-Authentication',
        email,
        password,
        user_metadata,
        sso: true,
        popup: true,
        auto_login: false,
      }, (err, authResult) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(authResult);
      });
    });
  }

  login({username, password, type, providerType}) {
    return new Promise((resolve, reject) => {
      if (type === 'DB') {
        this.auth0.client.login({
          realm: 'Username-Password-Authentication',
          username,
          password,
        }, (err, authResult) => {
          if (err) {
            reject(err);
            return;
          }
          this.setToken(authResult);
          resolve(authResult);
        });
      } else {
        this.auth0.login({
          connection: providerType,
        }, (err, authResult) => {
          if (err) {
            reject(err);
            return;
          }
        });
      }
    });
  }

  loginSocial(provider = 'facebook') {
    return new Promise((resolve, reject) => {
      this.auth0.login({
        connection: provider,
      }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!this.getToken();
  }

  setToken(authResult) {
    if (process.browser) {
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
    }
  }

  getToken() {
    if (process.browser) {
      if (!localStorage.getItem('access_token') && !localStorage.getItem('id_token')) {
        return {};
      }

      return {
        accessToken: localStorage.getItem('access_token'),
        idToken: localStorage.getItem('id_token'),
      };
    }
  }

  logout() {
    return Promise.resolve({}).then(() => {
      if (process.browser) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
      }
      this.auth0.logout();
    });
  }
}

class AuthService {
  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new _authService();
    }
    return AuthService.instance;
  }

  constructor() {
    throw new Error('Instances only accessed through AuthService.getInstance()')
  }
}
AuthService.instance = null;
export default AuthService;