/* eslint prefer-arrow-callback: 0 */
/* eslint func-names: 0 */
/* eslint consistent-return: 0 */

const path = require('path');
const webpack = require('webpack');

const entry = {
  'in-editor': './src/in-editor.jsx',
};

const allowedMissingModules = [];

module.exports = {
  target: 'node',
  entry,
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './styles'),
      public: path.resolve(__dirname, './public'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!(analytics-node|supports-color|has-flag)\/).*/,
        loaders: 'babel-loader',
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.svg$/,
        loader: 'simple-svg-loader',
      },
    ],
  },
  plugins: [
    function () {
      this.plugin('compilation', function (compilation, data) {
        data.normalModuleFactory.plugin('parser', function (parser) {
          parser.plugin('call require', function (expr) {
            if (expr.arguments.length !== 1) {
              return;
            }

            if (allowedMissingModules.indexOf(expr.arguments[0].value) > -1) {
              return true;
            }

            const param = this.evaluateExpression(expr.arguments[0]);
            if (!param.isString() && !param.isConditional()) {
              return true;
            }
          });
        });
      });
    },
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
