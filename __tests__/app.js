'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-studio-plugin:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ name: 'test-plugin' });
  });

  it('creates files', () => {
    [
      '.babelrc',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      '.nvmrc',
      'package.json',
      'README.md',
      'scripts',
      'scripts/install-plugin.js',
      'src',
      'src/in-editor.jsx',
      'webpack.config.js'
    ].forEach(f => {
      assert.file([f]);
    });
    assert.fileContent('README.md', '# test-plugin');
    assert.jsonFileContent('package.json', { name: 'test-plugin' });
  });
});
