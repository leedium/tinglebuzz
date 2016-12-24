const webpack  = require('webpack');
const path  = require('path');
const clientEntry = path.resolve(__dirname, '../src/client/js/index.js');
const distDir = path.resolve(__dirname, '../dist');
const src = '../src';

module.exports = {
  entry: {
    app: clientEntry,
  },
  output: {
    path: distDir,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, src),
        use: 'babel-loader'
      },
    ]
  },
  target: "web",
  plugins:[
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}

