'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    this.log(
      yosay(`Welcome to the ${chalk.red('Studio Plugin')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is your plugin\'s name?',
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(path.join(this.destinationRoot(), this.props.name));

    this.fs.copy(this.templatePath('src'), this.destinationPath('src'));
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { name: this.props.name }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { name: this.props.name }
    );

    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
    this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('.nvmrc'), this.destinationPath('.nvmrc'));
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }
};
