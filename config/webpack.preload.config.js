const config = require('./webpack.common');

module.exports = Object.assign({}, config, {
  entry: {
    preload: './src/preload',
  },
  target: 'electron-preload'
});
