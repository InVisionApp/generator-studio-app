# <%= name %>

## Initial Environment Set Up

To install all the required dependencies locally and begin development use:

```
npm install
```

## Plugin Build and Install

Building the plugin entails creating an application bundle. The following will create a `./bundle` directory with all required assets:

```
npm run build
```

Then to install the plugin application bundle use:

```
npm run install-plugin
```

## Build and Install Automation

We provide a script to detect code changes during development and then automatically re-build and install them:

```
npm run watch
```
