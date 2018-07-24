# <%= pluginName %>

> <%= description %>

## Setting up your environment

To install all the required dependencies locally and begin development use:

```
npm install
```

## Building and developing your plugin

There are two scripts available that will bundle and install your plugin.

### Development Mode

```
npm run start
```

This will build and install your plugin in _development_ mode. Whenever you make
changes to your source files, it will automatically rebuild and reinstall your
plugin.

#### Automatically reloading plugins

Optionally you may set `env.port` to force rebuilds to trigger automatic plugin
reloading. Note that _all_ plugins are reloaded at once for a given InVision
Studio editor window. The port value can be found in the Developer Dashboard.

```
npm run start -- --env.port=<your developer dashboard port>
```

### Production Mode

```
npm run build
```

This builds and installs your plugin in _production_ mode. This bundle is
minified to reduce file size. Changes made to your source will **NOT** be
automatically rebuilt.
