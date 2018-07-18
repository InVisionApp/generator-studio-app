'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('Studio Plugin')} generator!`));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: "What is your plugin's name?",
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(path.join(this.destinationRoot(), this.props.name));

    [
      '.babelrc',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.nvmrc',
      'src',
      'webpack.config.js'
    ].forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });

    // Templated files
    const template = { name: this.props.name };
    ['scripts', 'package.json', 'README.md'].forEach(f => {
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
