const os = require('os');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PLUGIN_BASE = path.join(os.homedir(), '.invision-studio', 'plugins');
const OUTPUT_PATH = path.join(PLUGIN_BASE, '<%= pluginName %>');

module.exports = (env, argv) => {
  const IS_PROD = argv && argv.mode !== 'development';

  const config = {
    target: 'node',

    entry: {
      'in-editor': './src/in-editor.jsx',
    },

    output: {
      path: OUTPUT_PATH,
      filename: '[name].js',
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
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
      extensions: ['.js', '.jsx'],
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
      new CleanWebpackPlugin([OUTPUT_PATH], {allowExternal: true}),
    ],
  };

  return config;
};
