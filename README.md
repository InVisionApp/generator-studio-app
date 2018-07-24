<img align="right" src="images/studio.png">

# generator-studio-plugin

[![Version][npm-version-shield]][npm-our-package]
[![Travis Build Status][travis-badge]][travis]
[![codecov][codecov-badge]][codecov]
[![Dependency Status][david-dm-shield]][david-dm]
[![LICENSE][license-badge]](LICENSE)
[![Downloads][npm-stats-shield]][npm-stats]

> Yeoman generator for InVision Studio Plugins

## Installation

First, install [Yeoman][yeoman] and generator-studio-plugin using
[npm][npm] (we assume you have pre-installed [node.js][nodejs]).

```bash
npm install -g yo
npm install -g generator-studio-plugin
```

Then generate your new plugin:

```bash
cd /path/to/where/you/want/to/write/your/plugins
yo studio-plugin
```

## Composability

> Composability is a way to combine smaller parts to make one large thing.
> Sort of [like Voltron®][voltron]
> — [Yeoman docs][yeoman-docs]

### Install

```bash
npm install --save generator-studio-plugin
```

### Compose

```js
this.composeWith(require.resolve('generator-studio-plugin')/*, options */)
```

#### Options

```js
{
    // supply alternative defaults
    pluginName: 'appname-plugin',
    description: '',
    name: 'git-user',
    email: 'git-email',
}
```

## License

MIT © [InVision, Inc.][invision-studio]

[codecov-badge]:        https://codecov.io/gh/InVisionApp/generator-studio-plugin/branch/master/graph/badge.svg?token=I9IGBzprlC
[codecov]:              https://codecov.io/gh/InVisionApp/generator-studio-plugin
[david-dm-shield]:      https://david-dm.org/InVisionApp/generator-studio-plugin/status.svg
[david-dm]:             https://david-dm.org/InVisionApp/generator-studio-plugin
[invision-studio]:      https://www.invisionapp.com/studio
[license-badge]:        https://img.shields.io/badge/license-MIT-orange.svg
[nodejs]:               https://nodejs.org/
[npm-our-package]:      https://www.npmjs.com/package/generator-studio-plugin
[npm-stats-shield]:     https://img.shields.io/npm/dt/generator-studio-plugin.svg?maxAge=2592000
[npm-stats]:            http://npm-stat.com/charts.html?package=generator-studio-plugin&author=&from=&to=
[npm-version-shield]:   https://img.shields.io/npm/v/generator-studio-plugin.svg
[npm]:                  https://www.npmjs.com/
[travis-badge]:         https://travis-ci.org/InVisionApp/generator-studio-plugin.svg?branch=master
[travis]:               https://travis-ci.com/InVisionApp/generator-studio-plugin
[voltron]:              http://25.media.tumblr.com/tumblr_m1zllfCJV21r8gq9go11_250.gif
[yeoman-docs]:          http://yeoman.io/authoring/composability.html
[yeoman]:               http://yeoman.io
