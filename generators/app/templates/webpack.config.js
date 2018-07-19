const os = require('os');
const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PLUGIN_BASE = path.join(os.homedir(), '.invision-studio', 'plugins');

module.exports = (env, argv) => {
  const IS_PROD = argv && argv.mode !== 'development';

  const config = {
    target: 'node',

    entry: {
      'in-editor': './src/in-editor.jsx',
    },

    output: {
      path: path.join(PLUGIN_BASE, '<%= pluginName %>'),
      filename: '[name].js',
    },

    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.(gif|jpe?g|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets',
                publicPath: '/',
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },

    optimization: {
      minimizer: [
        IS_PROD &&
          new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
              mangle: {
                toplevel: true,
              },
              compress: {
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true,
              },
            },
          }),
      ].filter(Boolean),
    },

    plugins: [
      new CopyWebpackPlugin([
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'package.json', to: 'package.json' },
      ]),
    ],
  };

  return config;
};
