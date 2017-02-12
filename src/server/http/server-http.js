/* eslint-disable no-console */
import React from 'react';
import http from 'http';
import https from 'https';
import pug from 'pug';
import fs from 'fs';
import path from 'path';
import express from 'express';
import httpProxy from 'http-proxy';
import bodyparser from 'body-parser';
import passport from 'passport';
import {match, RouterContext} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import routes from './routes';


const RESTServer = () =>
  new Promise((resolve, reject) => {

    //  add RS256 protection on selected routes for each request
    const jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://tinglebuzz.auth0.com/.well-known/jwks.json',
      }),
      audience: 'https://tinglebuzz/api',
      issuer: 'https://tinglebuzz.auth0.com/',
      algorithms: ['RS256'],
    });

    const app = express();
    const port = process.env.REST_PORT || 3001;
    let proxy;


    const ssl = {
      key: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_KEY || 'ssl/client-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_CERT || 'ssl/client-cert.pem')),
    };


    app.set('view engine', 'pug');
    app.set('views', './templates');
    app.use('/api/*', jwtCheck);  // protect all routes to api/* with valid JWT
    app.use(bodyparser.json());
    app.use(passport.initialize());

    if (process.env.NODE_ENV === 'development') {
      proxy = httpProxy.createServer({
        changeOrigin: true,
        ws: true,
        ssl,
      });

      app.use(routes);

      app.get('/__webpack_hmr', (req, res) => {
        proxy.web(req, res, {
          target: 'http://localhost:3000',
        });
      });

      app.get('*', (req, res) => {
        proxy.web(req, res, {
          target: 'http://localhost:3000',
        });
      });

      const server = https.createServer(ssl, app)
        .listen(port, (err) => {
          if (err) {
            return reject(err);
          }
          console.log('https proxy started: 3001')
          return resolve({
            app,
            server,
          });
        });
    } else {
      app.use(routes);

      const server = http.createServer(app)
        .listen(port, (err) => {
          if (err) {
            return reject(err);
          }
          return resolve({
            app,
            server,
          });
        });
    }
  });

export default RESTServer;
