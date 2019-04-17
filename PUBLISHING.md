# Steps to publishing this package

1. Run `npm audit --audit-level high` now and then resolve any vulnerabilities found.
   You'll need to be using `npm 6` or higher to have the `audit` command.
   **You will NOT be able to publish if there are any unresolved vulnerabilities!**
2. Ensure that [CHANGELOG.md](./CHANGELOG.md) is up to date. Ideally, new features should be added
   to the `[Unreleased]` section as they are merged so that all that needs to be done is to move all
   the items in that section into a new one based on the version and date to be published.
3. Update the `package.json` file to indicate the new version. For example:

        {
          "name": "generator-studio-app",
          "version": "0.4.1",
          "description": "Yeoman generator for InVision Studio Apps",
          [...]
4. Commit any changes in a commit on `master` with a message like `"Prepare for v0.4.1."`,
   for example. Then push them to the remote.

        $ git checkout master
        $ git add -A
        $ git commit -m "Prepare for v0.4.1."
        $ git push
5. Tag the release using the format `v${semver}`. For example: `v0.4.1`.

        $ git tag v0.4.1
6. Push the new tag to the remote:

        $ git push --no-verify --tags
7. Use `npm publish` to publish the package:

        $ npm publish
8. Check that the package has been published by taking a look at
   [our npmjs registry page](https://www.npmjs.com/package/generator-studio-app).
