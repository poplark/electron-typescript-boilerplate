const path = require('path');
const webpack = require('webpack');

const { stringified } = require('../scripts/env')();
console.log('mode: ', process.env.ELECTRON_TB_WEBPACK_MODE || 'development');

const webpackDest = process.env.ELECTRON_TB_WEBPACK_DEST || 'build';

module.exports = {
  mode: process.env.ELECTRON_TB_WEBPACK_MODE || 'development',
  devtool: process.env.ELECTRON_TB_WEBPACK_DEVTOOL || 'source-map',
  output: {
    path: path.resolve(__dirname, '..', webpackDest),
    filename: '[name].js',
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader'
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin(stringified)
  ],
  node: {
    fs: 'empty',
    __dirname: true
  }
}
