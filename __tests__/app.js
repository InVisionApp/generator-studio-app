'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-studio-plugin:app', () => {
  const TEST_AUTHOR = 'test-author';
  const TEST_DESCRIPTION = 'test-description';
  const TEST_NAME = 'test-name-plugin';

  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app')).withPrompts({
      author: TEST_AUTHOR,
      description: TEST_DESCRIPTION,
      name: TEST_NAME
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
      'tsconfig.json',
      'webpack.config.js'
    ]);
    assert.fileContent('README.md', `# ${TEST_NAME}`);
    assert.fileContent('LICENSE', `${new Date().getFullYear()}`);
    assert.fileContent('LICENSE', TEST_AUTHOR);
    assert.jsonFileContent('package.json', {
      author: { name: TEST_AUTHOR },
      description: TEST_DESCRIPTION,
      name: TEST_NAME
    });
  });
});
