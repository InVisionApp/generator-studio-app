'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('pluginName', {
      type: String,
      desc: 'Name of the plugin',
      required: false
    });
    this.option('description', {
      type: String,
      desc: 'Description of the plugin',
      required: false
    });
    this.option('name', {
      type: String,
      desc: 'Name of the plugin writer',
      required: false
    });
    this.option('email', {
      type: String,
      desc: 'Email of the plugin writer',
      required: false
    });
  }

  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('Studio Plugin')} generator!`));
    const prompts = [
      {
        type: 'input',
        name: 'pluginName',
        message: "What's your plugin named:",
        default: this.options.pluginName || `${this.appname}-plugin`,
        when: this.options.pluginName === undefined
      },
      {
        type: 'input',
        name: 'description',
        message: "What's your plugin description:",
        default:
          this.options.description || `The ${this.appname} plugin for InViSion Studio.`,
        when: this.options.description === undefined
      },
      {
        type: 'input',
        name: 'name',
        message: "What's your name:",
        default: this.options.name || this.user.git.name(),
        when: this.options.name === undefined
      },
      {
        type: 'input',
        name: 'email',
        message: "What's your email:",
        default: this.options.email || this.user.git.email(),
        when: this.options.email === undefined
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
      this.composeWith(require.resolve('generator-license'), {
        defaultLicense: 'MIT',
        email: this.props.email,
        website: null,
        name: this.props.name
      });
    });
  }

  writing() {
    this.destinationRoot(path.join(this.destinationRoot(), this.props.pluginName));

    // Copied files
    [
      'src/in-editor.jsx',
      '.babelrc',
      '.eslintrc.js',
      '.gitignore',
      '.prettierignore',
      '.prettierrc.js',
      'tsconfig.json'
    ].forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });

    // Templated files
    const template = {
      appname: this.appname,
      description: this.props.description,
      email: this.props.email,
      license: this.props.license,
      name: this.props.name,
      pluginName: this.props.pluginName
    };
    ['manifest.json', 'package.json', 'README.md', 'webpack.config.js'].forEach(f => {
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
