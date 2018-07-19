'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-studio-plugin:app', () => {
  const TEST_DESCRIPTION = 'test description';
  const TEST_EMAIL = 'test@example.com';
  const TEST_NAME = 'Test Name';
  const TEST_PLUGIN_NAME = 'test-plugin-name';

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      description: TEST_DESCRIPTION,
      email: TEST_EMAIL,
      name: TEST_NAME,
      pluginName: TEST_PLUGIN_NAME
    });
  });

  it('creates files', () => {
    assert.file([
      'src/in-editor.jsx',
      '.babelrc',
      '.eslintrc.js',
      '.gitignore',
      '.prettierignore',
      '.prettierrc.js',
      'LICENSE',
      'manifest.json',
      'package.json',
      'README.md',
      'webpack.config.js'
    ]);
    assert.fileContent('README.md', `# ${TEST_PLUGIN_NAME}`);
    assert.fileContent('LICENSE', `${new Date().getFullYear()}`);
    assert.fileContent('LICENSE', TEST_NAME);
    assert.jsonFileContent('package.json', {
      author: { name: TEST_NAME, email: TEST_EMAIL },
      description: TEST_DESCRIPTION,
      name: TEST_PLUGIN_NAME
    });
  });
});
