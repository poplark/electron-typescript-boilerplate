const path = require('path');
const webpack = require('webpack');

console.log('mode: ', process.env.MODE || 'production');
console.log('devtool: ', process.env.DEVTOOL || false);

const output_path = 'build';

module.exports = {
  mode: process.env.MODE || 'production',
  devtool: process.env.DEVTOOL || false,
  entry: {
    // placeholder
  },
  output: {
    path: path.resolve(__dirname, '..', output_path),
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
    new webpack.DefinePlugin({
      OUTPUT_PATH: JSON.stringify(output_path)
    })
  ],
  node: {
    fs: 'empty',
    __dirname: true
  }
}
