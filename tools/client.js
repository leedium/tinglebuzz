import React from 'react';
import {RouterContext, match} from 'react-router';
import ReactDOMServer from 'react-dom/server';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
import webpackDevmiddleware from 'webpack-dev-middleware';
import webpackHotmiddleware from 'webpack-hot-middleware';

import routes from '../src/client/js/routes';
import envConfig from './environment.config';
import config from './webpack.config';

const client = () => {
  return new Promise((resolve, reject) => {
    const port = process.env.HTTP_PORT || 3000;
    const app = express();
    const webpackConfig = config();
    const middlewareConfig = {
      noInfo: false,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
      }
    };
    const compiler = webpack(webpackConfig);
    const middleware = webpackDevmiddleware(compiler,middlewareConfig);

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../src/views'));

    if(envConfig.isDev){
      app.use(middleware);
      app.use(webpackHotmiddleware(compiler,middlewareConfig));

      app.get('*', (req, res) => {
        res.render('index',{});
      })

      //Isomorphic
      /*app.get('*', (req, res) => {
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
            markup = ReactDOMServer.renderToString(<RouterContext {...renderProps} />);
          } else {
            // otherwise we can render a 404 page
            markup = ReactDOMServer.renderToString(<div>not found</div>);
            res.status(404);
          }

          // render the index template with the embedded React markup
          return res.render('index', {markup});
        });
      });*/

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

