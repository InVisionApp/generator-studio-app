'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('Studio Plugin')} generator!`));
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: "What is your plugin's name?",
        default: `${this.appname}-plugin`
      },
      {
        type: 'input',
        name: 'description',
        message: 'description:',
        default: `The ${this.appname} plugin for InViSion Studio.`
      },
      {
        type: 'input',
        name: 'author',
        message: 'author:',
        default: ''
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(path.join(this.destinationRoot(), this.props.name));

    // Copied files
    [
      '.babelrc',
      '.eslintrc.js',
      '.gitignore',
      '.prettierignore',
      '.prettierrc.js',
      'src',
      'tsconfig.json'
    ].forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });

    // Templated files
    const template = {
      appname: this.appname,
      author: this.props.author,
      description: this.props.description,
      name: this.props.name
    };
    [
      'LICENSE',
      'manifest.json',
      'package.json',
      'README.md',
      'webpack.config.js'
    ].forEach(f => {
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
