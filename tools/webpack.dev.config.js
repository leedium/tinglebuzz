import webpack from 'webpack';
import path from 'path';
const entry = path.resolve(__dirname, '../src/app.js');
const distDir = path.resolve(__dirname, '../dist');

export default {
  entry: entry,
  output: {
    path: distDir,
    publicPath: '/',
    filename: 'app.bundle.js'
  }
}





