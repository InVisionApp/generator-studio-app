# Steps to publishing this package

1. Ensure that CHANGELOG.md is up to date. Ideally, new features should be added to the
   `[Unreleased]` section as they are merged so that all that needs to be done is to move all the
   items in that section into a new one based on the version and date to be published.
2. Update the `package.json` file to indicate the new version. For example:

        {
          "name": "generator-studio-plugin",
          "version": "0.4.1",
          "description": "Yeoman generator for InVision Studio Plugins",
          [...]
3. Commit these changes in a commit with a message like `"Prepare for v0.4.1."`, for example.
4. Tag the release using the format `v${semver}`. For example: `v0.4.1`.

        $ git tag v0.4.1
4. Push the commit _and tags_ to the remote:

        $ git push --tags
5. Use `npm publish` to publish the package:

        $ npm publish
6. Check that the package has been published by taking a look at
   [our npmjs registry page](https://www.npmjs.com/package/generator-studio-plugin).
