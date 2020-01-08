const config = require('./webpack.common');

module.exports = Object.assign({}, config, {
  entry: {
    renderer: './src/renderer',
  },
  target: 'electron-renderer'
});
