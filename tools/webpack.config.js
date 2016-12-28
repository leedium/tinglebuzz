const path = require('path');

const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');
const envConfig = require('./environment.config.js');

const src = '../src';

function config() {
  let config;
  if(envConfig.isDev){
    config =  devConfig
  }else{
    config =  prodConfig
  }
  // return Object.assign({}, config, commonProperties);
   return config;
}

module.exports = config;
