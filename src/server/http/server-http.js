/* eslint-disable no-console */
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
    const ssl = {
      key: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_KEY)),
      cert: fs.readFileSync(path.join(__dirname, '../../../', process.env.SSL_CERT)),
    };
    if (process.env.NODE_ENV === 'development') {
      proxy = httpProxy.createServer({
        changeOrigin: true,
        ws: true,
        ssl,
      });
    }
    app.use(bodyparser.json());

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
    }

    app.use(routes);

    https.createServer(ssl, app)
      .listen(process.env.REST_PORT, (err) => {
        if (err) { return reject(err); }
        console.log(`RESTAPI server started on port: ${process.env.REST_PORT}`.green);
        return resolve(app);
      });
  });

export default RESTServer;
