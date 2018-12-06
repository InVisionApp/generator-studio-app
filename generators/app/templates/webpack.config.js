const os = require('os');
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const fetch = require('node-fetch');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const manifest = require('./manifest.json');

const reportError = reason => {
  // eslint-disable-next-line no-console
  console.log(chalk.red(`\n${reason}`));
};

const symlinkToStudio = () => {
  const pluginDevPath = process.cwd();
  const symlinkPath = path.join(
    os.homedir(),
    '.invision-studio',
    'plugins',
    manifest.name
  );

  let realPath = null;
  try {
    realPath = fs.realpathSync(symlinkPath);
  } catch (e) {
    // Can't use existSync because that will depend on the directory
    // pointed to by symlink existing.  We only care if the sym link
    // exists in the plugin directory.
  }
  if (!realPath || realPath !== pluginDevPath) {
    const message = `\n${chalk.green(
      'creating symbolic link'
    )} ${symlinkPath} -> ${pluginDevPath}`;
    console.log(message);
    fs.symlinkSync(pluginDevPath, symlinkPath);
  }
};

const reloadStudioPlugins = (env) => {
  const dashboardPort = env ? env.port : undefined;
  if (!dashboardPort) {
    reportError(
      '`port` environment variable is not set.  Skipping plugin reload. ' +
      'Reload plugins manually from the Apps menu in InVision Studio to see changes.\n'
    );
    return;
  }
  // eslint-disable-next-line no-console
  console.log(chalk.blue(`\n[Dashboard Server] reloading plugins...\n`));
  fetch(`http://localhost:${dashboardPort}/reload-plugins`)
    .then(res => {
      if (!res.ok) {
        reportError(res.text());
      }
    })
    .catch(err => {
      if (err.code !== 'ECONNRESET') {
        reportError(err.message);
      }
    });
};

const afterDoneCallback = (env) => {
  symlinkToStudio();
  reloadStudioPlugins(env);
};

class AfterDonePlugin {
  constructor(env, callback) {
    this.callback = callback;
    this.env = env;
  }

  apply(compiler) {
    compiler.plugin('done', () => this.callback(this.env));
  }
}

const OUTPUT_PATH = path.join(process.cwd(), 'lib');

module.exports = (env, argv) => {
  const IS_PROD = argv && argv.mode !== 'development';

  const config = {
    target: 'node',

    entry: {
      'index': './src/index.jsx',
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
      new CleanWebpackPlugin([OUTPUT_PATH], { allowExternal: true }),
      new AfterDonePlugin(env, afterDoneCallback),
    ],
  };

  return config;
};
