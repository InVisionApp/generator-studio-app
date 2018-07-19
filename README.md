<img align="right" src="images/studio.png">

# generator-studio-plugin

[![LICENSE][license-badge]](LICENSE)
[![Travis Build Status][travis-badge]][travis]
[![codecov][codecov-badge]][codecov]

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

[codecov-badge]:    https://codecov.io/gh/InVisionApp/generator-studio-plugin/branch/master/graph/badge.svg?token=I9IGBzprlC
[codecov]:          https://codecov.io/gh/InVisionApp/generator-studio-plugin
[invision-studio]:  https://www.invisionapp.com/studio
[license-badge]:    https://img.shields.io/badge/license-MIT-orange.svg
[nodejs]:           https://nodejs.org/
[npm]:              https://www.npmjs.com/
[travis-badge]:     https://travis-ci.org/InVisionApp/generator-studio-plugin.svg?branch=master
[travis]:           https://travis-ci.com/InVisionApp/generator-studio-plugin
[voltron]:          http://25.media.tumblr.com/tumblr_m1zllfCJV21r8gq9go11_250.gif
[yeoman-docs]:      http://yeoman.io/authoring/composability.html
[yeoman]:           http://yeoman.io
