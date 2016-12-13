/* eslint-disable no-console */

import colors from 'colors';
import express from 'express';
import httpProxy from 'http-proxy';
import bodyparser from 'body-parser';

export const RESTServer = () =>
  new Promise((resolve, reject) => {
    const app = express();
    const port = process.env.REST_PORT || 3002;
    const proxy = httpProxy.createProxyServer({});

    app.use(bodyparser.json());

    if (process.env.NODE_ENV === 'development') {
      app.get('*', (req, res) => {
        proxy.web(req, res, {
          target: 'http://localhost:3000',
          ws: true,
          changeOrigin: true,
        });
      });
    }


    app.post('/login', (req, res) => {
      res.json({ ok: true });
    });
    app.listen(port, (err) => {
      if (err) {
        console.log('ddd', err);
        reject(err);
        return;
      }
      console.log(`RESTAPI server started on port: ${port}`.green);
      resolve(app);
    });
  });

export default RESTServer;
