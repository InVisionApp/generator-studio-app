'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {
  initializing() {
    this.package = {
      name: `${this.appname}-plugin`,
      version: '0.1.0',
      main: 'src/index.js',
      license: 'MIT',
      keywords: ['invision', 'studio', 'plugin', this.appname],
      description: `The ${this.appname} plugin for InViSion Studio.`,
      scripts: {
        'build-install': 'npm run build && npm run install-plugin',
        'copy-package-json': "npx copyfiles ./package.json './bundle'",
        'install-plugin': 'node scripts/install-plugin.js',
        'lint-fix': 'npx eslint . --fix',
        build: 'npx webpack --config ./webpack.config.js && npm run copy-package-json',
        githook: 'npm run lint',
        lint: 'npx eslint .',
        test: 'echo "Error: no test specified" && exit 1',
        watch: 'npx watch "npm run build-install;" ./src --ignoreDotFiles'
      },
      engines: {
        node: '6.x || 7.x || 8.x || 10.x',
        npm: '5.x || 6.x'
      },
      config: {
        ghooks: {
          'pre-push': 'npm run githook'
        }
      },
      devDependencies: {
        '@invisionapp/studio-api': '^3.0.0',
        'babel-cli': '^6.26.0',
        'babel-eslint': '^7.2.3',
        'babel-loader': '^7.1.2',
        'babel-plugin-add-module-exports': '^0.2.1',
        'babel-preset-env': '1.7.0',
        'babel-preset-react': '^6.24.1',
        'babel-preset-stage-0': '^6.24.1',
        copyfiles: '^2.0.0',
        'eslint-config-airbnb': '^16.1.0',
        'eslint-plugin-import': '^2.8.0',
        'eslint-plugin-jsx-a11y': '^6.0.2',
        'eslint-plugin-react': '^7.5.1',
        eslint: '^4.12.1',
        'fs-extra': '^7.0.0',
        ghooks: '2.0.4',
        'react-dom': '^15.6.2',
        react: '^15.6.2',
        watch: '^1.0.2',
        webpack: '^3.10.0'
      }
    };
  }

  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('Studio Plugin')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: "What is your plugin's name?",
        default: this.package.name
      },
      {
        type: 'input',
        name: 'description',
        message: 'description:',
        default: this.package.description
      },
      {
        type: 'input',
        name: 'author',
        message: 'author:',
        default: this.package.author
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.package.author = { name: props.author };
      this.package.description = props.description;
      this.package.name = props.name;
    });
  }

  writing() {
    this.destinationRoot(path.join(this.destinationRoot(), this.props.name));

    // Generated files
    this.fs.writeJSON(this.destinationPath('package.json'), this.package);

    // Copied files
    [
      '.babelrc',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      'src',
      'webpack.config.js'
    ].forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });

    // Templated files
    const template = {
      author: this.props.author,
      description: this.props.description,
      name: this.props.name
    };
    ['LICENSE', 'README.md', 'scripts'].forEach(f => {
      this.fs.copyTpl(this.templatePath(f), this.destinationPath(f), template);
    });
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
