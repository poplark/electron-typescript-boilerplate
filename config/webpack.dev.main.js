const path = require('path');
const config = require('./webpack.config.base');

module.exports = [
  Object.assign({}, config, {
    entry: {
      main: './src/main',
    },
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, '..', 'src/main'),
        ],
        use: {
          loader: 'ts-loader'
        }
      }]
    },
  }),
  // prelod 转移到 renderer 中也可以，不需要重启 electron，为毛啊？
  // Object.assign({}, config, {
  //   entry: {
  //     preload: './src/preload',
  //   },
  //   target: 'electron-preload',
  //   module: {
  //     rules: [{
  //       test: /\.ts$/,
  //       exclude: /node_modules/,
  //       include: [
  //         path.resolve(__dirname, '..', 'src/preload'),
  //       ],
  //       use: {
  //         loader: 'ts-loader'
  //       }
  //     }]
  //   },
  // }),
];
