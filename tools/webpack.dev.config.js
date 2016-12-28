const webpack = require('webpack');
const path = require('path');
const src = '../src';
const entryClient = path.resolve(__dirname, '../src/client/js/index.js');
const distDir = path.resolve(__dirname, '../dist');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    entryClient,
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, src),
        use: ['babel-loader'],
        query: {
          cacheDirectory: true,
        }

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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ]
}





