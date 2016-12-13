const webpack  = require('webpack');
const path  = require('path');
const fs  = require('fs');

const envConfig = require('./environment.config');
const serverEntry = path.resolve(__dirname, '../src/server/server.js');
const distDir = path.resolve(__dirname, '../dist');

const src = '../src';


var nodeModules = {};
fs.readdirSync(path.resolve(__dirname,'../node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: {
    server: serverEntry
  },
  output: {
    libraryTarget: 'commonjs',
    path: distDir,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  externals: nodeModules,
  target: "node",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, src),
        use: 'babel-loader'
      },
      { test:  /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins:[
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}

