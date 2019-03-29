# <%= appName %>

> <%= description %>

## Setting up your environment

To install all the required dependencies locally and begin development use:

```
npm install
```

## Building and developing your app

There are two scripts available that will bundle and install your app:
`start` and `build`, described in detail below.

### Build Output

Either build script will generate the following files.

| Output | Description                                                                                |
| ------ | ------------------------------------------------------------------------------------------ |
| `dist` | Your app distribution, including your application bundle, manifest, assets, etc...      |
| `~/.invision-studio/apps/<%= appName %>` | Installation of your app via symlink to `dist`. |

### Development Mode

```
npm run start
```

This will build and install your app in _development_ mode. Whenever you make
changes to your source files, it will automatically rebuild and reinstall your
app.

#### Automatically reloading apps

In addition to rebuilding and reinstalling the app, the development mode will
also automatically reload apps in Studio itself. Note that _all_ apps are
reloaded at once for a given InVision Studio editor window.

To setup automatic reloading of apps, you need to define the
`STUDIO_DEV_SERVER_PORT` environment variable with an available port number.
This will start Studio's development server, which enables app reloading,
whenever Studio is running. For example the following line could be added to
one of your initialization scripts to use 9101 as port number:

```
export STUDIO_DEV_SERVER_PORT=9101
```

> Note: Studio may need to be restarted to pick up the environment variable.

### Production Mode

```
npm run build
```

This builds and installs your app in _production_ mode. This bundle is
minified to reduce file size. Changes made to your source will **NOT** be
automatically rebuilt.
