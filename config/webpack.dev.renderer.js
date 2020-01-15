const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const config = require('./webpack.config.base');

module.exports = [
  Object.assign({}, config, {
    entry: {
      preload: './src/preload',
    },
    target: 'electron-preload',
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '..', 'src/preload'),
        ],
        use: {
          loader: 'ts-loader'
        }
      }]
    },
    plugins: [
      new WriteFilePlugin()
    ].concat(config.plugins)
  }),
  Object.assign({}, config, {
    entry: {
      renderer: './src/renderer',
    },
    target: 'electron-renderer',
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '..', 'src/renderer'),
        ],
        use: {
          loader: 'ts-loader'
        }
      }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '..', 'src/view/index.html')
      }),
    ].concat(config.plugins)
  })
];
