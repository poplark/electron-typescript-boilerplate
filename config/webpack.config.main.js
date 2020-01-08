const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const config = require('./webpack.config.base');

module.exports = [
  Object.assign({}, config, {
    entry: {
      main: './src/main',
    },
    target: 'electron-main',
    plugins: [
      new CopyPlugin([{
        from: path.resolve(__dirname, '..', 'src/view'),
        to: config.output.path
      }]),
    ].concat(config.plugins)
  }),
];
