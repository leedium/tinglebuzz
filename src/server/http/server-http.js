/* eslint-disable no-console */
import https from 'https';
import fs from 'fs';
import path from 'path';
import colors from 'colors';
import express from 'express';
import httpProxy from 'http-proxy';
import bodyparser from 'body-parser';

export const RESTServer = () =>
  new Promise((resolve, reject) => {
    const app = express();
    const port = process.env.REST_PORT || 3001;
    const ssl = {
      key: fs.readFileSync(path.resolve(__dirname, process.env.SSL_KEY)),
      cert: fs.readFileSync(path.resolve(__dirname, process.env.SSL_CERT)),
    };

    app.use(bodyparser.json());

    if (process.env.NODE_ENV === 'development') {
      const proxy = httpProxy.createServer({
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

    app.post('/login', (req, res) => {
      res.json({ ok: true });
    });

    https.createServer(ssl, app)
      .listen(process.env.REST_PORT, (err) => {
        if (err) { return reject(err); }
        console.log(`RESTAPI server started on port: ${process.env.REST_PORT}`.green);
        return resolve(app);
      });
  });

export default RESTServer;
