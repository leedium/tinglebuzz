const webpack  = require('webpack');
const path  = require('path');
const clientEntry = path.resolve(__dirname, '../src/client/app.js');
const distDir = path.resolve(__dirname, '../dist');

module.exports = {
  entry: {
    app: clientEntry,
  },
  output: {
    path: distDir,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  target: "web",
  plugins:[
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}

