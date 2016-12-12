import webpack from 'webpack';
import express from 'express';
import path from 'path';
import webpackDevmiddleware from 'webpack-dev-middleware';

import isDev from './env';
import config from './webpack.config';

const client = () => {
  return new Promise((resolve, reject) => {
    const app = express();
    const webpackConfig = config();
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevmiddleware(compiler,{
      noInfo: false,
      index: "index.html",
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
      }
    });

    if(isDev){
      app.use(middleware);
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../src/public/index.html'));
      });
      app.listen(3000, (err) => {
        console.log('server started on 3000')
      })
    }

    resolve();
  });
};
export default client;
