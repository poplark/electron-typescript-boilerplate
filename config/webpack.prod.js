const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.base');

config.mode = process.env.ELECTRON_TB_WEBPACK_MODE || "production";
config.devtool = false;

module.exports = [
  Object.assign({}, config, {
    entry: {
      main: './src/main',
    },
    target: 'electron-main'
  }),
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
    target: 'electron-renderer',
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/view/index.html'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ].concat(config.plugins)
  }),
];
