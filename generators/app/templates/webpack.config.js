const path = require('path');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== "production";

module.exports = {
  target: 'node',
  entry: {
    'in-editor': './src/in-editor.jsx',
  },
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(analytics-node|supports-color|has-flag)\/).*/,
        loaders: 'babel-loader',
      },
    ],
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
