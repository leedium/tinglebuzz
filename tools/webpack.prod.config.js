const webpack  = require('webpack');
const path  = require('path');
const entry = path.resolve(__dirname, '../src/app.js');
const distDir = path.resolve(__dirname, '../dist');

module.exports = {
  entry: entry,
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'app.bundle.js'
  }
}

