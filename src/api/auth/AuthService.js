import {WebAuth} from 'auth0-js';
const CLIENT_ID = 'HG1R6XaTntKLwDSUoBKkWX6gFgyQBc0o';


class AuthService {
  constructor() {
    this.auth0 = new WebAuth({
      domain: 'tinglebuzz.auth0.com',
      clientID: 'HG1R6XaTntKLwDSUoBKkWX6gFgyQBc0o',
      //callbackUrl: '/home',
      //responseType: 'token',
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

  login({username, password, type}) {
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
          resolve(authResult);
        });
      }
    });
  }

  loggedIn() {
    return !!this.getToken();
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}

export default AuthService;