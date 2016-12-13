const webpack = require('webpack');
const path = require('path');

const entryClient = path.resolve(__dirname, '../src/client/app.js');
const distDir = path.resolve(__dirname, '../dist');

module.exports = {
  entry: [
    entryClient,
    'webpack-hot-middleware/client?reload=true',
  ],
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'app.bundle.js'
  },
  target: "web",
  plugins:[
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}





