import {WebAuth} from 'auth0-js';
const CLIENT_ID = 'HG1R6XaTntKLwDSUoBKkWX6gFgyQBc0o';

class AuthService {
  constructor() {
    this.auth0 = new WebAuth({
      domain: 'tinglebuzz.auth0.com',
      clientID: CLIENT_ID,
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
          this.setToken(authResult.accessToken);
          resolve(authResult);
        });
      }else{
        this.auth0.login({
          connection: providerType,
        }, (err, authResult) => {
          if (err) {
            reject(err);
            return;
          }
          //this.setToken(authResult.accessToken);
          //resolve(authResult);
          console.log(authResult);
        });
      }
    });
  }

  loginSocial(provider = 'facebook'){
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
    return !!this.getToken();
  }

  setToken(idToken) {
    if (localStorage) {
      localStorage.setItem('access_token', idToken);
    }
  }

  getToken() {
    if (localStorage) {
      return localStorage.getItem('access_token');
    }
  }

  logout() {
    return Promise.resolve({}).then(()=>{
      if (localStorage) {
        localStorage.removeItem('access_token');
      }
      this.auth0.logout();
    });
  }
}

export default AuthService;