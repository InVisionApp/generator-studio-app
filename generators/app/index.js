'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const path = require('path');
const yosay = require('yosay');

// Because npm publish strips out .gitignore files, generate this file
const gitignoreContent = `# OS Files
*.swp
*~
._*
.DS_Store
*.ipr
*.iml
*.iws
.idea/
.vscode/

# Build directory
dist

# Node modules
node_modules

# NPM
npm-debug.log

# TypeScript
.tscache
tscommand-*
`;

const licenses = [
  { name: 'Apache 2.0', value: 'Apache-2.0' },
  { name: 'MIT', value: 'MIT' },
  { name: 'Mozilla Public License 2.0', value: 'MPL-2.0' },
  { name: 'BSD 2-Clause (FreeBSD) License', value: 'BSD-2-Clause-FreeBSD' },
  { name: 'BSD 3-Clause (NewBSD) License', value: 'BSD-3-Clause' },
  { name: 'Internet Systems Consortium (ISC) License', value: 'ISC' },
  { name: 'GNU AGPL 3.0', value: 'AGPL-3.0' },
  { name: 'GNU GPL 3.0', value: 'GPL-3.0' },
  { name: 'GNU LGPL 3.0', value: 'LGPL-3.0' },
  { name: 'Unlicense', value: 'unlicense' },
  { name: 'No License (Copyrighted)', value: 'UNLICENSED' }
];

function supportedLicense(license) {
  return licenses.find(x => x.value === license) !== undefined;
}

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('appId', {
      type: String,
      desc: 'ID of the app in the app store',
      required: false
    });
    this.option('description', {
      type: String,
      desc: 'Description of the app',
      required: false
    });
    this.option('tagline', {
      type: String,
      desc: 'Tagline for the app',
      required: false
    });
    this.option('name', {
      type: String,
      desc: 'Name of the app writer',
      required: false
    });
    this.option('email', {
      type: String,
      desc: 'Email of the app writer',
      required: false
    });
    this.option('homepage', {
      type: String,
      desc: 'Homepage of the app',
      required: false
    });
    this.option('license', {
      type: String,
      desc: 'License for this app',
      required: false
    });
    this.option('defaultLicense', {
      type: String,
      desc: 'Default license for this app',
      required: false
    });
  }

  prompting() {
    this.log(yosay(`Welcome to the ${chalk.red('Studio App')} generator!`));
    const prompts = [
      {
        type: 'input',
        name: 'appId',
        message: "What's your app's name:",
        default: this.options.appId || `${this.appname}-app`,
        when: this.options.appId === undefined
      },
      {
        type: 'input',
        name: 'description',
        message: "What's your app's description:",
        default:
          this.options.description || `The ${this.appname} app for InVision Studio.`,
        when: this.options.description === undefined
      },
      {
        type: 'input',
        name: 'tagline',
        message: "What's your app's tagline:",
        default: this.options.tagline || `Studio ${this.appname} app`,
        when: this.options.tagline === undefined
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
      },
      {
        type: 'input',
        name: 'homepage',
        message: "What's a good homepage for your app:",
        default: this.options.homepage || 'https://www.invisionapp.com/studio',
        when: this.options.homepage === undefined
      },
      {
        type: 'list',
        name: 'license',
        message: 'Which license do you want to use?',
        default: this.options.defaultLicense || 'MIT',
        when: !this.options.license || !supportedLicense(this.options.license),
        choices: licenses
      }
    ];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.destinationRoot(path.join(this.destinationRoot(), this.props.appId));

    // .gitignore
    this.fs.write(this.destinationPath('.gitignore'), gitignoreContent);

    // LICENSE
    const filename = path.join('licenses', this.props.license + '.txt');
    let author = this.props.name.trim();
    if (this.props.email) {
      author += ' <' + this.props.email.trim() + '>';
    }
    this.fs.copyTpl(this.templatePath(filename), this.destinationPath('LICENSE'), {
      year: new Date().getFullYear(),
      author: author
    });

    // Copied files
    [
      'assets/icon.png',
      'src/index.jsx',
      '.babelrc',
      '.eslintrc.js',
      '.prettierignore',
      '.prettierrc.js',
      '.studioignore'
    ].forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });

    // Templated files
    const template = {
      appId: this.props.appId,
      appname: this.appname,
      description: this.props.description,
      displayName: this.props.appId
        .substring(this.props.appId.indexOf('/') + 1)
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      email: this.props.email,
      homepage: this.props.homepage,
      license: this.props.license,
      name: this.props.name,
      tagline: this.props.tagline
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

module.exports.supportedLicense = supportedLicense;
