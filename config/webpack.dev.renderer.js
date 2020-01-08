// const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const config = require('./webpack.config.base');

config.mode = "development";
config.devtool = "source-map";

module.exports = [
  Object.assign({}, config, {
    entry: {
      preload: './src/preload',
    },
    target: 'electron-preload',
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      new WriteFilePlugin()
    ].concat(config.plugins)
  }),
  Object.assign({}, config, {
    entry: {
      renderer: './src/renderer',
    },
    target: 'electron-renderer',
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      }),
      new WriteFilePlugin()
    ].concat(config.plugins)
  })
];
