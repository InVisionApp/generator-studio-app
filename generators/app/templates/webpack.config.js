const os = require('os');
const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const fetch = require('node-fetch');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const MANIFEST = require('./manifest.json');

const OUTPUT_PATH = path.join(process.cwd(), 'dist');

function reportError(reason) {
  console.log(chalk.red(`\n${reason}`)); // eslint-disable-line no-console
};

function installToStudio() {
  // ensure the apps installation base directory exists
  const base = path.join(os.homedir(), '.invision-studio', 'apps');
  try {
    mkdirp.sync(base);
  } catch (e) {
    reportError(e);
    return;
  }

// TODO: Symlinks work on linux/mac, but we need do something else for Windows
const dest = path.join(base, MANIFEST.name);
  try {
    const stats = fs.lstatSync(dest);
    if (stats.isDirectory()) {
      rimraf.sync(dest);
    } else if (stats.isSymbolicLink()) {
      fs.unlinkSync(dest);
    }
  } catch(e) {
    if (e.code !== 'ENOENT') {
      reportError(e);
      return;
    }
  }
  const message = `\n${chalk.green('creating symbolic link')} ${dest} -> ${OUTPUT_PATH}`;
  console.log(message); // eslint-disable-line no-console
  fs.symlinkSync(OUTPUT_PATH, dest);
}

function reloadStudioApps() {
  const dashboardPort = process.env.STUDIO_DEV_SERVER_PORT;
  if (!dashboardPort) {
    reportError(
      '`STUDIO_DEV_SERVER_PORT` environment variable is not set. Skipping app reload.\n' +
      'Reload apps manually from the Apps menu in InVision Studio to see changes.\n'
    );
    return;
  }
  console.log( // eslint-disable-line no-console
    chalk.blue(`\n[Dashboard Server] reloading apps...\n`),
  );

  fetch(`http://localhost:${dashboardPort}/reload`).then(res => {
    if (!res.ok) {
      reportError(res.text());
    }
  }).catch(err => {
    if (err.code === 'ECONNREFUSED') {
      reportError('Could not reload Studio Apps: please ensure STUDIO_DEV_SERVER_PORT is set.');
    } else if (err.code !== 'ECONNRESET') {
      reportError(err.message);
    }
  });
};

function afterDoneCallback(env) {
  installToStudio();
  reloadStudioApps(env);
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

function generateCopyPlugin() {
  const cfg = [];
  ['assets', 'LICENSE'].forEach((from) => {
    const f = path.join(process.cwd(), from);
    if (fs.existsSync(f)) {
      const to = fs.lstatSync(f).isDirectory() ?
        path.join(OUTPUT_PATH, from) :
        OUTPUT_PATH;
      cfg.push({ from, to, force: true });
    }
  });
  cfg.push({ from: 'manifest.json', to: OUTPUT_PATH, force: true });
  return new CopyPlugin(cfg);
}

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
      libraryTarget: 'commonjs',
    },

    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }],
        },
        {
          test: /\.(gif|jpe?g|png|svg)$/,
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
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
      // test directory isn't included in bundle,
      // but the linter config looks here for module resolution queues
      alias: { test: path.resolve(__dirname, 'test') },
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
      generateCopyPlugin(),
      new AfterDonePlugin(env, afterDoneCallback),
    ],
  };

  return config;
};
