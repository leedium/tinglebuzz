const path = require('path');

const devConfig = require('./webpack.dev.config');
const prodConfig = require('./webpack.prod.config');
const envConfig = require('./environment.config.js');

const src = '../src';
const commonProperties = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, src),
        use: 'babel-loader'
      },
    ]
  }
};

function config() {
  let config;
  if(envConfig.isDev){
    config =  devConfig
  }else{
    config =  prodConfig
  }
  return Object.assign({}, config, commonProperties);
}

module.exports = config;
