/* eslint-disable no-console */
import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import express from 'express';
import httpProxy from 'http-proxy';
import bodyparser from 'body-parser';
import routes from './routes';

const RESTServer = () =>
  new Promise((resolve, reject) => {
    const app = express();
    const port = process.env.REST_PORT || 3001;
    let proxy;
    let ssl = {}

    ssl = {
      key: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_KEY || 'ssl/client-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_CERT || 'ssl/client-cert.pem')),
    };

    app.use(bodyparser.json());
    app.use(routes);
    if (process.env.NODE_ENV === 'development') {
      proxy = httpProxy.createServer({
        changeOrigin: true,
        ws: true,
        ssl,
      });
      app.get('/*', (req, res) => {
        proxy.web(req, res, {
          target: 'http://localhost:3000',
        });
      });

      const server = https.createServer(ssl, app)
        .listen(port, (err) => {
          if (err) { return reject(err); }
          console.log(`RESTAPI ssl server started on port: ${port}`.green);
          return resolve({
            app,
            server,
          });
        });
    } else {
      const server = http.createServer(app)
        .listen(port, (err) => {
          if (err) { return reject(err); }
          console.log(`RESTAPI server started on port: ${port}`.green);
          return resolve({
            app,
            server,
          });
        });
    }


  });

export default RESTServer;
