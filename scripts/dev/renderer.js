const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('../../config/webpack.dev.renderer');

const HOST = process.env.ELECTRON_TB_WEBPACK_HOST || 'localhost';
const PORT = process.env.ELECTRON_TB_WEBPACK_PORT || 3001;

module.exports = class RendererProcess {
  constructor() {
    this.compiler = webpack(config);
    this.devServer = new webpackDevServer(this.compiler, {
      stats: {
        colors: true
      }
    });
  }

  start() {
    this.devServer.listen(PORT, HOST, err => {
      if (err) {
        console.error(`renderer process - `, err);
      };
    })
  }

  close() {
    this.devServer.close(err => {
      if (err) {
        console.error(`renderer process close - `, err);
      }
    });
  }
}