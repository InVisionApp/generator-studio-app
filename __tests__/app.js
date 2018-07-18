'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-studio-plugin:app', () => {
  const testAuthor = 'test-author';
  const testDescription = 'test-description';
  const testName = 'test-name-plugin';

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      author: testAuthor,
      description: testDescription,
      name: testName
    });
  });

  it('creates files', () => {
    [
      '.babelrc',
      '.eslintignore',
      '.eslintrc',
      '.gitignore',
      'LICENSE',
      'package.json',
      'README.md',
      'scripts/install-plugin.js',
      'src/in-editor.jsx',
      'webpack.config.js'
    ].forEach(f => {
      assert.file([f]);
    });
    assert.fileContent('README.md', `# ${testName}`);
    assert.fileContent('LICENSE', `${new Date().getFullYear()}`);
    assert.fileContent('LICENSE', testAuthor);
    assert.jsonFileContent('package.json', {
      author: { name: testAuthor },
      description: testDescription,
      name: testName
    });
  });
});
