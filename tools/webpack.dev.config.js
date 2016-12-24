const webpack = require('webpack');
const path = require('path');
const src = '../src';
const entryClient = path.resolve(__dirname, '../src/client/js/index.js');
const distDir = path.resolve(__dirname, '../dist');

module.exports = {
  entry: [
    entryClient,
    'webpack-hot-middleware/client?reload=true',
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, src),
        use: ['react-hot-loader','babel-loader']
      },
    ]
  },
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





