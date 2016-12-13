import webpack from 'webpack';
import express from 'express';
import path from 'path';
import webpackDevmiddleware from 'webpack-dev-middleware';
import webpackHotmiddleware from 'webpack-hot-middleware';

import envConfig from './environment.config';
import config from './webpack.config';

const client = () => {
  return new Promise((resolve, reject) => {
    const port = process.env.HTTP_PORT || 3000;
    const app = express();
    const webpackConfig = config();
    const middlewareConfig = {
      noInfo: false,
      index: "index.html",
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
      }
    };
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevmiddleware(compiler,middlewareConfig);

    if(envConfig.isDev){
      app.use(middleware);
      app.use(webpackHotmiddleware(compiler,middlewareConfig));

      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../src/public/index.html'));
      });
      app.listen(port, (err) => {
        if(err){
          reject(err);
          return;
        }
        console.log(`webpack HMR server started on ${port}`);
        resolve();
      })
    }else{
      resolve();
    }
  });
};
export default client;

