/* eslint-disable no-console */
import React from 'react';
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import express from 'express';
import httpProxy from 'http-proxy';
import bodyparser from 'body-parser';
import passport from 'passport';
import {match, RouterContext} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import routes from './routes';


const RESTServer = () =>
  new Promise((resolve, reject) => {
    const app = express();
    const port = process.env.REST_PORT || 3001;
    let proxy;

    const ssl = {
      key: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_KEY || 'ssl/client-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_CERT || 'ssl/client-cert.pem')),
    };

    app.use(bodyparser.json());
    app.use(passport.initialize());


    if (process.env.NODE_ENV === 'development') {
      proxy = httpProxy.createServer({
        changeOrigin: true,
        ws: true,
        ssl,
      });

      app.get('*', (req, res) => {
        match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
          // in case of error display the error message
          if (err) {
            return res.status(500).send(err.message);
          }

          // in case of redirect propagate the redirect to the browser
          if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
          }

          // generate the React markup for the current route
          let markup;
          if (renderProps) {
            // if the current route matched we have renderProps
            markup = ReactDOMServer(<RouterContext {...renderProps} />);
          } else {
            // otherwise we can render a 404 page
            markup = ReactDOMServer(<div>not found</div>);
            res.status(404);
          }

          // render the index template with the embedded React markup
          return res.render('index', {markup});
        });
      });

      app.get('/', (req, res) => {
        proxy.web(req, res, {
          target: 'http://localhost:3000',
        });
      });

      app.get('/__webpack_hmr', (req, res) => {
        proxy.web(req, res, {
          target: 'http://localhost:3000',
        });
      });

      app.get('/app.bundle.js', (req, res) => {
        proxy.web(req, res, {
          target: 'http://localhost:3000',
        });
      });

      app.use(routes);

      const server = https.createServer(ssl, app)
        .listen(port, (err) => {
          if (err) {
            return reject(err);
          }
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
          //  console.log(`RESTAPI server started on port: ${port}`.green);
          return resolve({
            app,
            server,
          });
        });
    }
  });

export default RESTServer;
