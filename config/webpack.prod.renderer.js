// const path = require('path');
// const CopyPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config.base');

config.mode = "production";
config.devtool = false;

module.exports = [
  Object.assign({}, config, {
    entry: {
      preload: './src/preload',
    },
    target: 'electron-preload'
  }),
  Object.assign({}, config, {
    entry: {
      renderer: './src/renderer',
    },
    target: 'electron-renderer'
  })
];
